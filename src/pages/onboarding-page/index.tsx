import bgImage from "@shared/assets/background.webp?url";
import Bear from "@shared/assets/bear.png";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import MuteButton from "@/shared/components/mute-button";

const texts = [
	"Добро пожаловать! Сейчас мы быстро покажем основы, и вы будете готовы помогать клиентам достигать их мечты.",
	"",
	"Нужен совет? Нажмите на телефон и я помогу выбрать правильный продукт.",
	"В конце рабочего дня клиенты оставят отзывы о вашей работе, что повлияет на призы. Играть можно один раз в день",
];

const OnboardingPage = () => {
	const [step, setStep] = useState(1);
	return (
		<div className="h-full flex flex-col relative">
			<img
				src={bgImage}
				alt=""
				className="w-full h-full object-cover absolute object-center"
			/>
			<img alt="" src={Bear} className="mt-auto z-[0]" />
			<motion.div
				exit={{ x: "100vw" }}
				initial={{ x: "100vw" }}
				animate={{ x: 0 }}
				className="absolute w-[19.375rem] right-[1rem] bottom-[calc(12rem+8rem)]"
			>
				<div className="bg-white translate-y-[100%] rounded-[1rem] border-2 border-black">
					<div className="text-black px-4 py-2">{texts[step - 1]}</div>
					<div className="absolute left-[2rem] top-[-1.25rem] rounded-full px-2 py-[0.0625rem] border-2 border-white bg-[#1919EF]">
						Директор по мечтам
					</div>
				</div>
			</motion.div>
			<div className="absolute bottom-[1rem] w-full flex justify-around gap-4 px-4">
				{step === 1 && (
					<Link
						to={"/game"}
						onClick={() => localStorage.setItem("completed_onboarding", "true")}
						className="border border-white py-3 px-4 rounded-xl"
					>
						Пропустить
					</Link>
				)}
				{step < 4 && (
					<button
						type="button"
						className="bg-white text-[#060698] py-3 px-4 rounded-xl grow"
						onClick={() => setStep((prev) => prev + 1)}
					>
						Следующий шаг
					</button>
				)}
				{step === 4 && (
					<Link
						to={"/game"}
						onClick={() => localStorage.setItem("completed_onboarding", "true")}
						className="bg-white text-[#060698] py-3 px-4 rounded-xl grow text-center"
					>
						Завершить обучение
					</Link>
				)}
			</div>
			<div className="absolute left-2 top-2">
				<MuteButton />
			</div>
		</div>
	);
};

export default OnboardingPage;
