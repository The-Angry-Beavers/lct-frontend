import { createContext, useContext } from "react";
import aptekaCashbackImg from "./assets/apteka.webp?url";
import azcCashbackImg from "./assets/azc.webp?url";
import taxiCashbackImg from "./assets/taxi.webp?url";
import teartCashbackImg from "./assets/teatr.webp?url";

export const availablePrizes: Prize[] = [
	{
		id: "teart-cashback",
		name: "5% кэшбек на театры и кино",
		img: teartCashbackImg,
	},
	{
		id: "azc-cashback",
		name: "5% кэшбек на АЗС",
		img: azcCashbackImg,
	},
	{
		id: "taxi-cashback",
		name: "5% кэшбек на такси",
		img: taxiCashbackImg,
	},
	{
		id: "apteka-cashback",
		name: "5% кэшбек на покупки в аптеке",
		img: aptekaCashbackImg,
	},
];

export interface Prize {
	id: string;
	name: string;
	img: string;
}

export interface PrizesContextType {
	prizes: Prize[];
	addPrize: (prize: Prize) => void;
	availablePrizes: Prize[];
}

export const PrizesContext = createContext<PrizesContextType | undefined>(
	undefined,
);

export const usePrizes = (): PrizesContextType => {
	const context = useContext(PrizesContext);
	if (!context) {
		throw new Error("usePrizes must be used within a PrizesProvider");
	}
	return context;
};
