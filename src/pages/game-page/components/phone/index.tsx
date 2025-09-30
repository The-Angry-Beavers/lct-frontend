import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLevelContext } from "@/context/level-context";
import { useMusicPlayer } from "@/packages/music-player";
import { useTapAnimation } from "@/shared/lib/hooks/use-tap-animation";
import phoneActive from "./assets/phone-active.webp?url";
import phoneIdle from "./assets/phone-idle.webp?url";

function useDelayedActionOnSituationChange(
	currentSituationIndex: number,
	callback: () => void,
	delay: number = 30000,
) {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		// очистка предыдущего таймера
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// запуск нового
		timeoutRef.current = setTimeout(() => {
			callback();
		}, delay);

		// очистка при размонтировании или смене индекса
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [currentSituationIndex, delay, callback]);
}

const Phone = () => {
	const { currentSituationIndex } = useLevelContext();
	const { play, stop } = useMusicPlayer();
	const [status, setStatus] = useState<"idle" | "active">("idle");

	const onActive = () => {
		setStatus("active");
		play("ring");
	};

	const onIdle = () => {
		setStatus("idle");
		stop("ring");
	};

	useDelayedActionOnSituationChange(currentSituationIndex, onActive);
	const tapAnimation = useTapAnimation();

	return (
		<motion.div {...tapAnimation}>
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
				onClick={onIdle}
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
