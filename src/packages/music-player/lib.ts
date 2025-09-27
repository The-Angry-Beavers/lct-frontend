// Импортируем звуки
import { createContext, useContext } from "react";
import background from "./assets/background.mp3?url";
// import click from "./click.mp3?url";
// import success from "./success.mp3?url";

// Словарь доступных треков
export const tracks = {
	background,
	// click,
	// success,
} as const;

export type TrackName = keyof typeof tracks;

export type PlayerContextType = {
	init: () => Promise<void>;
	play: (name: TrackName) => void;
	stop: (name: TrackName) => void;
	toggle: (name: TrackName) => void;
	stopAll: () => void;
	muted: boolean;
	mute: () => void;
	unMute: () => void;
	toggleMute: () => void;
};

export const MusicPlayerContext = createContext<PlayerContextType | undefined>(
	undefined,
);

export const useMusicPlayer = () => {
	const ctx = useContext(MusicPlayerContext);
	if (!ctx) {
		throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
	}
	return ctx;
};
