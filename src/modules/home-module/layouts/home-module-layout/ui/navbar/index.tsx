import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { AppUrls, type TRoute } from "@/shared/config/routes";
import { useCurrentRoute } from "@/shared/lib/hooks/use-current-route";
import { Button } from "@/shared/ui/button";

type TNavbarNode = {
	route: TRoute;
	title: ReactNode;
};

const NODES: TNavbarNode[] = [
	{
		route: AppUrls.HOME,
		title: <>Домой</>,
	},
	{
		route: AppUrls.SHOP,
		title: <>Магазин</>,
	},
	{
		route: AppUrls.TASKS,
		title: <>Квесты</>,
	},
];

const NavbarNode = (props: { node: TNavbarNode }) => {
	const { route, title } = props.node;
	const { currentRoute } = useCurrentRoute();
	const isActive = route.path === currentRoute?.path;
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => {
				navigate(route.navigatePath);
			}}
			variant={isActive ? "secondary" : "primary"}
		>
			{title}
		</Button>
	);
};

const HomeModuleNavbar = () => {
	return (
		<div className="pb-[2.5rem] flex justify-around">
			{NODES.map((e) => (
				<NavbarNode node={e} key={e.route.path} />
			))}
		</div>
	);
};

export default HomeModuleNavbar;
