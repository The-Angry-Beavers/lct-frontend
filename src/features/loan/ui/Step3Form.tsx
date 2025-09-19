import { useFormContext, Controller } from "react-hook-form";
import { RangeInput } from "@/shared/ui/range-input";

const Step3Form = () => {
  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <Controller
        name="loanAmount"
        control={methods.control}
        rules={{ required: "Пожалуйста, выберите сумму займа" }}
        defaultValue={200}
        render={({ field, fieldState }) => (
          <RangeInput
            {...field}
            label="Сумма займа"
            min={200}
			prefix="$"
            max={1000}
            step={100}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="loanTerm"
        control={methods.control}
        rules={{ required: "Пожалуйста, выберите срок займа" }}
        defaultValue={10}
        render={({ field, fieldState }) => (
          <RangeInput
            {...field}
            label="Срок займа"
            min={10}
            max={30}
            step={1}
			suffix="дней"
            error={fieldState.error?.message}
          />
        )}
      />
    </div>
  );
};

export default Step3Form;
