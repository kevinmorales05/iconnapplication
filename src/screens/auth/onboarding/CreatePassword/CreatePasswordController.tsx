import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { SafeArea } from 'components/atoms/SafeArea';
import { useAlert, useLoading } from 'context';
import { AuthStackParams } from 'navigation/types';
import { RootState, setIsLogged, setUserId, useAppDispatch, useAppSelector } from 'rtk';
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

  const onSubmit = async (fields: FieldValues) => {
    const { password, code } = fields;

    loader.show();
    try {
      await authServices.createUser(user.email as string);
      const { userId, authStatus } = await authServices.createPassword(password, code, user.email as string, authenticationToken);

      if (variant === 'register') {
        if (authStatus === 'Success') {
          dispatch(setUserId({ user_id: userId }));
          dispatch(setIsLogged({ isLogged: true }));
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
        <CreatePasswordScreen hasNavigationTitle={false} goBack={goBack} onSubmit={onSubmit} email={email as string} />
      </FormProvider>
    </SafeArea>
  );
};

export default CreatePasswordController;
