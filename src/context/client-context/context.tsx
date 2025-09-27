import { type ReactNode, useState } from "react";
import type { Client } from "@/shared/types";
import { ClientContext } from "./lib";

const ClientProvider = (props: { children: ReactNode; client: Client }) => {
	const [questionnaireIsOpen, setQuestionnaireIsOpen] =
		useState<boolean>(false);
	return (
		<ClientContext.Provider
			value={{
				questionnaireIsOpen,
				setQuestionnaireIsOpen,
				client: props.client,
			}}
		>
			{props.children}
		</ClientContext.Provider>
	);
};

export { ClientProvider };
