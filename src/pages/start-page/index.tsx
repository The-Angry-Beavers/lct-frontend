import Logo from "@shared/assets/logo.webp";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMusicPlayer } from "@/packages/music-player";
import bgImage from "@/shared/assets/background.webp?url";
import MuteButton from "@/shared/components/mute-button";
import { useTapAnimation } from "@/shared/lib/hooks/use-tap-animation";
import PageContainer from "@/shared/ui/page-container";

const StartPage = () => {
	const navigate = useNavigate();

	const [completedOnboarding] = useState(false);

	const animation = useTapAnimation();

	return (
		<PageContainer className="relative">
			<img
				src={bgImage}
				alt=""
				className="w-full h-full object-cover absolute object-center"
			/>
			<div className="flex-1 grid place-items-center relative">
				<div className="flex flex-col gap-4 items-center">
					<img alt="" src={Logo} />
					<Link to={"/rules"} className="mb-2">
						Правила игры
					</Link>
					<button
						onClick={() => {
							if (completedOnboarding) {
								navigate("/game");
							} else {
								navigate("/onboarding");
							}
						}}
						type="button"
						className="bg-white py-4 px-6 text-[#060698] text-xl rounded-2xl"
					>
						<svg
							width="16"
							height="18"
							viewBox="0 0 16 18"
							className="inline-block mr-2 mb-[2px] "
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
								fill="#060698"
							/>
						</svg>
						Начать игру
					</button>
				</div>
			</div>
			<div className="absolute left-2 top-2">
				<MuteButton />
			</div>
			<motion.div
				{...animation}
				onClick={() => {
					navigate("/prizes");
				}}
				className="absolute flex gap-1 right-2 top-2"
			>
				<p className="font-halvar pt-1">Призы</p> <Stars />
			</motion.div>
		</PageContainer>
	);
};

const Stars = () => {
	return (
		<svg
			width="34"
			height="42"
			viewBox="0 0 34 42"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_302_2708)">
				<path
					d="M16.5566 3.1335C16.6902 2.8918 17.055 2.96226 17.089 3.23632L18.0712 11.1556C18.0864 11.2781 18.1787 11.377 18.3 11.4004L26.1352 12.9135C26.4063 12.9658 26.452 13.3346 26.2019 13.4516L18.9738 16.8329C18.8619 16.8852 18.7964 17.0036 18.8116 17.1262L19.7938 25.0454C19.8278 25.3195 19.4912 25.4769 19.3026 25.2752L13.8532 19.4457C13.7689 19.3555 13.6361 19.3298 13.5242 19.3821L6.29605 22.7634C6.0459 22.8804 5.79216 22.609 5.92575 22.3673L9.78598 15.3832C9.84573 15.2751 9.82907 15.1408 9.74473 15.0506L4.29533 9.2211C4.10674 9.01936 4.28649 8.69416 4.55764 8.74652L12.3928 10.2596C12.5141 10.283 12.6366 10.2257 12.6963 10.1176L16.5566 3.1335Z"
					fill="#DD40DB"
				/>
				<path
					d="M15.903 2.66071C16.4318 1.86453 17.6772 2.10508 17.8715 3.04086L17.8877 3.13747L18.8229 10.6811L26.2875 12.1227C27.3243 12.3229 27.4989 13.7336 26.5425 14.181L19.6566 17.4016L20.5926 24.9464C20.7225 25.9942 19.4352 26.5962 18.7142 25.8249L13.5227 20.271L6.63749 23.4927C5.68107 23.9401 4.71053 22.9021 5.22128 21.9779L8.89829 15.324L3.70757 9.77125C2.98651 8.99989 3.67389 7.75564 4.71062 7.95585L12.1752 9.39738L15.8521 2.74436L15.903 2.66071Z"
					stroke="#18189F"
					stroke-width="1.60982"
				/>
			</g>
			<g filter="url(#filter1_d_302_2708)">
				<path
					d="M23.7948 20.231C23.9023 20.0364 24.1961 20.0932 24.2235 20.3138L25.0143 26.6903C25.0265 26.7889 25.1009 26.8685 25.1986 26.8874L31.5073 28.1057C31.7256 28.1479 31.7624 28.4448 31.561 28.539L25.741 31.2615C25.651 31.3037 25.5983 31.399 25.6105 31.4977L26.4013 37.8741C26.4287 38.0948 26.1577 38.2216 26.0059 38.0591L21.6181 33.3653C21.5502 33.2927 21.4432 33.272 21.3532 33.3142L15.5332 36.0367C15.3318 36.1309 15.1275 35.9124 15.235 35.7177L18.3432 30.0943C18.3913 30.0072 18.3779 29.8991 18.31 29.8265L13.9222 25.1327C13.7704 24.9702 13.9151 24.7084 14.1334 24.7505L20.4422 25.9689C20.5398 25.9877 20.6385 25.9416 20.6866 25.8545L23.7948 20.231Z"
					fill="#DD40DB"
				/>
				<path
					d="M23.3122 19.7888C23.744 19.2418 24.6386 19.4146 24.8358 20.083L24.8663 20.2341L25.6208 26.3086L31.6299 27.4691C32.4645 27.6303 32.6058 28.7657 31.836 29.1261L26.2906 31.7193L27.0448 37.7948C27.149 38.6382 26.1133 39.1223 25.5329 38.5014L21.3527 34.03L15.8082 36.6235C15.0382 36.9837 14.2571 36.1487 14.6681 35.4047L17.6285 30.0456L13.4492 25.5753C12.8686 24.9543 13.4217 23.9528 14.2565 24.114L20.2666 25.2746L23.2276 19.9176L23.3122 19.7888Z"
					stroke="#18189F"
					stroke-width="1.2962"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_302_2708"
					x="1.4612"
					y="1.375"
					width="26.5155"
					height="26.1766"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="-1.1403" dy="0.570152" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_302_2708"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_302_2708"
						result="shape"
					/>
				</filter>
				<filter
					id="filter1_d_302_2708"
					x="11.6403"
					y="18.8152"
					width="21.3498"
					height="21.0768"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="-0.918152" dy="0.459076" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_302_2708"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_302_2708"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default StartPage;
