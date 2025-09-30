import { type ReactNode, useState } from "react";
import { useLevelContext } from "../level-context";
import { SituationContext } from "./lib";

const SituationProvider = (props: { children: ReactNode }) => {
	const { currentSituation, answers, addAnswer, goNextSituation } =
		useLevelContext();
	const [questionnaireIsOpen, setQuestionnaireIsOpen] =
		useState<boolean>(false);

	const onSubmit = () => {
		setQuestionnaireIsOpen(false);
		goNextSituation();
	};

	return (
		<SituationContext.Provider
			value={{
				onSubmit: onSubmit,
				situation: currentSituation,
				currentAnswers:
					answers.find((e) => e.situationIndex === currentSituation.index)
						?.ids ?? [],
				setCurrentAnswers: (value: string[]) => {
					console.log(value);
					addAnswer({
						situationIndex: currentSituation.index,
						ids: value,
					});
				},
				questionnaireIsOpen,
				setQuestionnaireIsOpen,
				client: currentSituation.client,
			}}
		>
			{props.children}
		</SituationContext.Provider>
	);
};

export { SituationProvider };
