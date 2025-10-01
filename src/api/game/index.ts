import type { SituationAnswer } from "@/context/level-context/lib";
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

export const getLevel = async (seed: string): Promise<Level> => {
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

export const getHint = async (seed: string, num_iterations: number) => {
	const response = await http.post("/api/game/getHint", {
		seed,
		num_iterations,
	});
	return response.data;
};

export const acknowledgeDayFinish = async (args: {
	seed: string;
	answers: SituationAnswer[];
}) => {
	const answers = args.answers.map((e) => ({
		iteration: e.situationIndex,
		recommended_product_ids: e.ids,
	}));
	const payload = {
		seed: args.seed,
		answers,
	};
	const response = await http.post("/api/game/acknowledgeDayFinish", payload);
	return response.data;
};
