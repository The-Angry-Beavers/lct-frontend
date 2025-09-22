import { createBrowserRouter, Navigate } from "react-router";
import { getHomeModule } from "@/modules/home-module";

import { AppUrls } from "@/shared/config/routes";

const router = createBrowserRouter([
	{
		index: true,
		element: <Navigate to={AppUrls.HOME.navigatePath} />,
	},
	...getHomeModule(AppUrls),
]);

export default router;
