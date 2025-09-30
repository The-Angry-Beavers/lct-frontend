import { useNavigate } from "react-router";
import { useMusicPlayer } from "@/packages/music-player";
import bgImage from "@/shared/assets/background.webp?url";
import MuteButton from "@/shared/components/mute-button";
import PageContainer from "@/shared/ui/page-container";

const StartPage = () => {
	const navigate = useNavigate();
	const { play } = useMusicPlayer();
	return (
		<PageContainer className="relative">
			<img
				src={bgImage}
				alt=""
				className="w-full h-full object-cover absolute object-center"
			/>
			<div className="flex-1 grid place-items-center relative">
				<div className="flex flex-col gap-4 items-center">
					<h1 className="font-halvar">Отдел по мечтам</h1>
					<button
						onClick={() => {
							setTimeout(() => {
								play("background");
							}, 300);
							navigate("/game");
						}}
						type="button"
					>
						Начать игру
					</button>
				</div>
			</div>
			<div className="absolute left-2 top-2">
				<MuteButton />
			</div>
		</PageContainer>
	);
};

export default StartPage;
