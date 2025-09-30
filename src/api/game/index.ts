import { v4 as uuidv4 } from "uuid";
import type { Level } from "@/shared/types";
import { baseURL, http } from "..";
import type { SituationDTO } from "./dto";

export const getSituation = async (args: {
	seed: string;
	num_iterations: number;
}) => {
	const response = await http.post<SituationDTO>(
		"/api/game/generateSituation",
		args,
	);

	response.data.client.sprite = baseURL + response.data.client.sprite;
	return response.data;
};

export const getLevel = async (): Promise<Level> => {
	const seed = uuidv4();
	const CLIENT_COUNT = 10;

	const situations = await Promise.all(
		Array.from({ length: CLIENT_COUNT }, (_, i) =>
			getSituation({ seed, num_iterations: i }),
		),
	);

	return {
		level_info: {
			seed: seed,
		},
		situations: situations.map((e, index) => ({
			index: index,
			client: e.client,
			answers: e.answers,
		})),
	};
};

export const getHint = async () => {
	const response = await http.post("/api/game/getHint");
	return response.data;
};

export const acknowledgeDayFinish = async () => {
	const response = await http.post("/api/game/acknowledgeDayFinish");
	return response.data;
};
