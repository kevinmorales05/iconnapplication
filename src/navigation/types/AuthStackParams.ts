export type AuthStackParams = {
  SignUp: undefined;
  Login: undefined;
  EnterPassword: undefined;
  ForgotPassword: undefined;
  ContinueWith: undefined;
  EnterEmail: undefined;
  EnterOtp: { authenticationToken: string };
  TermsAndCond: { accessKey: string; authenticationToken: string; newPassword: string };
  CreatePassword: { accessKey: string; authenticationToken: string };
  EnterFullName: undefined;
};
