import { createContext, useContext } from "react";
import type { Client } from "@/shared/types";

export type ILevelContext = {
	clients: Client[];
	currentClient: Client;
	currentClientIndex: number;
	goNextClient: () => void;
};

export const LevelContext = createContext<ILevelContext | null>(null);

export const useLevelContext = () => {
	const context = useContext(LevelContext);
	if (!context) {
		throw new Error("useLevelContext must be used within a LevelProvider");
	}
	return context;
};
