import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import HomeController from 'screens/home/HomeController';
import AccountScreen from 'screens/home/myAccount/MyAccountScreen';
import EditEmailController from 'screens/auth/onboarding/EditEmail/EditEmailController';
import EnterOtpController from 'screens/auth/onboarding/EnterOtp/EnterOtpController';
import EditPasswordController from 'screens/auth/onboarding/EditPassword/EditPasswordController';
import ProfileController from 'screens/home/myAccount/profile/ProfileController';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';
import { useLoading } from 'context';
import { RootState, useAppSelector, useAppDispatch, AuthDataInterface, setAuthEmail } from 'rtk';
import { useToast } from 'context';
import { authServices } from 'services';
import AddRFCController from 'screens/home/myAccount/manageTaxInfo/AddRFC/AddRFCController';
import TaxInfoController from 'screens/home/myAccount/manageTaxInfo/TaxInfo/TaxInfoController';

const Stack = createNativeStackNavigator<HomeStackParams>();
import { useNavigation } from '@react-navigation/native';
import InvoiceController from 'screens/home/invoicing/Invoice/InvoiceController';
import CreateTaxProfileController from 'screens/home/invoicing/CreateTaxProfile/CreateTaxProfileController';

const WrappedController = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();
  const toast = useToast();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (email: string) => {
    loader.show();
    try {
      await authServices.putUser({
        user_id: user.user_id,
        email
      } as AuthDataInterface);
      dispatch(setAuthEmail({ email }));

      toast.show({
        message: 'Datos guardos exitosamente.',
        type: 'success'
      });

      navigate('Profile');
    } catch (error) {
      toast.show({
        message: 'No se pudo editar el correo.',
        type: 'error'
      });
    } finally {
      loader.hide();
    }
  };

  return <EnterOtpController handleSubmit={handleSubmit} />;
};

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeController} />
    <Stack.Screen name="Mi Cuenta" component={AccountScreen} />
    <Stack.Screen name="Profile" options={{ title: 'Mi Perfil' }} component={ProfileController} />
    <Stack.Screen name="EditEmail" options={{ title: 'Editar Correo' }} component={EditEmailController} />
    <Stack.Screen name="EnterOtp" options={{ title: 'Editar Correo' }} component={WrappedController} />
    <Stack.Screen name="Editar Contraseña" component={EditPasswordController} />
    <Stack.Screen name="InviteSignUp" component={InviteSignUpController} />
    <Stack.Screen options={{ title: 'Agregar nuevo RFC' }} name="AddRFC" component={AddRFCController} />
    <Stack.Screen options={{ title: 'Administrar información fiscal' }} name="TaxInfo" component={TaxInfoController} />
    <Stack.Screen options={{ title: 'Facturar' }} name="Invoice" component={InvoiceController} />
    <Stack.Screen options={{ title: 'Crear perfil fiscal' }} name="CreateTaxProfile" component={CreateTaxProfileController} />
  </Stack.Navigator>
);

export default HomeStack;
