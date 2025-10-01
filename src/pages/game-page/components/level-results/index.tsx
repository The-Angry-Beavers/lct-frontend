import { AnimatePresence, motion } from "motion/react";
import { useLevelContext } from "@/context/level-context";
import Carousel from "@/shared/ui/carousel";
import PageContainer from "@/shared/ui/page-container";
import EndButton from "./end-button";
import { useLevelResults } from "./lib";
import Progress from "./progress";
import SituationCard from "./situation-card";

const LevelResultsContent = () => {
	const { result } = useLevelResults();

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="absolute left-0 right-0 top-0 bottom-0"
		>
			<PageContainer className="p-0 bg-[#110698] pt-6">
				<div className="mb-[1.25rem] px-4">
					<Progress />
				</div>
				<div className="font-halvar font-bold uppercase text-[1.125rem] text-center mb-3">
					Отзывы
				</div>
				<div className="flex-1 flex flex-col">
					<Carousel
						items={result.reviews}
						itemPercentOnScreen={{
							mobile: 85,
							md: 100,
							lg: 100,
							xl: 100,
						}}
						countOnScreen={{
							mobile: 1,
							md: 1,
							lg: 1,
							xl: 1,
						}}
					>
						<Carousel.Items>
							{() => (
								<>
									{result.reviews.map((e, index) => (
										<div
											key={index}
											className="relative flex-1 h-full first:ml-4 last:mr-4"
										>
											<div className="absolute left-0 top-0 right-0 bottom-0 overflow-scroll pb-16">
												<SituationCard situation={e} />
											</div>
										</div>
									))}
								</>
							)}
						</Carousel.Items>
					</Carousel>
				</div>
				<div className="px-4 absolute bottom-2 left-0 right-0">
					<EndButton />
				</div>
			</PageContainer>
		</motion.div>
	);
};

const LevelResults = () => {
	const { result } = useLevelContext();

	return <AnimatePresence>{result && <LevelResultsContent />}</AnimatePresence>;
};

export default LevelResults;
