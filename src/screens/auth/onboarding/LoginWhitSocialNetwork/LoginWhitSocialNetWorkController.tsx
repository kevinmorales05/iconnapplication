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
import { AuthCookie, setAccountAuthCookie, setAuthCookie, setAuthEmail, setIsLogged, useAppDispatch } from 'rtk';
import { useLoading } from 'context';
import LoginWhitSocialNetworkScreen from './LoginWhitSocialNetwork';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';

const LoginWhitSocialNetworkController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const route = useRoute<RouteProp<AuthStackParams, 'LoginWhitSocialNetwork'>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { getUserSocial } = useOnboarding();
  const { authenticationToken, providerLogin } = route.params;

  const navChange = async (e: WebViewNavigation) => {
    console.log({navChange: e.url});
    if (e.url.includes('&authCookieName=')) {
      const urlParams = e.url.split('https://oneiconn.myvtex.com/api/vtexid/oauth/finish?')[1]?.split('&');
      if (urlParams) {
        
        const authCookieName = urlParams.filter(param => findCookie('authCookieName', param))[0];
        const authCookieValue = urlParams.filter(param => findCookie('authCookieValue', param))[0];
        const accountCookieName = urlParams.filter(param => findCookie('accountAuthCookieName', param))[0];
        const accountCookieValue = urlParams.filter(param => findCookie('accountAuthCookieValue', param))[0];
        const authCookie: AuthCookie = {
          Name: authCookieName.split('=')[1],
          Value: authCookieValue.split('=')[1]
        };
        const accountCookie: AuthCookie = {
          Name: accountCookieName.split('=')[1],
          Value: accountCookieValue.split('=')[1]
        };
        dispatch(setAuthCookie(authCookie));
        dispatch(setAccountAuthCookie(accountCookie));
        const userData = await authServices.valideteUserSocial();
        getUserSocial(userData);
        dispatch(setAuthEmail({email: userData.user}));
        
        dispatch(setIsLogged({ isLogged: true }));
      }
    }
    if (e.title !== 'Acceso: Cuentas de Google') {
      // if (Platform.OS === 'ios') {
      //   const cookiesIos = await CookieManager.getAll(true);
      //   const keys: string[] = Object.getOwnPropertyNames(cookiesIos);
      //   const indexAccountCookie = keys.findIndex(key => !!key.split('VtexIdclientAutCookie_')[1]);
      //   if (!!cookiesIos.VtexIdclientAutCookie_oneiconn) {
      //     loader.show();
      //     const authCookie: AuthCookie = {
      //       Name: cookiesIos.VtexIdclientAutCookie_oneiconn.name,
      //       Value: cookiesIos.VtexIdclientAutCookie_oneiconn.value
      //     };
      //     const accountCookie: AuthCookie = {
      //       Name: cookiesIos[keys[indexAccountCookie]].name,
      //       Value: cookiesIos[keys[indexAccountCookie]].value
      //     };
      //     console.log({authCookie}, {accountCookie});
      //     dispatch(setAuthCookie(authCookie));
      //     dispatch(setAccountAuthCookie(accountCookie));
      //     const userData = await authServices.valideteUserSocial();
      //     getUserSocial(userData);
      //     dispatch(setAuthEmail({ email: userData.user }));
      //     loader.hide();
      //     CookieManager.clearAll(true);
      //     dispatch(setIsLogged({ isLogged: true }));
      //   }
      // } else {
        // CookieManager.get(e.url).then(async res => {
        //   if (res.VtexIdclientAutCookie_oneiconn) {
        //     loader.show();
        //     const keys: string[] = Object.getOwnPropertyNames(res);
        //     const authCookie: AuthCookie = {
        //       Name: res[keys[1]].name,
        //       Value: res[keys[1]].value
        //     };
        //     const accountCookie: AuthCookie = {
        //       Name: res[keys[0]].name,
        //       Value: res[keys[0]].value
        //     };
        //     dispatch(setAuthCookie(authCookie));
        //     dispatch(setAccountAuthCookie(accountCookie));
        //     const userData = await authServices.valideteUserSocial();
        //     getUserSocial(userData);
        //     dispatch(setAuthEmail({email: userData.user}));
        //     loader.hide();
        //     CookieManager.clearAll(true);
        //     dispatch(setIsLogged({ isLogged: true }));
        //   }
        // });
      
    }
  };

  const findCookie = (varName: string, param: string) => {
    console.log({spirit: param.split(varName+"=")})
    return param.split(varName+"=").length > 1;
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
