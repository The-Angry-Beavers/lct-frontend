import { Input } from "@/shared/ui/input";
import RadioGroup from "@/shared/ui/radio/Radio";
import { Controller, useFormContext } from "react-hook-form";
import { IMaskMixin } from "react-imask";

const options = [
  { value: "Мужской", label: "Мужской" },
  { value: "Женский", label: "Женский" },
];

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input {...props} ref={inputRef as React.Ref<HTMLInputElement>} />
));

const Step1Form = () => {
  const methods = useFormContext();
  return (
    <>
      <Controller
        name="phone"
        control={methods.control}
        rules={{ required: "Пожалуйста, введите номер телефона" }}
        render={({ field, fieldState }) => (
          <MaskedInput
            {...field}
            mask="+0 000 000 0000"
			placeholder="+7 999 999 9999"
			error={fieldState.error?.message as string}
            onAccept={(val: string) => field.onChange(val)}
			label="Телефон"
          />
        )}
      />
      <Input
        {...methods.register("firstName", {
          required: "Пожалуйста, введите имя",
        })}
        error={methods.formState.errors.firstName?.message as string}
        label="Имя"
        type="text"
      />
      <Input
        {...methods.register("lastName", {
          required: "Пожалуйста, введите фамилию",
        })}
        error={methods.formState.errors.lastName?.message as string}
        label="Фамилия"
        type="text"
      />
      <RadioGroup
        {...methods.register("gender", { required: true })}
        error={methods.formState.errors.gender?.message as string}
        label="Пол"
        options={options}
      />
    </>
  );
};

export default Step1Form;
