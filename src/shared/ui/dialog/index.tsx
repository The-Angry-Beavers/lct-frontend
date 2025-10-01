"use client";

import { AnimatePresence, type MotionProps, motion } from "motion/react";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/utils/cn";

export interface IDialogProps {
	isOpen: boolean;
	onClose?: () => void;
	content: ReactNode;
	overlay?: ReactNode;
}

interface IOverlayProps {
	animation?: MotionProps;
	className?: string;
}

const Overlay = (props: IOverlayProps) => {
	return (
		<motion.div
			style={{
				backdropFilter: "blur(4px)",
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			{...props.animation}
			className={cn(
				"overlay fixed z-[1000] left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.48)]",
				props.className,
			)}
		/>
	);
};

interface IContentProps {
	animation?: MotionProps;
	children: ReactNode;
	variant?: "fullscreen" | "toast";
	classNames?: {
		fixedOverlay?: string;
		contentWindow?: string;
	};
}

const Content = (props: IContentProps) => {
	const { classNames, variant = "fullscreen" } = props;
	const id = useId();

	const { onClose = () => {}, isOpen } = useDialogContext();
	const ref = useRef<HTMLDivElement | null>(null);

	const clear = () => {
		if (variant === "toast") return;
		try {
			document.body.classList.remove("modal-id-" + id);

			const classes = Array.from(document.body.classList);

			if (
				!classes.find((e) => e.startsWith("modal-id-")) &&
				classes.find((e) => e === "modal-open")
			) {
				document.body.classList.remove("modal-open");
			}
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(() => {
		if (variant === "toast") return;
		document.body.classList.add("modal-id-" + id);

		const classes = Array.from(document.body.classList);

		if (
			classes.find((e) => e.startsWith("modal-id-")) &&
			!classes.find((e) => e === "modal-open")
		) {
			document.body.classList.add("modal-open");
		}

		return () => {
			clear();
		};
	}, []);

	useEffect(() => {
		if (!isOpen) {
			clear();
		}
	}, [isOpen]);

	return (
		<motion.div
			onClick={(e: any) => {
				const target = e.target as HTMLElement;
				if (target.classList.contains("overlay")) {
					onClose();
				}
			}}
			className={cn(
				"overlay z-[1000]",
				variant === "fullscreen" &&
					"fixed overflow-scroll overscroll-none grid place-items-center left-0 right-0 top-0 bottom-0",
				variant === "toast" && "fixed right-0 bottom-0",
				classNames?.fixedOverlay,
			)}
		>
			<motion.div
				ref={ref}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				{...props.animation}
				className={cn("pointer-events-auto", classNames?.contentWindow)}
			>
				{props.children}
			</motion.div>
		</motion.div>
	);
};

const Portal = ({
	isOpen,
	content,
	overlay,
}: {
	isOpen: boolean;
	content: ReactNode;
	overlay?: ReactNode;
}) => {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	const clear = () => {
		try {
			container && document.body.removeChild(container);
		} catch (e) {
			console.warn(e);
			return;
		}
	};

	useEffect(() => {
		if (isOpen) {
			const el = document.createElement("div");
			document.body.appendChild(el);
			setContainer(el);
		}

		return () => {
			clear();
		};
	}, [isOpen]);

	if (!container) return null;

	return createPortal(
		<AnimatePresence
			onExitComplete={() => {
				clear();
			}}
		>
			{isOpen && <motion.div key="overlay">{overlay}</motion.div>}
			{isOpen && <motion.div key="content">{content}</motion.div>}
		</AnimatePresence>,
		container,
	);
};

interface IDialogContext {
	isOpen: boolean;
	onClose?: () => void;
}

const DialogContext = createContext<IDialogContext | null>(null);

export const useDialogContext = () => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("useDialogContext must be used within a DialogProvider");
	}
	return context;
};

const Dialog = (props: IDialogProps) => {
	const { isOpen, onClose, overlay, content } = props;

	return (
		<DialogContext.Provider value={{ isOpen, onClose }}>
			<Portal isOpen={isOpen} content={content} overlay={overlay} />
		</DialogContext.Provider>
	);
};

Dialog.Overlay = Overlay;
Dialog.Content = Content;

export default Dialog;
