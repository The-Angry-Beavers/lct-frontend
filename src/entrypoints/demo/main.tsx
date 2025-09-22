//import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "../../index.css";

createRoot(document.getElementById("root")!).render(
	<div className="w-screen h-screen overflow-scroll bg-black grid place-items-center p-10">
		<iframe
			title="demo"
			src="http://localhost:3000"
			style={{
				width: "375px",
				height: "667px",
				outline: "1px solid #ccc",
				borderRadius: "20px",
				boxShadow: "0 0 20px rgba(0,0,0,0.2)",
			}}
		/>
	</div>,
);
