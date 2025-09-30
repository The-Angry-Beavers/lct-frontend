import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { v4 } from "uuid";
import { getLevel } from "@/api/game";

export const useGenerateLevel = () => {
	const [seed] = useState(v4());
	return useQuery({
		queryKey: ["level", seed],
		queryFn: () => {
			const level = getLevel(seed);
			return level;
		},
	});
};
