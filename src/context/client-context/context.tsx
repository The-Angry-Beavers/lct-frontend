import { type ReactNode, useState } from "react";
import { useLevelContext } from "../level-context";
import { ClientContext } from "./lib";

const ClientProvider = (props: { children: ReactNode }) => {
	const { currentClient } = useLevelContext();
	const [questionnaireIsOpen, setQuestionnaireIsOpen] =
		useState<boolean>(false);

	return (
		<ClientContext.Provider
			value={{
				questionnaireIsOpen,
				setQuestionnaireIsOpen,
				client: currentClient,
			}}
		>
			{props.children}
		</ClientContext.Provider>
	);
};

export { ClientProvider };
