import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { v4 } from "uuid";
import { acknowledgeDayFinish, getLevel } from "@/api/game";

export const useGenerateLevel = () => {
	const [seed] = useState("ba71f4e0-7b4a-4f85-83f3-bd5a1c328f4f");
	return useQuery({
		queryKey: ["level", seed],
		queryFn: () => {
			const level = getLevel(seed);
			return level;
		},
	});
};

export const useCalcLevelResults = () => {
	return useMutation({
		mutationFn: acknowledgeDayFinish,
		// при успехе можно сбросить кэш каких-то query
		onSuccess: (data) => {
			console.log("Day finished!", data);
			// queryClient.invalidateQueries(["gameState"]);
		},
	});
};
