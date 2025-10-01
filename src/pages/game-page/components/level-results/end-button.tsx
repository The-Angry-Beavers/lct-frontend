import React from "react";
import { useNavigate } from "react-router";

const EndButton = () => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				navigate("/");
			}}
			type="button"
			className="w-full bg-white h-[2.8125rem] text-[#110698] rounded-[0.75rem] text-[0.875rem] font-semibold"
		>
			Завершить
		</button>
	);
};

export default EndButton;
