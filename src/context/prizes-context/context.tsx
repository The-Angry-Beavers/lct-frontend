import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useEvents } from "@/packages/emitter";
import Dialog from "@/shared/ui/dialog";
import sadBeer from "./assets/sad-beer.webp?url";
import { availablePrizes, type Prize, PrizesContext, usePrizes } from "./lib";

const preloadImages = (urls: string[]) => {
	urls.forEach((url) => {
		console.log(url);
		const img = new Image();
		img.src = url;
	});
};

const CloseButton = () => {
	return (
		<svg
			width="36"
			height="36"
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="1" y="1" width="34" height="34" rx="17" fill="#6188E4" />
			<rect
				x="1"
				y="1"
				width="34"
				height="34"
				rx="17"
				stroke="#1F1FA2"
				stroke-width="2"
			/>
			<path
				d="M23.2886 11.151C23.7194 10.7201 24.4182 10.7202 24.8491 11.151C25.2801 11.5819 25.2801 12.2806 24.8491 12.7115L19.5601 17.9996L24.8491 23.2887C25.28 23.7196 25.2799 24.4183 24.8491 24.8492C24.4182 25.2802 23.7195 25.2801 23.2886 24.8492L17.9995 19.5602L12.7114 24.8492C12.2805 25.2801 11.5818 25.2802 11.1509 24.8492C10.7201 24.4183 10.72 23.7196 11.1509 23.2887L16.439 17.9996L11.1509 12.7115C10.7199 12.2806 10.7199 11.5819 11.1509 11.151C11.5818 10.7202 12.2806 10.7201 12.7114 11.151L17.9995 16.4391L23.2886 11.151Z"
				fill="#13139D"
			/>
		</svg>
	);
};

const PrizeModal = () => {
	const { addPrize, availablePrizes } = usePrizes();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [prize, setPrize] = useState<Prize | null>(null);
	const [isWinner, setIsWinner] = useState<boolean>(false);
	const emitter = useEvents();

	useEffect(() => {
		const u1 = emitter.on("onWon", () => {
			if (!availablePrizes?.length) return;
			const randomIndex = Math.floor(Math.random() * availablePrizes.length);
			const selectedPrize = availablePrizes[randomIndex];
			setPrize(selectedPrize);
			addPrize(selectedPrize);
			setIsWinner(true);
			setIsOpen(true);
		});

		const u2 = emitter.on("onLose", () => {
			setPrize(null);
			setIsWinner(false);
			setIsOpen(true);
		});

		return () => {
			u1();
			u2();
		};
	}, [availablePrizes, addPrize, emitter]);

	const onClose = () => {
		setIsOpen(false);
		setPrize(null);
		setIsWinner(false);
	};

	const navigate = useNavigate();

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onClose}
			overlay={<Dialog.Overlay />}
			content={
				<Dialog.Content
					classNames={{
						fixedOverlay: "p-4",
						contentWindow:
							"bg-[#1F1FA3] p-3 text-white min-w-[20rem] relative rounded-[0.75rem]",
					}}
				>
					<div className="mb-4 text-center">
						{isWinner === true && prize && (
							<>
								<h2 className="text-xl font-halvar font-bold mb-2">
									Поздравляем!
								</h2>
								<div>
									Вы выиграли: <b>{prize.name}</b>
								</div>
								<motion.img
									key={prize.id} // чтобы анимация срабатывала при новом призе
									alt=""
									src={prize.img}
									className="w-[12.5rem] my-6 mx-auto"
									initial={{ scale: 0, rotate: -20, opacity: 0 }}
									animate={{ scale: 1, rotate: 0, opacity: 1 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 15,
									}}
								/>
								<button
									onClick={() => {
										navigate("/prizes");
										onClose();
									}}
									type="button"
									className="bg-white w-full rounded-[0.75rem] px-4 py-3 text-[#060698]"
								>
									К призам
								</button>
							</>
						)}

						{isWinner === false && (
							<>
								<h2 className="text-xl font-bold mb-2">Увы!</h2>
								<p className="my-6">
									К сожалению, у вас слишком много недовольных клиентов.
									Попробуйте выиграть приз в&nbsp;следующий раз!
								</p>
								<motion.img
									alt=""
									src={sadBeer}
									className="w-[12.5rem] mt-6 mx-auto"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 15,
									}}
								/>
								<button
									onClick={onClose}
									type="button"
									className="bg-white w-full rounded-[0.75rem] px-4 py-3 text-[#060698]"
								>
									Попробую ещё раз завтра
								</button>
							</>
						)}
					</div>

					<button
						type="button"
						onClick={onClose}
						className="absolute -right-3 -top-3"
					>
						<CloseButton />
					</button>
				</Dialog.Content>
			}
		></Dialog>
	);
};

const PreloadImage = () => {
	const { prizes } = usePrizes();
	useEffect(() => {
		preloadImages(prizes.map((e) => e.img));
	}, []);

	return <></>;
};

export const PrizesProvider = ({ children }: { children: ReactNode }) => {
	const [prizes, setPrizes] = useState<Prize[]>([]);

	const addPrize = (prize: Prize) => {
		setPrizes((prev) => [...prev, prize]);
	};

	return (
		<PrizesContext.Provider value={{ prizes, addPrize, availablePrizes }}>
			<PreloadImage />
			{children}
			<PrizeModal />
		</PrizesContext.Provider>
	);
};
