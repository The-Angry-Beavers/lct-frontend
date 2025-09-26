import { createBrowserRouter } from "react-router";

import HomePage from "@/modules/home-module/pages/home";

const router = createBrowserRouter([
  {
	path: "/",
    index: true,
    element: <HomePage />,
  },
  {
    path: "/home",
	element: <HomePage />
  },

]);

export default router;
