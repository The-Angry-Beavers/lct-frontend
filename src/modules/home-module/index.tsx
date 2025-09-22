import type { RouteObject } from "react-router";
import type { TAppUrls } from "@/shared/config/routes";
import HomeModuleLayout from "./layouts/home-module-layout";
import HomePage from "./pages/home";
import ShopPage from "./pages/shop";
import TasksPage from "./pages/tasks";

const getHomeModuleRoutes = (urls: TAppUrls): RouteObject[] => {
	return [
		{
			element: <HomeModuleLayout />,
			children: [
				{
					path: urls.HOME.path,
					element: <HomePage />,
				},
				{
					path: urls.SHOP.path,
					element: <ShopPage />,
				},
				{
					path: urls.TASKS.path,
					element: <TasksPage />,
				},
			],
		},
	];
};

export { getHomeModuleRoutes as getHomeModule };
