import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ClientProvider, useClientContext } from "@/context/client-context";
import { LevelProvider, useLevelContext } from "@/context/level-context";
import { useEvents } from "@/packages/emitter";
import { useGenerateLevel } from "@/queries";
import BackgroundImg from "@/shared/assets/bg.png?url";
import DeskImg from "@/shared/assets/desk.png?url";
import MuteButton from "@/shared/components/mute-button";
import QuestionnaireModal from "../questionnaire/questionnaire-modal";
import TableQuestionnaire from "../questionnaire/table-questionnaire";

const Table = () => {
	return (
		<div className="absolute bottom-0">
			<img alt="" src={DeskImg} />
			<div className="w-3/4 h-[120px] -left-[50px] -top-[100px] bg-[#1F1FA233] backdrop-blur-sm absolute rounded-3xl" />
			<TableQuestionnaire />
		</div>
	);
};

const Background = () => {
	return (
		<div className="absolute left-0 bg-slate-50 top-0 right-0 bottom-0">
			<img
				className="top-0 absolute w-full h-[calc(100%-12rem)] bottom-0 right-0 left-0 object-cover object-left"
				src={BackgroundImg}
				alt=""
			/>
		</div>
	);
};

const NextButton = () => {
	const { goNextSituation } = useLevelContext();
	return (
		<button
			onClick={() => {
				goNextSituation();
			}}
			type="button"
		>
			Next client
		</button>
	);
};

const ClientMessage = () => {
	const emitter = useEvents();
	const { client } = useClientContext();
	const [hidden, setHidden] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = emitter.on("onClientReady", (data) => {
			setHidden(false);
		});

		const unsubscribe1 = emitter.on("onClientExit", (data) => {
			setHidden(true);
		});

		return () => {
			unsubscribe(); // очистка при размонтировании
			unsubscribe1();
		};
	}, [emitter]);

	return (
		<AnimatePresence mode="popLayout">
			{!hidden && (
				<motion.div
					exit={{ x: "100vw" }}
					initial={{ x: "100vw" }}
					animate={{ x: 0 }}
					className="absolute w-[19.375rem] right-[1rem] bottom-[calc(12rem+8rem)]"
				>
					<div className="bg-white translate-y-[100%] skew-x-[-20deg] rounded-[1rem] border-2 border-black">
						<div className="text-black skew-x-[20deg] px-4 py-2">
							{client.message}
						</div>
						<div className="absolute skew-x-[20deg] left-[2rem] top-[-1.25rem] rounded-full px-2 py-[0.0625rem] border-2 border-white bg-[#1919EF]">
							{client.name}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Client = () => {
	const { currentSituationIndex } = useLevelContext();
	const { client } = useClientContext();
	const { sprite } = client;
	const { emit } = useEvents();

	const walkDuration = 2; // общее время "подхода"

	return (
		<div className="absolute left-0 top-0 right-0 h-[calc(100%-12rem+12px)] overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.img
					onAnimationComplete={(definition) => {
						// @ts-expect-error
						if (definition.x === "0%") {
							emit("onClientReady", { client });
							// setIsClientReady(true);
						}
					}}
					key={currentSituationIndex} // ключ по client.id для exit
					className="bottom-0 absolute"
					alt=""
					src={sprite}
					initial={{ x: "-100%", y: 0 }}
					animate={{
						x: "0%",
						y: [0, -12, 0, -12, 0, -12, 0], // шаги входа
					}}
					exit={{
						x: "100%",
						y: [0, -12, 0, -12, 0, -12, 0], // шаги выхода
					}}
					transition={{
						duration: walkDuration,
						ease: "easeOut",
						y: {
							duration: walkDuration,
							ease: "easeInOut",
						},
					}}
				/>
			</AnimatePresence>
		</div>
	);
};

const GameField = () => {
	const { data, isLoading } = useGenerateLevel();

	if (isLoading || !data) {
		return null;
	}

	return (
		<LevelProvider level={data}>
			<ClientProvider>
				<div className="flex-1 relative">
					<Background />
					<Client />
					<Table />
					<ClientMessage />
				</div>
				<div className="absolute left-2 top-2">
					<MuteButton />
				</div>
				<div className="absolute right-2 top-2">
					<NextButton />
				</div>
				<QuestionnaireModal />
			</ClientProvider>
		</LevelProvider>
	);
};

export default GameField;
