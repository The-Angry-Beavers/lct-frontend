import bgImage from "@shared/assets/background.webp?url";
import { Link, useNavigate } from "react-router";

const RulesPage = () => {
  return (
    <div className="h-full flex flex-col relative">
      <img
        src={bgImage}
        alt=""
        className="w-full h-full object-cover absolute object-center"
      />
      <Link
        to="/"
        className="fixed top-0 pl-4 pt-6 pb-8 z-10 font-halvar font-semibold text-lg w-full bg-[linear-gradient(180deg,#060698_58.17%,rgba(6,6,152,0)_100%)]
 hover:text-gray-200 flex items-center gap-2 duration-75"
      >
        <svg
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          className="mb-[1px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1.5L2 7L6.5 11.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        ПРАВИЛА ИГРЫ
      </Link>
	  <div>
		
	  </div>
    </div>
  );
};

export default RulesPage;
