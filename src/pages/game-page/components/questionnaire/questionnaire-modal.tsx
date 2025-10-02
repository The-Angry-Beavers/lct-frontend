import { AnimatePresence, motion } from "motion/react";
import { label } from "motion/react-client";
import { useMemo, useState } from "react";
import { useLevelContext } from "@/context/level-context";
import { useSituationContext } from "@/context/situation-context";
import CheckboxGroup from "@/shared/ui/checkbox";

const declineYears = (num: number) => {
	const lastDigit = num % 10;
	const lastTwo = num % 100;

	if (lastTwo >= 11 && lastTwo <= 14) {
		return "лет";
	}

	if (lastDigit === 1) return "год";
	if (lastDigit >= 2 && lastDigit <= 4) return "года";
	return "лет";
};

const generateAge = (
	age: "YOUNG" | "OLD" | "MIDDLE",
	gender: "male" | "female",
) => {
	let value: number;

	switch (age) {
		case "YOUNG":
			value = Math.floor(Math.random() * (35 - 18 + 1)) + 18;
			break;
		case "MIDDLE":
			value = Math.floor(Math.random() * (64 - 36 + 1)) + 36;
			break;
		case "OLD":
			if (gender === "male")
				value = Math.floor(Math.random() * (80 - 65 + 1)) + 65;
			else value = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
			break;
		default:
			value = 0;
	}

	return `${value} ${declineYears(value)}`;
};

const Questions = () => {
	const { currentAnswers, setCurrentAnswers, situation, onSubmit } =
		useSituationContext();

	const options = situation.answers.map((e) => ({
		value: String(e.product.id),
		label: e.product.name,
		link: e.product.link,
	}));

	return (
		<>
			<div className="flex flex-col mb-10">
				<CheckboxGroup
					label=""
					name="searchEngines"
					options={options}
					values={currentAnswers}
					onChange={(value) => {
						console.log(value);
						setCurrentAnswers(value);
					}}
				/>
			</div>
			<div className="fixed bottom-4 left-0 w-full px-4">
				<button
					disabled={currentAnswers.length === 0}
					onClick={() => {
						onSubmit();
					}}
					type="button"
					className="bg-white w-full text-[#060698] rounded-2xl px-4 py-3"
				>
					{situation.index === 9 ? "Завершить день" : "Порекомендовать"}
				</button>
			</div>
		</>
	);
};

const QuestionnaireModal = () => {
	const { level, currentSituationIndex } = useLevelContext();
	const { client } = useSituationContext();
	const { questionnaireIsOpen: open, setQuestionnaireIsOpen: setOpen } =
		useSituationContext();

	const age = useMemo(() => {
		return generateAge(client.age as "YOUNG" | "MIDDLE" | "OLD", client.gender);
	}, [currentSituationIndex]);

	return (
		<AnimatePresence mode="popLayout">
			{open && (
				<motion.div
					initial={{ borderRadius: 16, y: 1000 }}
					animate={{
						y: 0,
						borderRadius: 0,
						backgroundColor: "#060698",
					}}
					exit={{ y: 1000 }}
					transition={{
						borderRadius: { duration: 0.4 },
						backgroundColor: {
							delay: 0.025,
							duration: 0.5,
							ease: "easeInOut",
						},
					}}
					className="absolute overflow-scroll bottom-0 left-0 w-full h-full shadow-2xl p-6 text-white"
				>
					<button
						type="button"
						onClick={() => setOpen(false)}
						className="fixed top-0 pt-4 pb-8 z-10 font-halvar font-medium text-lg w-full bg-[linear-gradient(180deg,#060698_58.17%,rgba(6,6,152,0)_100%)]
 hover:text-gray-200 flex items-center gap-2 duration-75"
					>
						<svg
							width="8"
							height="13"
							viewBox="0 0 8 13"
							fill="none"
							className="mb-[1px]"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 1.5L2 7L6.5 11.5"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
						АНКЕТА
					</button>
					<div className="grid grid-cols-[1fr_1.85fr] gap-4 mt-10">
						<img
							alt=""
							src={client.sprite}
							className="bg-[#6188E4] rounded-lg h-full w-min object-cover mb-4"
						/>
						<div>
							<h2 className="font-halvar font-medium text-2xl leading-[150%]">
								{client.first_name.toUpperCase() +
									" " +
									client.last_name.toUpperCase()}
							</h2>
							<div className="border border-white/20 rounded-2xl py-1 px-3 mt-4 bg-[linear-gradient(0deg,rgba(31,31,162,0.2),rgba(31,31,162,0.2)),linear-gradient(72.98deg,rgba(255,255,255,0)_73.09%,rgba(255,255,255,0.10782)_80.45%,rgba(255,255,255,0.3)_88.9%,rgba(255,255,255,0)_98.13%)]">
								<span className="font-gzbank font-light text-[#DFE1EE] text-xs">
									Возраст
								</span>
								<p className="font-gzbank font-medium">{age}</p>
								<hr className="border-white/20 my-2" />
								<span className="font-gzbank font-light text-[#DFE1EE] text-xs">
									Сфера работы
								</span>
								<p className="font-gzbank font-medium">{client.job_sphere}</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 mt-4 border border-white/20 rounded-2xl py-1 px-3 bg-gradient-to-b from-[rgba(31,31,162,0.2)] to-[rgba(255,255,255,0.2)]">
						<div className="border-r border-white/20">
							<span className="font-gzbank font-light text-[#DFE1EE] text-xs">
								Cемейное положение
							</span>
							<p className="font-gzbank font-medium mb-2">
								{client.is_married
									? client.gender === "male"
										? "Женат"
										: "Замужем"
									: client.gender === "male"
										? "Холост"
										: "Не замужем"}
							</p>
							<span className="font-gzbank font-light text-[#DFE1EE] text-xs">
								Жилье
							</span>
							<p className="font-gzbank font-medium">
								{client.is_have_real_estate ? "есть" : "нет"}
							</p>
						</div>
						<div>
							<span className="font-gzbank font-light text-[#DFE1EE] text-xs">
								Дети
							</span>
							<p className="font-gzbank font-medium mb-2">
								{client.is_have_child ? "есть" : "нет"}
							</p>

							<span className="font-gzbank font-light text-[#DFE1EE] text-xs">
								Место жительства
							</span>
							<p className="font-gzbank font-medium">{client.city}</p>
						</div>
					</div>
					<h2 className="font-halvar font-medium text-xl leading-[150%] mt-5 mb-2">
						ЧТО ПОРЕКОМЕНДОВАТЬ?
					</h2>
					<Questions key={level.level_info.seed + currentSituationIndex} />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default QuestionnaireModal;
