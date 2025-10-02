import loader from "@shared/assets/loader.json";
import Lottie from "lottie-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { LevelProvider, useLevelContext } from "@/context/level-context";
import {
	SituationProvider,
	useSituationContext,
} from "@/context/situation-context";
import { useEvents } from "@/packages/emitter";
import { useMusicPlayer } from "@/packages/music-player";
import { useGenerateLevel } from "@/queries";
import BackgroundImg from "@/shared/assets/bg.png?url";
import DeskImg from "@/shared/assets/desk.png?url";
import MuteButton from "@/shared/components/mute-button";
import LevelResults from "../level-results";
import Phone from "../phone";
import QuestionnaireModal from "../questionnaire/questionnaire-modal";
import TableQuestionnaire from "../questionnaire/table-questionnaire";

const JumpingText = ({ text }: { text: string }) => {
	return (
		<div className="flex space-x-1">
			{text.split("").map((char, index) => (
				<motion.span
					key={index}
					animate={{ y: [0, -10, 0] }}
					transition={{
						repeat: Infinity,
						repeatType: "loop",
						duration: 2,
						delay: index * 0.5,
					}}
				>
					{char}
				</motion.span>
			))}
		</div>
	);
};

export const Typewriter = ({
	text,
	speed = 50,
}: {
	text: string;
	speed?: number;
}) => {
	const [index, setIndex] = useState(0);
	const [currentSpeed, setCurrentSpeed] = useState(speed);

	useEffect(() => {
    	setIndex(0);
	}, [text]);

	useEffect(() => {
		if (index >= text.length) return;

		const interval = setInterval(() => {
			setIndex((prev) => Math.min(prev + 1, text.length));
		}, currentSpeed);

		return () => {
			clearInterval(interval);
		};
	}, [index, text.length, currentSpeed]);

	return (
		<motion.span key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setCurrentSpeed(5)}>
			{text.slice(0, index)}
		</motion.span>
	);
};

const Table = () => {
	return (
		<div className="absolute bottom-0">
			<img alt="" src={DeskImg} />
			<div className="w-3/4 h-[120px] -left-[50px] -top-[100px] bg-[#1F1FA233] backdrop-blur-sm absolute rounded-3xl" />
			<div className="absolute left-4 bottom-16">
				<Phone />
			</div>
			<TableQuestionnaire />
		</div>
	);
};

const Background = () => {
	return (
		<div className="absolute left-0 top-0 right-0 bottom-0 bg-[#BED1FB]">
			<img
				className="top-0 absolute w-full h-[calc(100%-12rem)] bottom-0 right-0 left-0 object-cover object-left"
				src={BackgroundImg}
				alt=""
			/>
		</div>
	);
};

const ClientMessage = () => {
	const emitter = useEvents();
	const { client } = useSituationContext();
	const [hidden, setHidden] = useState<boolean>(true);
	const { play } = useMusicPlayer();

	useEffect(() => {
		const unsubscribe = emitter.on("onClientReady", (data) => {
			play("new_chat");
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
					//  onClick={() => {
					//    setHidden(true);
					//  }}
					exit={{ x: "100vw" }}
					initial={{ x: "100vw" }}
					animate={{ x: 0 }}
					className="absolute w-[19.375rem] right-[1rem] bottom-[calc(12rem+8rem)]"
				>
					<div className="bg-white translate-y-[100%] rounded-[1rem] border-2 border-black">
						<div className="text-black px-4 py-2">
							<Typewriter text={client.message} speed={35} />
						</div>
						<div className="absolute left-[2rem] top-[-1.25rem] rounded-full px-2 py-[0.0625rem] border-2 border-white bg-[#1919EF]">
							{client.first_name}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Client = () => {
	const { currentSituationIndex } = useLevelContext();
	const { client } = useSituationContext();
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

const LevelProgress = () => {
	const { currentSituationIndex, situations, goNextSituation } =
		useLevelContext();
	return (
		<div
			onClick={() => {
				goNextSituation();
			}}
			className="bg-[#1F1FA233] backdrop-blur-sm rounded-full px-4 h-[2rem] flex items-center whitespace-nowrap text-[0.875rem] tracking-tight"
		>
			{currentSituationIndex + 1}/{situations.length} клиентов
		</div>
	);
};

const GameField = () => {
	const { data, isLoading } = useGenerateLevel();

	if (isLoading || !data) {
		return (
			<div className="flex h-full items-center justify-center grow">
				<div className="w-60 flex justify-center flex-col items-center text-3xl font-halvar">
					<Lottie animationData={loader} loop={true} />
					<JumpingText text="Загрузка..." />
				</div>
			</div>
		);
	}

	return (
		<LevelProvider level={data}>
			<SituationProvider>
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
					<LevelProgress />
				</div>
				<QuestionnaireModal />
			</SituationProvider>
			<LevelResults />
		</LevelProvider>
	);
};

export default GameField;
