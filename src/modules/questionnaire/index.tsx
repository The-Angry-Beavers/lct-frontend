import { AnimatePresence, motion } from "motion/react";
import QuestionnaireBooklet from "@shared/assets/questionnaire_booklet.png";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Questionnaire: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 50 }}
            layoutId="surveyCard"
            whileHover={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => setOpen(true)}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[180px] cursor-pointer flex items-center justify-center"
          >
            <motion.img
              src={QuestionnaireBooklet}
              alt="questionnaire booklet"
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}

        {open && (
          <motion.div
            layoutId="surveyCard"
            initial={{ borderRadius: 16 }}
            animate={{
              borderRadius: 0,
              backgroundColor: "#060698",
            }}
            transition={{
              borderRadius: { duration: 0.4 },
              backgroundColor: {
                delay: 0.025,
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            className="absolute bottom-0 left-0 w-full h-full shadow-2xl p-6 text-white"
          >
            <motion.img
              src={QuestionnaireBooklet}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <button
              onClick={() => setOpen(false)}
              className="relative z-10 mb-4 font-halvar font-semibold text-lg hover:text-gray-200 flex items-center gap-2 duration-75"
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
              АНКЕТА
            </button>
              <div className="grid grid-cols-[1fr_1.85fr] gap-4">
                <img
                  src="https://placecats.com/300/200"
                  className="bg-[#6188E4] rounded-lg h-full object-cover mb-4"
                />
                <div>
					<h2 className="font-halvar font-semibold text-2xl leading-[150%]">ИМЯ<br/>ФАМИЛИЯ</h2>
					<div>
						<span className="font-gzbank font-light text-[#DFE1EE] text-xs">Возраст</span>
						<p className="font-gzbank font-semibold">19 лет</p>
						<hr className="my-2"/>
						<span className="font-gzbank font-light text-[#DFE1EE] text-xs">Сфера работы</span>
						<p className="font-gzbank font-semibold">Финансовые услуги</p>
					</div>
                </div>
              </div>
              <div>
                <label className="block text-sm">Возраст</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2 text-black"
                  placeholder="Введите возраст"
                />
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Questionnaire;
