import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import router from "@/app/routes/app-router";
import { MusicPlayerProvider } from "@/packages/music-player";
import BaseLayout from "./layouts/base-layout";

const queryClient = new QueryClient();

function App() {
	return (
		<MusicPlayerProvider>
			<QueryClientProvider client={queryClient}>
				<BaseLayout>
					<RouterProvider router={router} />
				</BaseLayout>
			</QueryClientProvider>
		</MusicPlayerProvider>
	);
}

export default App;
