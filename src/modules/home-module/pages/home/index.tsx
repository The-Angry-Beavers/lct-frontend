import Questionnaire from "@/modules/questionnaire";
import PageContainer from "@/shared/ui/page-container";
import Desk from "@/shared/assets/desk.png";
import { useState } from "react";

const HomePage = () => {
  // for test
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);
  return (
    <PageContainer>
      <div className="absolute bottom-0">
        <div className="relative">
          <img src={`${Desk}`} />
          <div className="w-3/4 h-[120px] -left-[50px] -top-[100px] bg-[#1F1FA233] backdrop-blur-sm absolute rounded-3xl" />
        </div>
      </div>
      <Questionnaire open={openQuestionnaire} setOpen={setOpenQuestionnaire} />
    </PageContainer>
  );
};

export default HomePage;
