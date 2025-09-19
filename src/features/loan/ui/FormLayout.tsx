import { FormProvider } from "react-hook-form";
import { useState, type ReactNode } from "react";
import {
  useLoanWizardForm,
  type LoanWizardFormValues,
} from "@/shared/lib/hooks/useLoanForm";
import { Modal } from "@/shared/ui/modal";
import useFetch from "@/shared/lib/hooks/useFetch";

type Props = {
  children: ReactNode;
};

const LoanWizardFormLayout = ({ children }: Props) => {
  const methods = useLoanWizardForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>();
  const [finalValues, setFinalValues] =
    useState<Partial<LoanWizardFormValues>>();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { execute } = useFetch();

  const submit = async (values: LoanWizardFormValues) => {
    try {
      await execute("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${values.firstName} ${values.lastName}`,
        }),
      });

      setFinalValues(values);
      openModal();
    } catch (e) {
      console.error(e);
      setError("Произошла ошибка");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-full max-w-3xl"
        onSubmit={methods.handleSubmit(submit, () =>
          setError("Пропущены поля в предыдущих шагах")
        )}
        onChange={() => setError(null)}
      >
        {error && (
          <span className="text-red-500 my-4 block text-md">{error}</span>
        )}
        {children}
      </form>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>
          Поздравляем, {finalValues?.lastName} {finalValues?.firstName}. Вам
          одобрена сумма ${finalValues?.loanAmount} на {finalValues?.loanTerm}{" "}
          дней.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={closeModal}
        >
          Закрыть
        </button>
      </Modal>
    </FormProvider>
  );
};

export default LoanWizardFormLayout;
