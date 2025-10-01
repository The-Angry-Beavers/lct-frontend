"use client";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils/cn";
import Star from "./star";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2, // задержка между звездами
		},
	},
};

const starVariants = {
	hidden: { opacity: 0, scale: 0.5, x: 10 },
	visible: {
		opacity: 1,
		scale: 1,
		x: 0,
	},
};

const Stars = ({ count = 0 }: { count?: number }) => {
	const starsCount = 5; // всегда 5 звезд

	return (
		<motion.div
			className="flex flex-row"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{Array.from({ length: starsCount }).map((_, i) => (
				<motion.div
					key={i}
					variants={starVariants}
					className={cn(i !== 0 ? "-ml-2" : "", "w-[1.25rem] h-[1.25rem]")}
				>
					{/* i + 1 <= count => розовая звезда, иначе голубая */}
					<Star variant={i + 1 <= count ? "purple" : "blue"} />
				</motion.div>
			))}
		</motion.div>
	);
};

export default Stars;
