export type AuthStackParams = {
  SignUp: undefined;
  Login: undefined;
  EnterPassword: undefined;
  ForgotPassword: undefined;
  ContinueWith: undefined;
  EnterEmail: undefined;
  EnterOtp: { authenticationToken: string; variant?: 'register' | 'recoverPassword' };
  TermsAndCond: undefined;
  CreatePassword: { authenticationToken: string; variant?: 'register' | 'recoverPassword' };
  EnterFullName: undefined;
  ChangedPassword: { authenticationToken: string; password: string };
  LoginWhitSocialNetwork: { authenticationToken: string; providerLogin: string}
};
