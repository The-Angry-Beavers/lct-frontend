import type { ReactNode } from "react";

const AppProvider = (props: { children: ReactNode }) => {
	return <>{props.children}</>;
};

export default AppProvider;
