// Импортируем звуки
import { createContext, useContext } from "react";
import background from "./assets/background.mp3?url";
import chatter from "./assets/chatter.mp3?url";
import new_chat from "./assets/new-chat.mp3?url";
import ring from "./assets/ring.mp3?url";
import ringtone from "./assets/ringtone.mp3?url";

// Словарь доступных треков
export const tracks = {
	background,
	ring,
	chatter,
	new_chat,
	ringtone,
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
