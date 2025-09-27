import { type ReactNode, useEffect, useRef } from "react";

const BaseLayout = (props: { children?: ReactNode }) => {
	const { children } = props;

	const navbarRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = navbarRef.current;
		if (!el) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const height = entry.contentRect.height;
				if (containerRef.current) {
					containerRef.current.style.paddingBottom = `${height}px`;
					document.documentElement.style.setProperty(
						"--navbar-height",
						`${height}px`,
					);
				}
			}
		});

		observer.observe(el);

		return () => {
			observer.disconnect();
		};
	}, []);

	// самостоятельно высчитываем vh из-за safari (проверено на ios 15.2), где 100vh - это высота видимой области + высота адресной строки
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

		updateHeightVar(); // начальное значение

		window.addEventListener("resize", updateHeightVar);
		window.addEventListener("orientationchange", updateHeightVar);

		return () => {
			window.removeEventListener("resize", updateHeightVar);
			window.removeEventListener("orientationchange", updateHeightVar);
		};
	}, []);

	return (
		<div className="max-w-screen overflow-x-clip relative">
			<div className="w-full min-h-[var(--100vh)] flex max-w-[90rem]  mx-auto relative">
				<div className="w-full grid grid-cols-1 relative">
					<div ref={containerRef}>{children}</div>
				</div>
			</div>
			<div ref={navbarRef} className="fixed bottom-0 left-0 right-0 z-10">
				<div id="navbar-portal" />
				<div className="bg-white pb-[env(safe-area-inset-bottom)]"></div>
			</div>
		</div>
	);
};

export default BaseLayout;
