import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import HomeController from 'screens/home/HomeController';
import AccountScreen from 'screens/home/myAccount/MyAccountScreen';
import EditEmailController from 'screens/auth/onboarding/EditEmail/EditEmailController';
import EditEmailOtpController from 'screens/auth/onboarding/EditEmailOtp/EditEmailOtpController';
import EditPasswordController from 'screens/auth/onboarding/EditPassword/EditPasswordController';
import ProfileController from 'screens/home/myAccount/profile/ProfileController';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';
import AddRFCController from 'screens/home/myAccount/manageTaxInfo/AddRFC/AddRFCController';
import TaxInfoController from 'screens/home/myAccount/manageTaxInfo/TaxInfo/TaxInfoController';

const Stack = createNativeStackNavigator<HomeStackParams>();
import InvoiceController from 'screens/home/invoicing/Invoice/InvoiceController';
import CreateTaxProfileController from 'screens/home/invoicing/CreateTaxProfile/CreateTaxProfileController';

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeController} />
    <Stack.Screen name="Mi Cuenta" component={AccountScreen} />
    <Stack.Screen name="Profile" options={{ title: 'Mi Perfil' }} component={ProfileController} />
    <Stack.Screen name="EditEmail" options={{ title: 'Editar Correo' }} component={EditEmailController} />
    <Stack.Screen name="EnterOtp" options={{ title: 'Editar Correo' }} component={EditEmailOtpController} />
    <Stack.Screen name="Editar Contraseña" component={EditPasswordController} />
    <Stack.Screen name="InviteSignUp" component={InviteSignUpController} />
    <Stack.Screen options={{ title: 'Nuevo Perfil Fiscal' }} name="AddRFC" component={AddRFCController} />
    <Stack.Screen options={{ title: 'Datos Fiscales' }} name="TaxInfo" component={TaxInfoController} />
    <Stack.Screen options={{ title: 'Facturar' }} name="Invoice" component={InvoiceController} />
    <Stack.Screen options={{ title: 'Perfil Fiscal' }} name="CreateTaxProfile" component={CreateTaxProfileController} />
  </Stack.Navigator>
);

export default HomeStack;
