import { createContext, useContext } from "react";
import type { Client, Situation } from "@/shared/types";
import type { SituationAnswer } from "../level-context/lib";

export type ISituationContext = {
	questionnaireIsOpen: boolean;
	setQuestionnaireIsOpen: (value: boolean) => void;
	client: Client;
	situation: Situation;
	currentAnswers: string[];
	setCurrentAnswers: (value: string[]) => void;
	onSubmit: () => void;
};

export const SituationContext = createContext<ISituationContext | null>(null);

export const useSituationContext = () => {
	const context = useContext(SituationContext);
	if (!context) {
		throw new Error(
			"useSituationContext must be used within a SituationProvider",
		);
	}
	return context;
};
