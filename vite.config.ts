import * as path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
	const isDemo = process.env.DEMO === "true";

	console.log(isDemo);

	return {
		plugins: [react()],
		root: isDemo
			? path.resolve(__dirname, "src/entrypoints/demo")
			: path.resolve(__dirname, "src/entrypoints/app"),
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
				"@app": path.resolve(__dirname, "src/app"),
				"@pages": path.resolve(__dirname, "src/pages"),
				"@features": path.resolve(__dirname, "src/features"),
				"@entities": path.resolve(__dirname, "src/entities"),
				"@shared": path.resolve(__dirname, "src/shared"),
			},
		},
		server: {
			host: "0.0.0.0",
			port: isDemo ? 3001 : 3000,
		},
	};
});
