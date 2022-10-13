import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';
import { WebViewNavigation } from 'react-native-webview';
import { AuthStackParams } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import { authServices } from 'services';
import { AuthCookie, setAccountAuthCookie, setAuthCookie, setIsLogged, useAppDispatch } from 'rtk';
import { useLoading } from 'context';
import LoginWhitSocialNetworkScreen from './LoginWhitSocialNetwork';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';

const LoginWhitSocialNetworkController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const route = useRoute<RouteProp<AuthStackParams, 'LoginWhitSocialNetwork'>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { getUser } = useOnboarding();
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
