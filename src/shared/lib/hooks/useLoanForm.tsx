import { useForm, type UseFormReturn } from "react-hook-form";
import type { Resolver } from "react-hook-form";


export type LoanWizardFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  gender: "Мужской" | "Женский";
  workPlace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
};

export const stepFields: (keyof LoanWizardFormValues)[][] = [
  ["firstName", "lastName", "phone", "gender"],
  ["workPlace", "address"],
  ["loanAmount", "loanTerm"],
];

export const requiredResolver: Resolver<LoanWizardFormValues> = async (
  values
) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.firstName) {
    errors.firstName = { type: "required", message: "Введите имя" };
  }
  if (!values.lastName) {
    errors.lastName = { type: "required", message: "Введите фамилию" };
  }
  if (!values.phone) {
    errors.phone = { type: "required", message: "Введите телефон" };
  }
  if (!values.gender) {
    errors.gender = { type: "required", message: "Выберите пол" };
  }
  if (!values.workPlace) {
    errors.workPlace = { type: "required", message: "Выберите место работы" };
  }
  if (!values.address) {
    errors.address = { type: "required", message: "Введите адрес" };
  }
  if (!values.loanAmount) {
    errors.loanAmount = { type: "required", message: "Введите сумму" };
  }
  if (!values.loanTerm) {
    errors.loanTerm = { type: "required", message: "Введите срок" };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

export const useLoanWizardForm = (): UseFormReturn<LoanWizardFormValues> => {
  return useForm<LoanWizardFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      gender: "Мужской",
      workPlace: "",
      address: "",
      loanAmount: 200,
      loanTerm: 10,
    },
	resolver: requiredResolver,
  });
};
