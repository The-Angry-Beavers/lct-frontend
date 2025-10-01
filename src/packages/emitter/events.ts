import type { ReactNode } from "react";
import type { Client } from "@/shared/types";

export type EventMap = {
	onClientReady: { client: Client };
	onClientExit: { client: Client };
	onBearMessage: { message: string };
};
