import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const baseURL = import.meta.env.VITE_BACKEND_URL;

export const seed = uuidv4();

export const http = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
		accept: "application/json",
	},
});
