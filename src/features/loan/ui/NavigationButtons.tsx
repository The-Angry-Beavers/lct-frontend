import { stepFields } from "@/shared/lib/hooks/useLoanForm";
import { Button } from "@/shared/ui/button";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

type Props = {
  currentStep: number;
  steps: string[];
};

const NavigationButtons: FC<Props> = ({ currentStep, steps }) => {
  const navigate = useNavigate();
  const methods = useFormContext();
  const nextStep = () => {
    methods.trigger(stepFields[currentStep]).then((isValid: boolean) => {
      if (isValid) navigate(steps[currentStep + 1]);
    });
  };

  const prevStep = () => {
    navigate(steps[currentStep - 1]);
  };

  return (
    <div className="flex justify-between mt-6">
      {currentStep !== 0 && (
        <Button onClick={prevStep} type="button">
          Назад
        </Button>
      )}
      {currentStep !== steps.length - 1 && (
        <Button onClick={nextStep} type="button">
          Далее
        </Button>
      )}
      {currentStep === steps.length - 1 && (
        <Button type="submit">
          Подать заявку
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
