import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { useMusicPlayer } from "@/packages/music-player";
import { useTapAnimation } from "@/shared/lib/hooks/use-tap-animation";

const NoteSvg = () => {
	return (
		<svg
			xlinkTitle=""
			width="33"
			height="35"
			viewBox="0 0 33 35"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M30.6621 0.0458984C31.6088 -0.190781 32.5264 0.526095 32.5264 1.50195V24.5967C32.83 25.0931 33 25.6424 33 26.2207C32.9997 28.4297 30.5374 30.2207 27.5 30.2207C24.4626 30.2207 22.0003 28.4297 22 26.2207C22 24.0116 24.4624 22.2207 27.5 22.2207C29.0901 22.2207 30.5222 22.7115 31.5264 23.4961V5.875L10.5264 11.6025V28.5967C10.83 29.0931 11 29.6424 11 30.2207C10.9997 32.4297 8.53739 34.2207 5.5 34.2207C2.46261 34.2207 0.000286287 32.4297 0 30.2207C0 28.0116 2.46243 26.2207 5.5 26.2207C7.09008 26.2207 8.52221 26.7115 9.52637 27.4961V6.50195C9.52637 5.8138 9.99459 5.21299 10.6621 5.0459L30.6621 0.0458984Z"
				fill="white"
			/>
		</svg>
	);
};

const LineSvg = ({ muted }: { muted: boolean }) => {
	const pathVariants = {
		hidden: { pathLength: 0, opacity: 0 },
		visible: { pathLength: 1, opacity: 1 },
	};

	return (
		<motion.svg
			width="35"
			height="33"
			viewBox="0 0 35 33"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<motion.path
				d="M2 4L31 31"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
				variants={pathVariants}
				initial="hidden"
				animate={muted ? "visible" : "hidden"}
				transition={{ duration: 0.3 }}
			/>
			<motion.path
				d="M4 2L33 29"
				stroke="#060698"
				strokeWidth="3"
				strokeLinecap="round"
				variants={pathVariants}
				initial="hidden"
				animate={muted ? "visible" : "hidden"}
				transition={{ duration: 0.3 }}
			/>
		</motion.svg>
	);
};

const MuteButton = () => {
	const { muted, play, toggleMute, mute, unMute } = useMusicPlayer();

	const [isTapped, setIsTapped] = useState(false);

	const handleTap = () => {
		setIsTapped(true);
		setTimeout(() => setIsTapped(false), 150); // короткая анимация
	};

	return (
		<motion.button
			type="button"
			onTap={handleTap} // срабатывает даже при коротком тапе
			animate={
				isTapped ? { scale: 0.95, opacity: 0.8 } : { scale: 1, opacity: 1 }
			}
			onClick={() => {
				toggleMute();
			}}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
			className="bg-[#1F1FA233] top-2 left-2 backdrop-blur-sm rounded-full w-[2.5rem] aspect-square"
		>
			<div className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<NoteSvg />
			</div>
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
				<LineSvg muted={muted} />
			</div>
		</motion.button>
	);
};

export default MuteButton;
