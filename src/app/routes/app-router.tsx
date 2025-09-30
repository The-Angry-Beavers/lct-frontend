import { createBrowserRouter } from "react-router";

import GamePage from "@/pages/game-page";
import StartPage from "@/pages/start-page";
import RulesPage from "@/pages/rules-page";
import OnboardingPage from "@/pages/onboarding-page";

const router = createBrowserRouter([
	{
		path: "/",
		index: true,
		element: <StartPage />,
	},
	{
		path: "/rules",
		element: <RulesPage />,
	},
	{
		path: "/onboarding",
		element: <OnboardingPage />,
	},
	{
		path: "/game",
		element: <GamePage />,
	},
]);

export default router;
