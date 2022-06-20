import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import SignUpController from 'screens/auth/SignUp/SignUpController';
import LoginController from 'screens/auth/Login/LoginController';
import ContinueWithController from 'screens/auth/onboarding/ContinueWith/ContinueWithController';
import EnterEmailController from 'screens/auth/onboarding/EnterEmail/EnterEmailController'
import EnterOtpController from 'screens/auth/onboarding/EnterOtp/EnterOtpController'
import TermsAndCondController from 'screens/auth/onboarding/TermsAndCond/TermsAndCondController';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TermsAndCond">
    <Stack.Screen name="SignUp" component={SignUpController} />
    <Stack.Screen name="Login" component={LoginController} />
    <Stack.Screen name="ContinueWith" component={ContinueWithController} />
    <Stack.Screen name="EnterEmail" component={EnterEmailController} />
    <Stack.Screen name="EnterOtp" component={EnterOtpController} />
    <Stack.Screen name="TermsAndCond" component={TermsAndCondController} />
  </Stack.Navigator>
);

export default AuthStack;
