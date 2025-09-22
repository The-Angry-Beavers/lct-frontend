type TRoute = {
	// путь для react router
	path: string;
	// путь для навигации в этот роут
	// к примеру path = /news/:tab, тогда navigate = /news/fresh
	navigatePath: string;
};

export const AppUrls = {
	HOME: {
		path: "/home",
		navigatePath: "/home",
	},
	SHOP: {
		path: "/shop",
		navigatePath: "/shop",
	},
	TASKS: {
		path: "/tasks",
		navigatePath: "/tasks",
	},
} satisfies Record<string, TRoute>;
