import { createContext, useContext } from "react";
import { appEmitter, type TypedEmitter } from "./emitter";
import type { EventMap } from "./events";

const EventsContext = createContext<TypedEmitter<EventMap>>(appEmitter);

export const useEvents = () => useContext(EventsContext);
