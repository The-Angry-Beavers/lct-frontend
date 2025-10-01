import { useLevelContext } from "@/context/level-context";

export const useLevelResults = () => {
	const { result } = useLevelContext();
	if (!result) {
		throw new Error("result is undefined");
	}
	return { result };
};
