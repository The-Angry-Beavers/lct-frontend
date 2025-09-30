import bgImage from "@shared/assets/background.webp?url";

const RulesPage = () => {
  return (
    <div className="h-full flex flex-col relative">
      <img
        src={bgImage}
        alt=""
        className="w-full h-full object-cover absolute object-center"
      />
    </div>
  );
};

export default RulesPage;
