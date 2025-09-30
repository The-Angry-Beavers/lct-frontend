import { useQuery } from "@tanstack/react-query";

import { getLevel } from "@/api/game";

export const useGenerateLevel = () => {
	return useQuery({
		queryKey: ["level"],
		queryFn: () => {
			const level = getLevel();
			return level;
		},
	});
};
