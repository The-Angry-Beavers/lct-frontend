import { createBrowserRouter, Outlet } from "react-router";
import { PrizesProvider } from "@/context/prizes-context/context";
import GamePage from "@/pages/game-page";
import OnboardingPage from "@/pages/onboarding-page";
import PrizesPage from "@/pages/prizes-page";
import RulesPage from "@/pages/rules-page";
import StartPage from "@/pages/start-page";

const router = createBrowserRouter([
	{
		element: (
			<PrizesProvider>
				<Outlet />
			</PrizesProvider>
		),
		children: [
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
				path: "/prizes",
				element: <PrizesPage />,
			},
			{
				path: "/onboarding",
				element: <OnboardingPage />,
			},
			{
				path: "/game",
				element: <GamePage />,
			},
		],
	},
]);

export default router;
