import { Outlet } from "react-router";
import { BaseLayout } from "@/shared/ui/base-layout";
import HomeModuleNavbar from "./ui/navbar";

const HomeModuleLayout = () => {
	return <BaseLayout page={<Outlet />} navbar={<HomeModuleNavbar />} />;
};

export default HomeModuleLayout;
