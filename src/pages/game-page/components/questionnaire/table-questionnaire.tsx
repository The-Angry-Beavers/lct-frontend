import QuestionnaireBooklet from "@shared/assets/questionnaire_booklet.png";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { useSituationContext } from "@/context/situation-context";

const TableQuestionnaire = () => {
	const { questionnaireIsOpen, setQuestionnaireIsOpen } = useSituationContext();

	const [isTapped, setIsTapped] = useState(false);
	const [pendingOpen, setPendingOpen] = useState(false);

	const handleTap = useCallback(() => {
		setIsTapped(true);
		setTimeout(() => setIsTapped(false), 100); // длительность тапа
		setPendingOpen(true);
	}, []);

	return (
		<div>
			<AnimatePresence mode="popLayout">
				{!questionnaireIsOpen && (
					<motion.div
						initial={{ y: 1000 }}
						animate={{
							y: 25,
							scale: isTapped ? 0.95 : 1,
							opacity: isTapped ? 0.8 : 1,
						}}
						exit={{ y: 1000 }}
						transition={{
							y: { type: "spring", stiffness: 100, damping: 25 },
							scale: { type: "spring", stiffness: 500, damping: 30 },
							opacity: { duration: 0.15 },
						}}
						onTap={handleTap}
						onAnimationComplete={() => {
							if (pendingOpen && !isTapped) {
								setQuestionnaireIsOpen(true);
								setPendingOpen(false);
							}
						}}
						className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[180px] cursor-pointer flex items-center justify-center"
					>
						<motion.img
							src={QuestionnaireBooklet}
							alt="questionnaire booklet"
							className="w-full h-full object-contain"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TableQuestionnaire;
