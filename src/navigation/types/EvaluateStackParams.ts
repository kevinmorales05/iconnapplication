import { EvaluateServiceInterface } from 'components/types/StepsWallet';

export type EvaluateStackParams = {
  StepOne: { barcode: string };
  StepTwo: { dataParam: EvaluateServiceInterface };
  StepThree: { dataParam: EvaluateServiceInterface };
  StepFour: { dataParam: EvaluateServiceInterface };
};
