import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useEvents } from "@/packages/emitter";
import { useMusicPlayer } from "@/packages/music-player";
import { useCalcLevelResults } from "@/queries";
import type { Level, LevelResult, Situation } from "@/shared/types";
import { LevelContext, type SituationAnswer } from "./lib";
import { mock_result } from "./mock-result";

type LevelProviderProps = {
	level: Level;
	children:
		| ReactNode
		| ((context: {
				goNextSituation: () => void;
				currentSituationIndex: number;
				currentSituation: Situation;
				situations: Situation[];
		  }) => ReactNode);
};

const preloadImages = (urls: string[]) => {
	urls.forEach((url) => {
		console.log(url);
		const img = new Image();
		img.src = url;
	});
};

const LevelProvider = (props: LevelProviderProps) => {
	const { level } = props;
	const { situations } = level;
	const { play } = useMusicPlayer();

	const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
	const [answers, setAnswers] = useState<SituationAnswer[]>([]);

	const currentSituation = useMemo(() => {
		return situations[currentSituationIndex];
	}, [currentSituationIndex, situations]);

	const emitter = useEvents();

	const { mutate, data, isPending } = useCalcLevelResults();

	const onLevelFinish = () => {
		mutate({
			seed: level.level_info.seed,
			answers,
		});
	};

	useEffect(() => {
		play("background");
	}, []);

	const goNextSituation = () => {
		if (currentSituationIndex === 9) {
			onLevelFinish();
			return;
		}

		const exitingSituation = situations[currentSituationIndex]; // текущая ситуация перед сменой
		setCurrentSituationIndex(
			(prevIndex) => (prevIndex + 1) % situations.length,
		);
		emitter.emit("onClientExit", { client: exitingSituation.client });
	};

	const addAnswer = (answer: SituationAnswer) => {
		setAnswers((prev) => [
			...prev.filter((e) => e.situationIndex !== answer.situationIndex),
			answer,
		]);
	};

	useEffect(() => {
		preloadImages(situations.map((e) => e.client.sprite));
	}, []);

	const contextValue = {
		answers,
		addAnswer,
		level,
		goNextSituation,
		currentSituationIndex,
		currentSituation,
		situations,
		// result: mock_result as any as LevelResult,
		result: data,
		resultIsLoading: isPending,
	};

	return (
		<LevelContext.Provider value={contextValue}>
			{typeof props.children === "function"
				? props.children(contextValue)
				: props.children}
		</LevelContext.Provider>
	);
};

export { LevelProvider };
