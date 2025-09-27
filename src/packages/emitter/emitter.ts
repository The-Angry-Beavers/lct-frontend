import type { EventMap } from "./events";

export class TypedEmitter<Events extends Record<string, any>> {
	private listeners: {
		[K in keyof Events]?: ((payload: Events[K]) => void)[];
	} = {};

	// стрелочные методы
	on = <K extends keyof Events>(
		event: K,
		callback: (payload: Events[K]) => void,
	) => {
		const eventListeners = this.listeners[event] ?? [];
		eventListeners.push(callback);
		this.listeners[event] = eventListeners;
		return () => this.off(event, callback);
	};

	off = <K extends keyof Events>(
		event: K,
		callback: (payload: Events[K]) => void,
	) => {
		const eventListeners = this.listeners[event];
		if (!eventListeners) return;
		this.listeners[event] = eventListeners.filter((cb) => cb !== callback);
	};

	emit = <K extends keyof Events>(event: K, payload: Events[K]) => {
		this.listeners[event]?.forEach((cb) => cb(payload));
	};
}

// Пример создания конкретного эмиттера
export const appEmitter = new TypedEmitter<EventMap>();
