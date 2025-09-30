import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useEvents } from "@/packages/emitter";
import type { Level, Situation } from "@/shared/types";
import { LevelContext, type SituationAnswer } from "./lib";

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

	const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
	const [answers, setAnswers] = useState<SituationAnswer[]>([]);

	const currentSituation = useMemo(() => {
		return situations[currentSituationIndex];
	}, [currentSituationIndex, situations]);

	const emitter = useEvents();

	const goNextSituation = () => {
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
