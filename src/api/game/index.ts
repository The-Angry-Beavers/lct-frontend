import type { SituationAnswer } from "@/context/level-context/lib";
import type { Level } from "@/shared/types";
import { http } from "..";
import type { SituationDTO } from "./dto";

export const getSituation = async (args: {
	seed: string;
	num_iterations: number;
}) => {
	const response = await http.post<SituationDTO>(
		"/api/game/generateSituation",
		args,
	);

	return response.data;
};

export const getSituationsChunk = async (args: {
	seed: string;
	total_iterations: number;
}) => {
	const response = await http.post<SituationDTO[]>(
		"/api/game/generateChunkSituations",
		args,
	);

	return response.data;
};

export const getLevel = async (seed: string): Promise<Level> => {
	const situations = await getSituationsChunk({ seed, total_iterations: 10 });

	return {
		level_info: {
			seed: seed,
		},
		situations: situations.map((e, index) => ({
			hint: e.hint,
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
