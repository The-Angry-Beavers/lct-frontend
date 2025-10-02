import { type ReactNode, useEffect, useRef, useState } from "react";
import {
	MusicPlayerContext,
	type PlayerContextType,
	type TrackName,
	tracks,
} from "./lib";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
	// Рефы аудио
	const audioRefs = useRef<Record<TrackName, HTMLAudioElement>>({
		background: Object.assign(new Audio(tracks.background), {
			loop: true,
			volume: 0.5,
		}),
		ring: Object.assign(new Audio(tracks.ring), { loop: true }),
		chatter: Object.assign(new Audio(tracks.chatter), { loop: true }),
		new_chat: Object.assign(new Audio(tracks.new_chat)),
		ringtone: Object.assign(new Audio(tracks.ringtone)),
		// click: new Audio(tracks.click),
		// success: new Audio(tracks.success),
	});

	const [muted, setMuted] = useState(false); // состояние "все звуки выкл/вкл"

	// Инициализация аудио (Safari автоплей)
	const init = async () => {
		for (const key of Object.keys(audioRefs.current) as TrackName[]) {
			const audio = audioRefs.current[key];
			try {
				audio.muted = true;
				audio.play();
				audio.pause();
				audio.currentTime = 0;
				audio.muted = muted;
			} catch {
				// Игнорируем ошибки автоплея
			}
		}
	};

	const play = (name: TrackName) => {
		const audio = audioRefs.current[name];
		if (!audio) return;
		audio.currentTime = 0;
		audio.play();
	};

	const stop = (name: TrackName) => {
		const audio = audioRefs.current[name];
		if (!audio) return;
		audio.pause();
		audio.currentTime = 0;
	};

	const toggle = (name: TrackName) => {
		const audio = audioRefs.current[name];
		if (!audio) return;
		if (audio.paused) {
			audio.currentTime = 0;
			audio.play();
		} else {
			audio.pause();
			audio.currentTime = 0;
		}
	};

	const stopAll = () => {
		(Object.keys(audioRefs.current) as TrackName[]).forEach(stop);
	};

	const mute = () => setMuted(true);
	const unMute = () => setMuted(false);
	const toggleMute = () => setMuted((prev) => !prev);

	// Применяем mute ко всем аудио при изменении состояния
	useEffect(() => {
		(Object.values(audioRefs.current) as HTMLAudioElement[]).forEach(
			(audio) => {
				audio.muted = muted;
			},
		);
	}, [muted]);

	// Инициализация аудио после первого взаимодействия пользователя
	useEffect(() => {
		const handler = async () => {
			await init();
			setTimeout(() => play("background"));
			window.removeEventListener("click", handler);
			window.removeEventListener("touchstart", handler);
			window.removeEventListener("keydown", handler);
		};
		window.addEventListener("click", handler, { once: true });
		window.addEventListener("touchstart", handler, { once: true });
		window.addEventListener("keydown", handler, { once: true });
		return () => {
			window.removeEventListener("click", handler);
			window.removeEventListener("touchstart", handler);
			window.removeEventListener("keydown", handler);
		};
	}, []);

	const api: PlayerContextType = {
		init,
		play,
		stop,
		stopAll,
		toggle,
		mute,
		unMute,
		toggleMute,
		muted,
	};

	return (
		<MusicPlayerContext.Provider value={api}>
			{children}
		</MusicPlayerContext.Provider>
	);
};
