import { type ReactNode, useState } from "react";
import { PersonContext } from "./lib";

const PersonProvider = (props: { children: ReactNode }) => {
	const [questionnaireIsOpen, setQuestionnaireIsOpen] =
		useState<boolean>(false);
	return (
		<PersonContext.Provider
			value={{ questionnaireIsOpen, setQuestionnaireIsOpen }}
		>
			{props.children}
		</PersonContext.Provider>
	);
};

export { PersonProvider };
