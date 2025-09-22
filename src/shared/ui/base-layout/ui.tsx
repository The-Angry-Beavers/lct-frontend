import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { BaseLayoutContext } from "./lib";

const BaseLayout = (props: {
	page?: ReactNode;
	aside?: ReactNode;
	navbar?: ReactNode;
	header?: ReactNode;
}) => {
	const { page, header, navbar } = props;
	const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
	const navbarRef = useRef<HTMLDivElement | null>(null);
	const headerRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const navbarEl = navbarRef.current;
		const headerEl = headerRef.current;
		if (!navbarEl && !headerEl) return;

		const updateOffsets = () => {
			const navbarHeight = navbarEl?.getBoundingClientRect().height ?? 0;
			const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;

			if (containerRef.current) {
				containerRef.current.style.paddingBottom = `${navbarHeight}px`;
				containerRef.current.style.paddingTop = `${headerHeight}px`;
			}

			document.documentElement.style.setProperty(
				"--navbar-height",
				`${navbarHeight}px`,
			);
			document.documentElement.style.setProperty(
				"--header-height",
				`${headerHeight}px`,
			);
		};

		const observer = new ResizeObserver(updateOffsets);
		if (navbarEl) observer.observe(navbarEl);
		if (headerEl) observer.observe(headerEl);

		updateOffsets(); // начальный вызов

		return () => {
			observer.disconnect();
		};
	}, []);

	// высчитываем vh из-за safari
	useEffect(() => {
		const updateHeightVar = () => {
			document.documentElement.style.setProperty(
				"--100vh",
				`${window.innerHeight}px`,
			);
			document.documentElement.style.setProperty(
				"--vh",
				`${window.innerHeight * 0.01}px`,
			);
		};

		updateHeightVar();
		window.addEventListener("resize", updateHeightVar);
		window.addEventListener("orientationchange", updateHeightVar);

		return () => {
			window.removeEventListener("resize", updateHeightVar);
			window.removeEventListener("orientationchange", updateHeightVar);
		};
	}, []);

	return (
		<BaseLayoutContext.Provider value={{ setSideBarIsOpen, sideBarIsOpen }}>
			<div className="max-w-screen overflow-x-clip relative">
				<div
					ref={headerRef}
					className="fixed top-0 z-10 left-0 right-0 flex flex-col"
				>
					<div className="max-w-[90rem] mx-auto w-full flex flex-col flex-1">
						{header}
					</div>
				</div>
				<div className="w-full min-h-[var(--100vh)] flex max-w-[90rem]  mx-auto relative">
					<div className="w-full grid grid-cols-1 md:grid-cols-[min-content_1fr] relative">
						<div className="hidden md:block">{/* aside here */}</div>
						<div ref={containerRef}>{page}</div>
					</div>
				</div>
				<div ref={navbarRef} className="fixed bottom-0 left-0 right-0 z-10">
					<div id="navbar-portal" />
					<div className="pb-[env(safe-area-inset-bottom)]">{navbar}</div>
				</div>
			</div>
		</BaseLayoutContext.Provider>
	);
};

export { BaseLayout };
