import React  from 'react';
import { Container, SafeArea, Touchable } from 'components';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';
import WebView, { WebViewNavigation } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';

interface Props {
  onChangePage: (e: WebViewNavigation) => void;
  providerLogin: string;
  authenticationToken: string;
  goBack: () => void;
}

const LoginWhitSocialNetworkScreen: React.FC<Props> = ({providerLogin, authenticationToken, goBack, onChangePage}) => {

  const userAgent = {
    ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Mobile/15E148 Safari/604.1",
    android: "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"
  }

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: moderateScale(0), paddingTop: theme.paddingHeader }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <Touchable
        onPress={()=>{
          goBack();
        }}
      >
        <Container style={{paddingLeft: moderateScale(16), paddingBottom: moderateScale(10)}}>
          <Feather name="arrow-left" size={theme.iconSize.medium} color={theme.brandColor.iconn_accent_secondary} />
        </Container>
      </Touchable>
      <WebView
        style={{flex:1}}
        source={{
          uri: `https://oneiconn.vtexcommercestable.com.br/api/vtexid/pub/authentication/oauth/redirect?providerName=${providerLogin}`,
          headers: {
            Cookie: `_vss=${authenticationToken};Path=/;Domain=oneiconn.vtexcommercestable.com.br;Secure;HttpOnly;`,
            userAgent: userAgent[Platform.OS]
          }
        }}
        onNavigationStateChange={(e)=>{onChangePage(e)}}
        javaScriptEnabled={true}
        userAgent={userAgent[Platform.OS]}
      />
    </SafeArea>
  );
};

export default LoginWhitSocialNetworkScreen;


