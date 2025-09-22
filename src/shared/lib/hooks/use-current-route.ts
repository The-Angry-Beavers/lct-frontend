import { useLocation } from "react-router";
import { findRoute } from "@/shared/config/routes";

export const useCurrentRoute = () => {
	const location = useLocation();
	const currentRoute = findRoute(location.pathname);
	return { currentRoute };
};
