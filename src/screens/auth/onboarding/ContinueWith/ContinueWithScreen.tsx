import React from 'react';
import { Image, ScrollView } from 'react-native';
import { ICONN_BINOMIO_LOGOS_LIGHT } from 'assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableText, Button, Container } from 'components';
import theme from 'components/theme/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AuthProviderInterface } from 'rtk';

interface Props {
  onPressSocialButton: (type: string) => void;
  onPressEmail: () => void;
  onPressContinueAsGuest: () => void;
  providers: AuthProviderInterface[];
}

const ContinueWithScreen: React.FC<Props> = ({ onPressSocialButton, onPressEmail, onPressContinueAsGuest, providers }) => {
  const insets = useSafeAreaInsets();

  const renderButtons = () => {
    if (providers.length) {
      return providers.map(provider => {
        if (provider.providerName === 'Google') {
          return (
            <Button
              key="googleBtn"
              color="google"
              round
              onPress={() => {
                onPressSocialButton(provider.providerName);
              }}
              fontSize="h4"
              fontBold
              style={{ marginTop: 8 }}
              icon={<FontAwesome5 name="google" size={24} color="white" />}
            >
              Ingresa con Google
            </Button>
          );
        } else if (provider.providerName === 'Facebook') {
          return (
            <Button
              key="facebookBtn"
              color="facebook"
              round
              onPress={() => {
                onPressSocialButton(provider.providerName);
              }}
              fontSize="h4"
              fontBold
              style={{ marginTop: 8 }}
              icon={<FontAwesome5 name="facebook" size={24} color="white" />}
            >
              Ingresa con Facebook
            </Button>
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex>
        <Image source={ICONN_BINOMIO_LOGOS_LIGHT} style={{ width: 300, height: 50, alignSelf: 'center' }} resizeMode="center" />
      </Container>

      <Container flex alignment="end">
        {renderButtons()}
        <Button round onPress={onPressEmail} fontSize="h4" fontBold style={{ marginTop: 8 }} icon={<Fontisto name="email" size={24} color="white" />}>
          Ingresa con tu correo
        </Button>
        <Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}>
          <TouchableText
            underline
            textColor={theme.brandColor.iconn_white}
            text="Ingresa como invitado"
            typography="h4"
            fontBold
            onPress={onPressContinueAsGuest}
            marginTop={8}
          />
        </Container>
      </Container>
    </ScrollView>
  );
};

export default ContinueWithScreen;
