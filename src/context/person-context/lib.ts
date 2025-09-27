import { createContext, useContext } from "react";

export type IPersonContext = {
	questionnaireIsOpen: boolean;
	setQuestionnaireIsOpen: (value: boolean) => void;
};

export const PersonContext = createContext<IPersonContext | null>(null);

export const usePersonContext = () => {
	const context = useContext(PersonContext);
	if (!context) {
		throw new Error("usePersonContext must be used within a PersonProvider");
	}
	return context;
};
