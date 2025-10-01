import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { v4 } from "uuid";
import { acknowledgeDayFinish, getLevel } from "@/api/game";

export const useGenerateLevel = () => {
	const [seed] = useState(v4());
	return useQuery({
		staleTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
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
