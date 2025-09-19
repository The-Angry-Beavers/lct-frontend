import { Step1Form, Step2Form, Step3Form } from "@/features/loan";
import LoanWizardPage from "@/pages/loan-wizard";
import { LoanWizardRoutes } from "@shared/config/routes";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: LoanWizardRoutes.ROOT,
    element: <LoanWizardPage />,
    children: [
	  { index: true, element: <Step1Form /> },
      { path: LoanWizardRoutes.STEP1, element: <Step1Form /> },
      { path: LoanWizardRoutes.STEP2, element: <Step2Form /> },
      { path: LoanWizardRoutes.STEP3, element: <Step3Form /> },
    ],
  },
]);

export default router;
