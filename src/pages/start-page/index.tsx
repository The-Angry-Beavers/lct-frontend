import { Link, useNavigate } from "react-router";
import { useMusicPlayer } from "@/packages/music-player";
import bgImage from "@/shared/assets/background.webp?url";
import MuteButton from "@/shared/components/mute-button";
import PageContainer from "@/shared/ui/page-container";
import Logo from "@shared/assets/logo.png";
import { useEffect, useState } from "react";

const StartPage = () => {
  const navigate = useNavigate();

  const [completedOnboarding, setCompletedOnboarding] = useState(false);
  const { play } = useMusicPlayer();
console.log(completedOnboarding, localStorage.getItem("completed_onboarding"))
  useEffect(() => {
    const completed_onboarding = localStorage.getItem("completed_onboarding");
    if (completed_onboarding) {
      setCompletedOnboarding(true);
    }
  }, [localStorage]);
  return (
    <PageContainer className="relative">
      <img
        src={bgImage}
        alt=""
        className="w-full h-full object-cover absolute object-center"
      />
      <div className="flex-1 grid place-items-center relative">
        <div className="flex flex-col gap-4 items-center">
          <img src={Logo} />
          <Link to={"/rules"} className="mb-2">
            Правила игры
          </Link>
          <button
            onClick={() => {
              setTimeout(() => {
                play("background");
              }, 300);
              if (completedOnboarding) {
                navigate("/game");
              } else {
                navigate("/onboarding");
              }
            }}
            type="button"
            className="bg-white py-4 px-6 text-[#060698] text-xl rounded-2xl"
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              className="inline-block mr-2 mb-[2px] "
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
                fill="#060698"
              />
            </svg>
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
