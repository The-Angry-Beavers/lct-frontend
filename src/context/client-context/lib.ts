import { createContext, useContext } from "react";

export type IClientContext = {
	questionnaireIsOpen: boolean;
	setQuestionnaireIsOpen: (value: boolean) => void;
};

export const ClientContext = createContext<IClientContext | null>(null);

export const useClientContext = () => {
	const context = useContext(ClientContext);
	if (!context) {
		throw new Error("usePersonContext must be used within a PersonProvider");
	}
	return context;
};
