import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { SafeArea } from 'components/atoms/SafeArea';
import { useAlert, useLoading } from 'context';
import { AuthStackParams } from 'navigation/types';
import {
  AuthDataInterface,
  registerThunk,
  RootState,
  setAccountAuthCookie,
  setAuthCookie,
  setAuthInitialState,
  setIsLogged,
  setUserId,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { authServices } from 'services';
import CreatePasswordScreen from './CreatePasswordScreen';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

const CreatePasswordController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  const route = useRoute<RouteProp<AuthStackParams, 'CreatePassword'>>();

  const methods = useForm({
    mode: 'onChange'
  });

  const { setError } = methods;

  const { authenticationToken, variant } = route.params;

  const loader = useLoading();
  const alert = useAlert();

  const returnToSend = () => {
    dispatch(setAuthInitialState());
    goBack();
  };

  const onSubmit = async (fields: FieldValues) => {
    const { password, code } = fields;
    const user: AuthDataInterface = {
      email: email,
      firstName: '',
      lastName: '',
      homePhone: ''
    };

    loader.show();
    try {
      if (variant === 'register') {
        const { userId, authStatus, authCookie, accountAuthCookie } = await authServices.createPassword(
          password,
          code,
          user.email as string,
          authenticationToken
        );
        // TODO: very important!! check with Alex Almanza, why in some cases the fields are null! :/
        // Meanwhile it is better to validate them:
        if (userId !== null && authCookie !== null && accountAuthCookie !== null && authStatus === 'Success') {
          const response = await authServices.newUser(user);
          if (response) {
            // We save the vtex user in DB.
            const registerInDBResponse = await dispatch(
              registerThunk({
                user_id: userId,
                email: email
              })
            ).unwrap();

            if (registerInDBResponse && registerInDBResponse.responseCode === 200) {
              dispatch(setAuthCookie(authCookie));
              dispatch(setAccountAuthCookie(accountAuthCookie));
              dispatch(setUserId({ userId: userId }));
              dispatch(setIsLogged({ isLogged: true }));
            }
          }
        } else {
          alert.show(
            {
              title: 'Lo sentimos',
              message: 'No pudimos crear tu cuenta en este momento. Por favor, intenta más tarde.',
              acceptTitle: 'Entendido',
              async onAccept() {
                alert.hide();
              }
            },
            'error'
          );
        }
      }

      if (variant === 'recoverPassword') {
        navigate('ChangedPassword', { authenticationToken, password });
      }
    } catch (error) {
      console.log(error);
      const { response } = error as AxiosError;
      const data = response?.data as any;
      const { authStatus } = data;

      if (authStatus === 'WrongCredentials') {
        setError('code', { type: 'WrongCredentials', message: 'Código incorrecto' });
      }
      if (authStatus === 'BlockedUser') {
        setError('code', { type: 'BlockedUser', message: 'Usuario bloqueado' });
      }
    } finally {
      loader.hide();
    }

    return;
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <FormProvider {...methods}>
        <CreatePasswordScreen hasNavigationTitle={false} goBack={returnToSend} onSubmit={onSubmit} email={email as string} />
      </FormProvider>
    </SafeArea>
  );
};

export default CreatePasswordController;
