import { ClientProvider } from "@/context/client-context";

import BackgroundImg from "@/shared/assets/bg.png?url";
import DeskImg from "@/shared/assets/desk.png?url";
import MuteButton from "@/shared/components/mute-button";
import QuestionnaireModal from "../questionnaire/questionnaire-modal";
import TableQuestionnaire from "../questionnaire/table-questionnaire";

const Table = () => {
	return (
		<>
			<div className="absolute bottom-0">
				<img alt="" src={DeskImg} />
				<div className="w-3/4 h-[120px] -left-[50px] -top-[100px] bg-[#1F1FA233] backdrop-blur-sm absolute rounded-3xl" />
				<TableQuestionnaire />
			</div>
		</>
	);
};

const Background = () => {
	return (
		<div className="absolute left-0 bg-slate-50 top-0 right-0 bottom-0">
			<img
				className="top-0 absolute w-full h-[calc(100%-12rem)] bottom-0 right-0 left-0 object-cover object-left"
				src={BackgroundImg}
				alt=""
			/>
		</div>
	);
};

const GameField = () => {
	return (
		<ClientProvider>
			<div className="flex-1 relative">
				<Background />

				<Table />
			</div>
			<div className="absolute left-2 top-2">
				<MuteButton />
			</div>
			<QuestionnaireModal />
		</ClientProvider>
	);
};

export default GameField;
