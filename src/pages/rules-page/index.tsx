import bgImage from "@shared/assets/background.webp?url";
import mockSpeech from "@shared/assets/mock-speech.webp";
import phoneIdle from "@shared/assets/phone-active.webp?url";
import questionnaireBooklet from "@shared/assets/questionnaire_booklet.webp";
import classNames from "classnames";
import { Link } from "react-router";
import MuteButton from "@/shared/components/mute-button";

const RulesPage = () => {
	return (
		<div className="h-full flex flex-col relative">
			<img
				src={bgImage}
				alt=""
				className="w-full h-full object-cover absolute object-center z-[0]"
			/>
			<div
				className="fixed top-0 pl-4 pt-4 pb-8 z-10 font-halvar font-semibold text-lg w-full bg-[linear-gradient(180deg,#060698_58.17%,rgba(6,6,152,0)_100%)]
 hover:text-gray-200 flex items-center gap-2 duration-75"
			>
				<Link to="/" className="flex items-center gap-2 duration-75">
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
					ПРАВИЛА ИГРЫ
				</Link>
				<div className="ml-auto mr-6">
					<MuteButton />
				</div>
			</div>
			<div className="mt-20 z-[1] rounded-2xl border border-white/20 bg-[#1F1FA2] h-full mx-4 mb-6 p-3">
				<div className="">
					<h4 className="font-semibold font-halvar flex items-center gap-2">
						<div className="rounded-full bg-[#3434B4] flex items-center justify-center w-6 h-6">
							1
						</div>
						Выслушайте клиента
					</h4>
					<p className="text-xs mt-1 pl-8">
						Каждый игровой день к вам будут приходить клиенты со своими
						историями и целями. Внимательно выслушайте их запрос — часто самое
						важное кроется в деталях.
					</p>
					<img src={mockSpeech} alt="" className="px-8" />
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
						На вашем столе лежит анкета клиента. В ней вы найдёте всю ключевую
						информацию.
					</p>
					<div className="rounded-2xl bg-[#050581] pt-2 mt-2">
						<img src={questionnaireBooklet} alt="" className="h-14 mx-auto" />
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
				<hr className="my-4 border border-white/20" />
				<div className="">
					<h4 className="font-semibold font-halvar flex items-center gap-2">
						<div className="rounded-full bg-[#3434B4] flex items-center justify-center w-6 h-6">
							4
						</div>
						Почитайте отзывы
					</h4>
					<p className="text-xs mt-1 px-8">
						В конце дня вы получите оценку и отзывы от клиентов: они помогут вам
						лучше разбираться в продуктах Газпромбанка. И помните, вы всегда
						можете попросить совета Директора по мечтам! Просто позвоните ему!
					</p>
					<img src={phoneIdle} alt="" className="w-40 mx-auto" />
				</div>
				<Link
					to="/"
					className="flex justify-center mt-4 px-4 py-3 rounded-2xl w-full bg-white text-[#060698]"
				>
					Понятно, спасибо
				</Link>
			</div>
		</div>
	);
};

export default RulesPage;
