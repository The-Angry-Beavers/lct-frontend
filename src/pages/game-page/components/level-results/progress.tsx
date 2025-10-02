import { motion } from "motion/react";

import Stars from "./assets/stars";
import { useLevelResults } from "./lib";

const Progress = () => {
	const { result } = useLevelResults();
	const totalHappyClients = result.reviews.filter((e) => e.rating >= 7).length;
	return (
		<div className="p-4 border border-white/70 rounded-[0.75rem] bg-[#1F1FA2]">
			<h3 className="font-halvar font-bold tracking-tight uppercase text-center mb-3">
				Рабочий день завершен
			</h3>
			<div>
				<div className="flex justify-between">
					<div className="flex gap-2">
						<Stars count={Math.round((result.total_rating / 100) * 5)} />
					</div>
					<div className="text-[0.75rem]">Довольны: {totalHappyClients}/10</div>
				</div>
				<div className="w-full h-4 bg-[#8181CA] relative rounded-[0.75rem] overflow-hidden">
					<div className="absolute bg-[#DFE1EE] h-full left-[70%] right-0 flex items-center justify-center text-[#6288E5] font-halvar">
						ПРИЗ
					</div>
					<motion.div
						transition={{ delay: 0.5 }}
						initial={{ width: 0 }}
						animate={{ width: result.total_rating + "%" }}
						className="absolute bg-[#DD40DB] h-full mix-blend-overlay"
					/>
				</div>
			</div>
		</div>
	);
};

export default Progress;
