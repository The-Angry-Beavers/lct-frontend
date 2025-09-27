import { type ReactNode, useState } from "react";
import { ClientContext } from "./lib";

const ClientProvider = (props: { children: ReactNode }) => {
	const [questionnaireIsOpen, setQuestionnaireIsOpen] =
		useState<boolean>(false);
	return (
		<ClientContext.Provider
			value={{ questionnaireIsOpen, setQuestionnaireIsOpen }}
		>
			{props.children}
		</ClientContext.Provider>
	);
};

export { ClientProvider };
