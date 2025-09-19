import { useWorkPlaces } from "@/entities/workPlace/api/useWorkPlace";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Step2Form = () => {
  const methods = useFormContext();
  const { data, loading } = useWorkPlaces();

  useEffect(() => {
	if (data && !methods.getValues("workPlace")) methods.setValue("workPlace", data?.[0]);
  }, [data, methods])

  if (loading || !data) return <div>Загрузка...</div>;
  return (
    <>
      <Controller
        name="workPlace"
        control={methods.control}
        rules={{ required: "Пожалуйста, выберите место работы" }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            label="Место работы"
            loading={loading}
            options={data?.map((item) => ({ value: item, label: item })) || []}
            error={fieldState.error?.message}
          />
        )}
      />
      <Input
        {...methods.register("address", {
          required: "Пожалуйста, введите адрес",
        })}
        label="Адрес проживания"
        type="text"
        error={methods.formState.errors.address?.message as string}
      />
    </>
  );
};

export default Step2Form;
