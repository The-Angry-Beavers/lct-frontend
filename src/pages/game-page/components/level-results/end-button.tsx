import { useNavigate } from "react-router";
import { useEvents } from "@/packages/emitter";
import { useLevelResults } from "./lib";

const EndButton = () => {
	const navigate = useNavigate();
	const { result } = useLevelResults();
	const emitter = useEvents();

	const isWon = result.total_rating > 70;

	const onClick = () => {
		if (isWon) {
			emitter.emit("onWon", null);
		} else {
			emitter.emit("onLose", null);
		}
		navigate("/");
	};

	return (
		<button
			onClick={onClick}
			type="button"
			className="w-full bg-white h-[2.8125rem] text-[#110698] rounded-[0.75rem] text-[0.875rem] font-semibold"
		>
			{isWon ? "Получить приз" : "Завершить"}
		</button>
	);
};

export default EndButton;
