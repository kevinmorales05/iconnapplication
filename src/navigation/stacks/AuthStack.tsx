import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import SignUpController from 'screens/auth/SignUp/SignUpController';
import LoginController from 'screens/auth/login/Login/LoginController';
import ContinueWithController from 'screens/auth/onboarding/ContinueWith/ContinueWithController';
import EnterEmailController from 'screens/auth/onboarding/EnterEmail/EnterEmailController'
import EnterOtpController from 'screens/auth/onboarding/EnterOtp/EnterOtpController'
import TermsAndCondController from 'screens/auth/onboarding/TermsAndCond/TermsAndCondController';
import CreatePasswordController from 'screens/auth/onboarding/CreatePassword/CreatePasswordController';
import EnterFullNameController from 'screens/auth/onboarding/EnterFullName/EnterFullNameController';
import EnterPasswordController from 'screens/auth/login/EnterPassword/EnterPasswordController';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ContinueWith">
    <Stack.Screen name="SignUp" component={SignUpController} />
    <Stack.Screen name="Login" component={LoginController} />
    <Stack.Screen name="EnterPassword" component={EnterPasswordController} />
    <Stack.Screen name="ContinueWith" component={ContinueWithController} />
    <Stack.Screen name="EnterEmail" component={EnterEmailController} />
    <Stack.Screen name="EnterOtp" component={EnterOtpController} />
    <Stack.Screen name="TermsAndCond" component={TermsAndCondController} />
    <Stack.Screen name="CreatePassword" component={CreatePasswordController} />
    <Stack.Screen name="EnterFullName" component={EnterFullNameController} />
  </Stack.Navigator>
);

export default AuthStack;
