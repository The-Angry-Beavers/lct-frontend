import { useNavigate } from "react-router";
import { useMusicPlayer } from "@/packages/music-player";
import MuteButton from "@/shared/components/mute-button";
import PageContainer from "@/shared/ui/page-container";

const StartPage = () => {
	const navigate = useNavigate();
	const { play } = useMusicPlayer();
	return (
		<PageContainer>
			<div className="flex-1 grid place-items-center">
				<div className="flex flex-col gap-4 items-center">
					<h1 className="font-halvar">НАЗВАНИЕ ИГРЫ</h1>
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
