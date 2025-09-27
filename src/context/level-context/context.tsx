import { type ReactNode, useMemo, useState } from "react";
import { MockClient1, MockClient2 } from "@/mock/mock-client";
import { useEvents } from "@/packages/emitter";
import type { Client } from "@/shared/types";
import { LevelContext } from "./lib";

type LevelProviderProps = {
	children:
		| ReactNode
		| ((context: {
				goNextClient: () => void;
				currentClientIndex: number;
				currentClient: Client;
				clients: Client[];
		  }) => ReactNode);
};

const LevelProvider = (props: LevelProviderProps) => {
	const [clients] = useState<Client[]>([MockClient1, MockClient2]);
	const [currentClientIndex, setCurrentClientIndex] = useState(0);

	const currentClient = useMemo(() => {
		return clients[currentClientIndex];
	}, [currentClientIndex, clients]);

	const emitter = useEvents();

	const goNextClient = () => {
		const exitingClient = clients[currentClientIndex]; // текущий клиент перед сменой
		setCurrentClientIndex((prevIndex) => (prevIndex + 1) % clients.length);
		emitter.emit("onClientExit", { client: exitingClient });
	};

	const contextValue = {
		goNextClient,
		currentClientIndex,
		currentClient,
		clients,
	};

	return (
		<LevelContext.Provider value={contextValue}>
			{typeof props.children === "function"
				? props.children(contextValue)
				: props.children}
		</LevelContext.Provider>
	);
};

export { LevelProvider };
