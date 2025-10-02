"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePrizes } from "@/context/prizes-context/lib";
import PageContainer from "@/shared/ui/page-container";

// ---------- PrizeCard ----------
const PrizeCard = ({
	img,
	name,
	index,
}: {
	img: string;
	name: string;
	index: number;
}) => (
	<motion.div
		className="flex flex-col items-center p-4 rounded-2xl shadow hover:shadow-md transition"
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		style={{
			background:
				"linear-gradient(180deg, rgba(31, 31, 162, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
		}}
		transition={{ duration: 0.25, delay: index * 0.05 }}
	>
		<img src={img} alt={name} className="w-32 h-32 object-contain mb-3" />
		<p className="text-center font-medium">{name}</p>
	</motion.div>
);

// ---------- PrizesList ----------
const PrizesList = ({
	prizes,
	tabKey,
	emptyFallback,
}: {
	prizes: { img: string; name: string }[];
	tabKey: "available" | "received";
	emptyFallback?: React.ReactNode;
}) => {
	const hasPrizes = prizes.length > 0;

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={tabKey}
				className={`${
					hasPrizes
						? "grid grid-cols-2 gap-6"
						: "flex items-center justify-center py-12"
				}`}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				{hasPrizes
					? prizes.map((prize, idx) => (
							<PrizeCard
								key={idx}
								img={prize.img}
								name={prize.name}
								index={idx}
							/>
						))
					: emptyFallback || (
							<p className="text-center text-white/70">Нет элементов</p>
						)}
			</motion.div>
		</AnimatePresence>
	);
};

// ---------- TabsSwitcher ----------
const tabs = [
	{ id: "received", label: "Уже получено" },
	{ id: "available", label: "Можно получить" },
];

const TabsSwitcher = ({
	activeTab,
	onChange,
}: {
	activeTab: "available" | "received";
	onChange: (tab: "available" | "received") => void;
}) => (
	<div className="w-full px-4">
		<div className="relative flex w-full rounded-lg bg-white/30 p-1">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					type="button"
					onClick={() => onChange(tab.id as "available" | "received")}
					className="relative z-10 flex-1 px-4 py-2 rounded-lg font-medium text-white transition"
				>
					{tab.label}
				</button>
			))}
			<motion.div
				layout
				className="absolute top-1 bottom-1 left-1 rounded-md bg-[#FD81BE]"
				initial={false}
				animate={{
					x: activeTab === "received" ? 0 : "100%",
					width: "calc(50% - 0.25rem)",
				}}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			/>
		</div>
	</div>
);

// ---------- PrizesPage ----------
const PrizesPage = () => {
	const { availablePrizes, prizes } = usePrizes();
	const [activeTab, setActiveTab] = useState<"available" | "received">(
		"received",
	);

	const navigate = useNavigate();

	return (
		<PageContainer>
			{/* Шапка */}
			<div className="sticky top-0 left-0 w-full bg-[linear-gradient(180deg,#060698_58.17%,rgba(6,6,152,0)_100%)] pb-8 z-10 flex flex-col gap-2 pt-4">
				<button
					onClick={() => navigate("/")}
					type="button"
					className="font-halvar px-4 font-medium text-lg w-full 
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
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
					МЕНЮ
				</button>

				<TabsSwitcher activeTab={activeTab} onChange={setActiveTab} />
			</div>

			{/* Список призов */}
			<div className="px-4">
				<PrizesList
					emptyFallback={
						<p className="text-center text-white/70">
							Ещё нет заработанных призов
						</p>
					}
					prizes={activeTab === "available" ? availablePrizes : prizes}
					tabKey={activeTab}
				/>
			</div>
		</PageContainer>
	);
};

export default PrizesPage;
