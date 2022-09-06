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
import InvoiceController from 'screens/home/invoicing/Invoice/InvoiceController';
import CreateTaxProfileController from 'screens/home/invoicing/CreateTaxProfile/CreateTaxProfileController';
import AddTicketPetroController from 'screens/home/invoicing/invoicingPetro/AddTicketPetro/AddTicketPetroController';
import AddTicketSevenController from 'screens/home/invoicing/invoicingSeven/AddTicketSeven/AddTicketSevenController';
import InvoiceTicketPetroController from 'screens/home/invoicing/invoicingPetro/InvoiceTicketPetro/InvoiceTicketPetroController';
import InvoiceTicketSevenController from 'screens/home/invoicing/invoicingSeven/InvoiceTicketSeven/InvoiceTicketSevenController';
import InvoiceGeneratedPetroController from 'screens/home/invoicing/invoicingPetro/InvoiceGeneratedPetro/InvoiceGeneratedPetroController';
import InvoiceGeneratedSevenController from 'screens/home/invoicing/invoicingSeven/InvoiceGeneratedSeven/InvoiceGeneratedSevenController';
import InvoiceHistoryController from 'screens/home/invoicing/InvoiceHistory/InvoiceHistoryController';
import ViewInvoiceGeneratedPetroController from 'screens/home/invoicing/invoicingPetro/ViewInvoiceGeneratedPetro/ViewInvoiceGeneratedPetroController';
import ViewInvoiceGeneratedSevenController from 'screens/home/invoicing/invoicingSeven/ViewInvoiceGeneratedSeven/ViewInvoiceGeneratedSevenController';
import CodeReaderController from 'screens/home/invoicing/invoicingSeven/CodeReader/CodeReaderController';
import AddressesController from 'screens/home/myAccount/addresses/AddressesController';
import ShopCartController from 'screens/home/shoppingCart/ShopCartController';

import EcommerceStack from './EcommerceStack';

const Stack = createNativeStackNavigator<HomeStackParams>();

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
    <Stack.Screen
      options={{
        title: 'Historial de facturas'
      }}
      name="InvoiceHistory"
      component={InvoiceHistoryController}
    />
    <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="AddTicketPetro" component={AddTicketPetroController} />
    <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="AddTicketSeven" component={AddTicketSevenController} />
    <Stack.Screen options={{ headerShown: false }} name="InvoiceTicketPetro" component={InvoiceTicketPetroController} />
    <Stack.Screen options={{ headerShown: false }} name="InvoiceTicketSeven" component={InvoiceTicketSevenController} />
    <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="InvoiceGeneratedPetro" component={InvoiceGeneratedPetroController} />
    <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="InvoiceGeneratedSeven" component={InvoiceGeneratedSevenController} />
    <Stack.Screen options={{ headerShown: false }} name="ViewInvoiceGeneratedPetro" component={ViewInvoiceGeneratedPetroController} />
    <Stack.Screen options={{ headerShown: false }} name="ViewInvoiceGeneratedSeven" component={ViewInvoiceGeneratedSevenController} />
    <Stack.Screen options={{ headerShown: false }} name="Ecommerce" component={EcommerceStack} />
    <Stack.Screen options={{ headerShown: false }} name="CodeReader" component={CodeReaderController} />
    <Stack.Screen
      options={{ headerShown: true, title: 'Direcciones', headerBackTitle: '', headerTintColor: 'black' }}
      name="Address"
      component={AddressesController}
    />
    <Stack.Screen options={{ headerShown: false }} name="ShopCart" component={ShopCartController} />
  </Stack.Navigator>
);

export default HomeStack;
