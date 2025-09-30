import QuestionnaireBooklet from "@shared/assets/questionnaire_booklet.png";
import { AnimatePresence, motion } from "motion/react";

import { useClientContext } from "@/context/client-context";
import { RadioGroup } from "@/shared/ui/radio";

const AnswerCard = ({
  answer,
  link,
  selected,
}: {
  answer: string;
  link: string;
  selected: boolean;
}) => {
  // или не <a>...
  return (
    <div className="bg-white/20 rounded-2xl p-4 flex">
      <div>
        {answer}
        <a href={link} className=" ">
          {link}
        </a>
      </div>
      <input type="checkbox" />
    </div>
  );
};

const declineYears = (num: number) => {
  const lastDigit = num % 10;
  const lastTwo = num % 100;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return "лет";
  }

  if (lastDigit === 1) return "год";
  if (lastDigit >= 2 && lastDigit <= 4) return "года";
  return "лет";
};

const generateAge = (age: "YOUNG" | "OLD" | "MIDDLE") => {
  let value: number;

  switch (age) {
    case "YOUNG":
      value = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
      break;
    case "MIDDLE":
      value = Math.floor(Math.random() * (50 - 35 + 1)) + 35;
      break;
    case "OLD":
      value = Math.floor(Math.random() * (65 - 50 + 1)) + 50;
      break;
    default:
      value = 0;
  }

  return `${value} ${declineYears(value)}`;
};

const QuestionnaireModal = () => {
  const { client } = useClientContext();
  const { questionnaireIsOpen: open, setQuestionnaireIsOpen: setOpen } =
    useClientContext();

  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{ borderRadius: 16, y: 1000 }}
          animate={{
            y: 0,
            borderRadius: 0,
            backgroundColor: "#060698",
          }}
          exit={{ y: 1000 }}
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
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="relative z-10 mb-4 font-halvar font-semibold text-lg w-full bg-[linear-gradient(180deg,#060698_58.17%,rgba(6,6,152,0)_100%)]
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
            АНКЕТА
          </button>
          <div className="grid grid-cols-[1fr_1.85fr] gap-4">
            <img
              alt=""
              src={client.sprite}
              className="bg-[#6188E4] rounded-lg h-full object-cover mb-4"
            />
            <div>
              <h2 className="font-halvar font-semibold text-2xl leading-[150%]">
                {client.first_name + " " + client.last_name}
              </h2>
              <div className=" border border-white/20 rounded-2xl py-1 px-3 mt-4">
                <span className="font-gzbank font-light text-[#DFE1EE] text-xs">
                  Возраст
                </span>
                <p className="font-gzbank font-semibold">
                  {generateAge(client.age as "YOUNG" | "MIDDLE" | "OLD")}
                </p>
                <hr className="border-white/20 my-2" />
                <span className="font-gzbank font-light text-[#DFE1EE] text-xs">
                  Сфера работы
                </span>
                <p className="font-gzbank font-semibold">{client.job_sphere}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="font-gzbank font-light text-[#DFE1EE] text-xs">
                Cемейное положение
              </span>
              <p className="font-gzbank font-semibold mb-2">Холост</p>
              <span className="font-gzbank font-light text-[#DFE1EE] text-xs">
                Жилье
              </span>
              <p className="font-gzbank font-semibold">нет</p>
            </div>
            <div>
              <span className="font-gzbank font-light text-[#DFE1EE] text-xs">
                Дети
              </span>
              <p className="font-gzbank font-semibold mb-2">нет</p>

              <span className="font-gzbank font-light text-[#DFE1EE] text-xs">
                Место жительства
              </span>
              <p className="font-gzbank font-semibold">{client.city}</p>
            </div>
          </div>
          <h2 className="font-halvar font-semibold text-2xl leading-[150%] mt-5 mb-2">
            Что порекомендовать?
          </h2>
          <div className="flex flex-col">
            <RadioGroup
              name="answer"
              options={[
                { label: "продукт!", value: "123" },
                { label: "продукт2!", value: "123" },
                { label: "продукт3!", value: "123" },
                { label: "ответ1!", value: "123" },
              ]}
            ></RadioGroup>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionnaireModal;
