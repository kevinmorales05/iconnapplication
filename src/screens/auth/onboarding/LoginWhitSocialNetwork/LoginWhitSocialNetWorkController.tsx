import React, { useCallback } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';
import { WebViewNavigation } from 'react-native-webview';
import { AuthStackParams } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import { authServices, vtexUserServices } from 'services';
import {
  AuthCookie,
  setAccountAuthCookie,
  setAccountId,
  setAuthCookie,
  setAuthEmail,
  setBirthday,
  setGender,
  setId,
  setIsLogged,
  setLastName,
  setName,
  setTelephone,
  setUserId,
  useAppDispatch,
  AuthDataInterface
} from 'rtk';
import { useLoading } from 'context';
import LoginWhitSocialNetworkScreen from './LoginWhitSocialNetwork';

const LoginWhitSocialNetworkController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const route = useRoute<RouteProp<AuthStackParams, 'LoginWhitSocialNetwork'>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();

  const { authenticationToken, providerLogin } = route.params;

  const navChange = async (e: WebViewNavigation) => {
    if (e.title !== 'Acceso: Cuentas de Google') {
      if (Platform.OS === 'ios') {
        const cookiesIos = await CookieManager.getAll(true);
        const keys: string[] = Object.getOwnPropertyNames(cookiesIos);
        const indexAccountCookie = keys.findIndex(key => !!key.split('VtexIdclientAutCookie_')[1]);
        if (!!cookiesIos.VtexIdclientAutCookie_oneiconn) {
          loader.show();
          const authCookie: AuthCookie = {
            Name: cookiesIos.VtexIdclientAutCookie_oneiconn.name,
            Value: cookiesIos.VtexIdclientAutCookie_oneiconn.value
          };
          const accountCookie: AuthCookie = {
            Name: cookiesIos[keys[indexAccountCookie]].name,
            Value: cookiesIos[keys[indexAccountCookie]].value
          };
          dispatch(setAuthCookie(authCookie));
          dispatch(setAccountAuthCookie(accountCookie));
          const userData = await authServices.valideteUserSocial();
          getUser(userData.user);
          loader.hide();
          CookieManager.clearAll(true);
          dispatch(setIsLogged({ isLogged: true }));
        }
      } else {
        CookieManager.get(e.url).then(async res => {
          if (res.VtexIdclientAutCookie_oneiconn) {
            loader.show();
            const keys: string[] = Object.getOwnPropertyNames(res);
            const authCookie: AuthCookie = {
              Name: res[keys[1]].name,
              Value: res[keys[1]].value
            };
            const accountCookie: AuthCookie = {
              Name: res[keys[0]].name,
              Value: res[keys[0]].value
            };
            dispatch(setAuthCookie(authCookie));
            dispatch(setAccountAuthCookie(accountCookie));
            const userData = await authServices.valideteUserSocial();
            getUser(userData.user);
            loader.hide();
            CookieManager.clearAll(true);
            dispatch(setIsLogged({ isLogged: true }));
          }
        });
      }
    }
  };

  const getUser = useCallback(async (email: string) => {
    const { data } = await vtexUserServices.getUserByEmail(email);
    const dataVtex: AuthDataInterface = {
      telephone: data[0].homePhone,
      email: data[0].email,
      gender: data[0].gender,
      name: data[0].firstName,
      lastName: data[0].lastName,
      birthday: data[0].birthDate,
      photo: data[0].profilePicture,
      accountId: data[0].accountId,
      id: data[0].id,
      userId: data[0].userId
    };
    dispatch(setAuthEmail({ email: dataVtex.email }));
    dispatch(setTelephone({ telephone: dataVtex.telephone }));
    dispatch(setGender({ gender: dataVtex.gender }));
    dispatch(setName({ name: dataVtex.name }));
    dispatch(setLastName({ lastName: dataVtex.lastName }));
    dispatch(setUserId({ userId: dataVtex.userId }));
    dispatch(setId({ id: dataVtex.id }));
    dispatch(setBirthday({ birthday: dataVtex.birthday }));
    dispatch(setAccountId({ accountId: dataVtex.accountId }));
  }, []);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: moderateScale(0) }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <LoginWhitSocialNetworkScreen onChangePage={navChange} authenticationToken={authenticationToken} providerLogin={providerLogin} goBack={goBack} />
    </SafeArea>
  );
};

export default LoginWhitSocialNetworkController;
