import { createContext, useContext } from "react";
import type { Situation } from "@/shared/types";

export type ILevelContext = {
	goNextSituation: () => void;
	currentSituationIndex: number;
	currentSituation: Situation;
	situations: Situation[];
};

export const LevelContext = createContext<ILevelContext | null>(null);

export const useLevelContext = () => {
	const context = useContext(LevelContext);
	if (!context) {
		throw new Error("useLevelContext must be used within a LevelProvider");
	}
	return context;
};
