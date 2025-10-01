import type { SVGProps } from "react";
import { buildImage } from "@/api";
import type { SituationResult } from "@/shared/types";
import { GoodStars } from "./assets/good-stars";
import Stars from "./assets/stars";

const BadAnswerIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={22}
		height={22}
		fill="none"
		{...props}
	>
		<circle
			cx={11}
			cy={11}
			r={10}
			fill="#F89292"
			stroke="#A23A3A"
			strokeWidth={2}
		/>
		<path
			fill="#A23A3A"
			d="M13.293 7.293a1 1 0 1 1 1.414 1.414L12.414 11l2.293 2.293a1 1 0 0 1-1.414 1.414L11 12.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L9.586 11 7.293 8.707a1 1 0 1 1 1.414-1.414L11 9.586l2.293-2.293Z"
		/>
	</svg>
);

const GoodAnswerIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="22"
		height="22"
		viewBox="0 0 22 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="11"
			cy="11"
			r="10"
			fill="#58FFFF"
			stroke="#4AA6A6"
			stroke-width="2"
		/>
		<path
			d="M7 11.5L9.5 14L15.5 8"
			stroke="#4AA6A6"
			stroke-width="2"
			stroke-linecap="round"
		/>
	</svg>
);

const InfoIcon = () => {
	return (
		<svg
			width="12"
			height="13"
			viewBox="0 0 12 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="0.428571"
				y="0.928571"
				width="11.1429"
				height="11.1429"
				rx="5.57143"
				stroke="white"
				stroke-width="0.857143"
			/>
			<circle cx="6" cy="3.875" r="0.75" fill="white" />
			<rect
				x="5.25"
				y="5.375"
				width="1.5"
				height="4.5"
				rx="0.75"
				fill="white"
			/>
		</svg>
	);
};

const ReviewItem = (props: { review: SituationResult["review"][number] }) => {
	const { answer_status, answered_product, review } = props.review;
	const Icon =
		answer_status === "full_correct" ? GoodAnswerIcon : BadAnswerIcon;

	let titlePrefix: string = "";
	if (answer_status === "correct_but_not_selected") {
		titlePrefix = "Забыли: ";
	}
	if (answer_status === "incorrect_but_selected") {
		titlePrefix = "Лишнее: ";
	}

	return (
		<div className="flex gap-2">
			<div>
				<Icon />
			</div>
			<div>
				<h4 className="font-semibold text-[0.875rem] tracking-tight leading-[150%]">
					{titlePrefix}«{answered_product.name}»
				</h4>
				<p className="text-[#ADADE5] text-[0.75rem] tracking-tight ">
					{review}
				</p>
				{answer_status !== "full_correct" ? (
					<div
						onClick={() => {
							window.open(answered_product.link, "_blank");
						}}
						className="flex items-center gap-1 text-[0.625rem] underline underline-offset-2 font-medium"
					>
						<InfoIcon />
						Подробнее про продукт
					</div>
				) : null}
			</div>
		</div>
	);
};

const messages = [
	"Спасибо, всё просто и понятно.",
	"Вы настоящий профессионал, сразу видно.",
	"Ухожу с чётким планом, спасибо!",
	"Спасибо, что вникли в мою ситуацию.",
	"Это именно то, что нужно!",
	"Вопрос решился неожиданно быстро, спасибо!",
	"Теперь спокойнее за финансовое будущее.",
	"Вы поняли меня с полуслова.",
	"Приятно, когда специалист на твоей стороне.",
	"Самый полезный визит в банк!",
];

const SituationCard = (props: { situation: SituationResult }) => {
	const { client, rating, review } = props.situation;
	const startsCount = Math.round(rating / 2);

	const randomMessage =
		rating >= 7 ? messages[Math.floor(Math.random() * messages.length)] : null;
	return (
		<div
			style={{
				background:
					"linear-gradient(180deg, rgba(31, 31, 162, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
			}}
			className="p-3 rounded-[0.75rem] flex flex-col "
		>
			<div className="flex justify-between items-center mb-3">
				<div className="flex gap-4">
					<div className="relative w-[2.875rem] min-w-[2.875rem] rounded-[0.25rem] bg-[#6188E4] overflow-hidden aspect-square">
						<img
							className=" absolute left-0 top-0 bottom-0 right-0 object-cover scale-[120%]"
							src={buildImage(client.sprite)}
							alt=""
						/>
					</div>
					<div>
						<p className="font-semibold text-[1rem]">{client.first_name}</p>
						<p className="font-semibold text-[1rem]">{client.last_name}</p>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<Stars count={startsCount} />
				</div>
			</div>
			{randomMessage && (
				<div className="bg-gradient-to-r rounded-[0.625rem] px-3 py-2 text-[0.75rem] from-[#973CC6] via-[#A558CF] to-[#973CC6] mb-2 relative">
					<div className="absolute -right-1 -top-4">
						<GoodStars />
					</div>
					{randomMessage}
				</div>
			)}
			<div>
				{review.map((e, index) => (
					<div
						key={index}
						className="pb-2 border-b border-white/70 pt-2 last:border-none last:pb-0"
					>
						<ReviewItem review={e} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SituationCard;
