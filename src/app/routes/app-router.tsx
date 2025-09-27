import { createBrowserRouter } from "react-router";

import GamePage from "@/pages/game-page";
import StartPage from "@/pages/start-page";

const router = createBrowserRouter([
	{
		path: "/",
		index: true,
		element: <StartPage />,
	},
	{
		path: "/game",
		element: <GamePage />,
	},
]);

export default router;
