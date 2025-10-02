import bgImage from "@shared/assets/background.webp?url";
import Bear from "@shared/assets/bear.png";
import mockSpeech from "@shared/assets/mock-speech.png";
import questionnaireBooklet from "@shared/assets/questionnaire_booklet.png";
import classNames from "classnames";
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
		<div className="h-full flex flex-col relative overflow-hidden">
			<img
				src={bgImage}
				alt=""
				className="w-full h-full object-cover absolute object-center"
			/>
			{step === 2 && (
				<div className="h-full mt-16 flex flex-col absolute z-[4]">
					<div className="z-[1] rounded-2xl border border-white/20 bg-[#1F1FA2] mx-4 p-3">
						<div className="">
							<h4 className="font-semibold font-halvar flex items-center gap-2">
								<div className="rounded-full bg-[#3434B4] flex items-center justify-center w-6 h-6">
									1
								</div>
								Выслушайте клиента
							</h4>
							<p className="text-xs mt-1 pl-8">
								Каждый игровой день к вам будут приходить клиенты со своими
								историями и целями. Внимательно выслушайте их запрос — часто
								самое важное кроется в деталях.
							</p>
							<img alt="" src={mockSpeech} className="px-8" />
						</div>
						<hr className="my-4 border border-white/20" />
						<div className="">
							<h4 className="font-semibold font-halvar flex items-center gap-2">
								<div className="rounded-full bg-[#3434B4] flex items-center justify-center w-6 h-6">
									2
								</div>
								Изучите анкету
							</h4>
							<p className="text-xs mt-1 px-8">
								На вашем столе лежит анкета клиента. В ней вы найдёте всю
								ключевую информацию.
							</p>
							<div className="rounded-2xl bg-[#050581] pt-2 mt-2">
								<img
									alt=""
									src={questionnaireBooklet}
									className="h-14 mx-auto"
								/>
							</div>
						</div>
						<hr className="my-4 border border-white/20" />
						<div className="">
							<h4 className="font-semibold font-halvar flex items-center gap-2">
								<div className="rounded-full bg-[#3434B4] flex items-center justify-center w-6 h-6">
									3
								</div>
								Порекомендуйте продукты
							</h4>
							<p className="text-xs mt-1 px-8">
								Внизу анкеты вы увидите список из 4-х продуктов Газпромбанка.
								Выберите наиболее подходящие из них для ситуации клиента.
							</p>
							<div className="bg-white/20 rounded-2xl p-4 flex pointer items-center justify-between mt-2">
								<p className="text-xs">Аудит портфеля</p>
								<input
									type="checkbox"
									checked
									className={classNames(
										"form-checkbox bg-transparent w-4 h-4 accent-white",
									)}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			{step !== 2 && <img alt="" src={Bear} className="mt-auto z-[0]" />}
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
						className="bg-white text-[#060698] py-3 px-4 z-[5] rounded-xl grow"
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
