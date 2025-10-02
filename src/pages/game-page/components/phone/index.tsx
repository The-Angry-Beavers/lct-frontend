import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLevelContext } from "@/context/level-context";

import { useEvents } from "@/packages/emitter";
import { useMusicPlayer } from "@/packages/music-player";
import { useTapAnimation } from "@/shared/lib/hooks/use-tap-animation";
import Dialog from "@/shared/ui/dialog";

import bearImg from "./assets/bear.webp?url";
import phoneActive from "./assets/phone-active.webp?url";
import phoneIdle from "./assets/phone-idle.webp?url";

const CloseButton = () => {
	return (
		<svg
			width="36"
			height="36"
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="1" y="1" width="34" height="34" rx="17" fill="#6188E4" />
			<rect
				x="1"
				y="1"
				width="34"
				height="34"
				rx="17"
				stroke="#1F1FA2"
				stroke-width="2"
			/>
			<path
				d="M23.2886 11.151C23.7194 10.7201 24.4182 10.7202 24.8491 11.151C25.2801 11.5819 25.2801 12.2806 24.8491 12.7115L19.5601 17.9996L24.8491 23.2887C25.28 23.7196 25.2799 24.4183 24.8491 24.8492C24.4182 25.2802 23.7195 25.2801 23.2886 24.8492L17.9995 19.5602L12.7114 24.8492C12.2805 25.2801 11.5818 25.2802 11.1509 24.8492C10.7201 24.4183 10.72 23.7196 11.1509 23.2887L16.439 17.9996L11.1509 12.7115C10.7199 12.2806 10.7199 11.5819 11.1509 11.151C11.5818 10.7202 12.2806 10.7201 12.7114 11.151L17.9995 16.4391L23.2886 11.151Z"
				fill="#13139D"
			/>
		</svg>
	);
};

export function useDelayedActionOnSituationChange(
	callback: () => void,
	delay: number = 30000,
) {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const start = useCallback(() => {
		// сброс предыдущего таймера
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		// запуск нового
		timeoutRef.current = setTimeout(() => {
			callback();
		}, delay);
	}, [callback, delay]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return { start };
}

const BearMessage = () => {
	const emitter = useEvents();
	const [hidden, setHidden] = useState<boolean>(true);
	const [text, setText] = useState<string | null>(null);

	const onClose = () => {
		setHidden(true);
		setText(null);
	};

	useEffect(() => {
		const unsubscribe = emitter.on("onBearMessage", (data) => {
			setHidden(false);
			setText(data.message);
		});

		return () => {
			unsubscribe();
		};
	}, [emitter]);

	return (
		<Dialog
			isOpen={!hidden}
			onClose={onClose}
			overlay={<Dialog.Overlay />}
			content={
				<Dialog.Content
					classNames={{
						fixedOverlay: "p-4",
						contentWindow:
							"bg-[#1F1FA3] p-3 text-white min-w-[20rem] relative rounded-[0.75rem]",
					}}
				>
					<div className="bg-[#6188E4] w-full flex flex-col min-h-[5.125rem] rounded-[0.375rem] relative mb-3">
						<div className="text-center flex-1 flex items-center justify-center font-halvar font-bold relative w-full h-full ">
							<img
								className="h-[6rem] aspect-square object-contain object-bottom absolute bottom-0 -translate-x-1/2 left-[calc(50%-6.5rem)]"
								src={bearImg}
								alt=""
							/>
							ДИРЕКТОР
							<br />
							ПО&nbsp;МЕЧТАМ
						</div>
					</div>
					<p className="mb-4 text-center">{text}</p>
					<button
						onClick={onClose}
						type="button"
						className="bg-white w-full rounded-[0.75rem] px-4 py-3 text-[#060698]"
					>
						Понятно, спасибо
					</button>
					<button
						type="button"
						onClick={onClose}
						className="absolute -right-3 -top-3"
					>
						<CloseButton />
					</button>
				</Dialog.Content>
			}
		></Dialog>
	);
};

const Phone = () => {
	const { currentSituation, result } = useLevelContext();
	const { play, stop } = useMusicPlayer();
	const [status, setStatus] = useState<"idle" | "active">("idle");
	const [hintIsAvailable, setHintIsAvailable] = useState<boolean>(false);
	const emitter = useEvents();

	const onActive = () => {
		if (result) {
			return;
		}
		setStatus("active");
		setHintIsAvailable(true);
		play("ringtone");
	};

	const { start } = useDelayedActionOnSituationChange(onActive);

	useEffect(() => {
		const unsb = emitter.on("onClientReady", () => {
			start();
		});

		const unsb1 = emitter.on("onClientExit", () => {
			setHintIsAvailable(false);
			setStatus("idle");
			stop("ringtone");
		});

		return () => {
			unsb();
			unsb1();
		};
	}, []);

	const tapAnimation = useTapAnimation();

	return (
		<motion.div {...tapAnimation}>
			<BearMessage />
			<motion.div
				animate={
					status === "active"
						? {
								rotate: [0, -2, 2, -2, 2, 0, 0], // качание
							}
						: { rotate: 0 }
				}
				transition={
					status === "active"
						? {
								duration: 2,
								times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
								repeat: Infinity,
								ease: "linear",
							}
						: {}
				}
				onClick={() => {
					setStatus("idle");
					stop("ringtone");
					emitter.emit("onBearMessage", {
						message: hintIsAvailable
							? currentSituation.hint.text
							: "Подсказка ещё спит в берлоге. Как только проснётся — я позвоню.",
					});
				}}
				style={{
					display: "inline-block",
					transformOrigin: "center center", // фиксируем центр
				}}
			>
				<img
					className="w-[9.0625rem] aspect-[145/89]"
					src={status === "idle" ? phoneIdle : phoneActive}
					alt=""
				/>
			</motion.div>
		</motion.div>
	);
};

export default Phone;
