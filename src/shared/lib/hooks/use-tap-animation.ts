import { useCallback, useState } from "react";

export function useTapAnimation(duration = 150) {
	const [isTapped, setIsTapped] = useState(false);

	const handleTap = useCallback(() => {
		setIsTapped(true);
		setTimeout(() => setIsTapped(false), duration);
	}, [duration]);

	const animationProps = {
		animate: isTapped
			? { scale: 0.95, opacity: 0.8 }
			: { scale: 1, opacity: 1 },
		transition: { type: "spring", stiffness: 500, damping: 30 },
		onTap: handleTap,
	} as const;

	return animationProps;
}
