import { createContext, useContext } from "react";

type TBaseLayoutContext = {
	sideBarIsOpen: boolean;
	setSideBarIsOpen: (value: boolean) => void;
};

export const BaseLayoutContext = createContext<TBaseLayoutContext | null>(null);

export const useBaseLayoutContext = () => {
	const context = useContext(BaseLayoutContext);
	if (!context) {
		throw new Error(
			"useBaseLayoutContext must be used within a BaseLayoutProvider",
		);
	}

	return context;
};
