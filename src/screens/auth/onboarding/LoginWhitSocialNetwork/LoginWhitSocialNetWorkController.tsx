import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';
import { WebViewNavigation } from 'react-native-webview';
import { AuthStackParams } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { authServices } from 'services';
import { AuthCookie, setAccountAuthCookie, setAuthCookie, setAuthEmail, setIsLogged, useAppDispatch } from 'rtk';
import LoginWhitSocialNetworkScreen from './LoginWhitSocialNetwork';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';
import config from 'react-native-config';

const LoginWhitSocialNetworkController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const route = useRoute<RouteProp<AuthStackParams, 'LoginWhitSocialNetwork'>>();
  const dispatch = useAppDispatch();
  const { getUserSocial } = useOnboarding();
  const { authenticationToken, providerLogin } = route.params;

  const { LOGIN_SOCIAL_NETWORK_URL } = config;

  const navChange = async (e: WebViewNavigation) => {
    if (e.url.includes('&authCookieName=')) {
      const urlParams = e.url.split(LOGIN_SOCIAL_NETWORK_URL)[1]?.split('&');
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
        dispatch(setAuthEmail({ email: userData.user }));
        dispatch(setIsLogged({ isLogged: true }));
      }
    }
  };

  const findCookie = (varName: string, param: string) => {
    return param.split(varName + '=').length > 1;
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
