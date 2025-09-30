import { createContext, useContext } from "react";
import type { Level, Situation } from "@/shared/types";

export type SituationAnswer = {
	situationIndex: number;
	ids: string[];
};

export type ILevelContext = {
	level: Level;
	answers: SituationAnswer[];
	addAnswer: (answer: SituationAnswer) => void;
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
