import React from 'react';
import { Image, Platform, ScrollView } from 'react-native';
import { Container } from 'components/atoms/Container';
import { ICONN_BINOMIO_LOGOS_LIGHT } from 'assets/images';
import { Button } from 'components/molecules/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableText } from 'components/molecules/TouchableText';
import theme from 'components/theme/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { SocialNetworkType } from 'rtk';
import appleAuth from '@invertase/react-native-apple-authentication';

interface Props {
  onPressSocialButton: (type: SocialNetworkType) => void;  
  onPressEmail: () => void;
  onPressOthers: () => void; 
  onPressGoogle: () => void; 
  onPressFacebook: () =>void;
}

const ContinueWithScreen: React.FC<Props> = ({
  onPressSocialButton,
  onPressFacebook,
  onPressEmail,
  onPressOthers,
  onPressGoogle
}) => {
  const insets = useSafeAreaInsets();

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
        <Image
          source={ICONN_BINOMIO_LOGOS_LIGHT}
          style={{ width: 300, height: 50, alignSelf: 'center' }}
          resizeMode="center"
        />
      </Container>

      <Container flex alignment="end">
        
        {Platform.OS === 'ios' && appleAuth.isSupported &&
          <Button
            color="iconn_dark_grey"
            round
            onPress={() => onPressSocialButton('apple')}
            fontSize="h4"
            fontBold
            icon={<FontAwesome5 name="apple" size={24} color="white" />}
          >
            Continúa con Apple ID
          </Button>
        }
        <Button
          color="facebook"
          round
          onPress={onPressFacebook}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          icon={<FontAwesome5 name="facebook" size={24} color="white" />}
        >
          Continúa con Facebook
        </Button>
        <Button
          color="google"
          round
          onPress={onPressGoogle}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          icon={<FontAwesome5 name="google" size={24} color="white" />}
        >
          Continúa con Google
        </Button>
        <Button
          round
          onPress={onPressEmail}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          icon={<Fontisto name="email" size={24} color="white" />}
        >
          Continúa con tu correo
        </Button>
        <Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}>
          <TouchableText
            underline
            textColor={theme.brandColor.iconn_white}
            text="Otros métodos de acceso"
            typography="h4"
            fontBold
            onPress={onPressOthers}
            marginTop={8}
          />
        </Container>
      </Container>
    </ScrollView>
  );
};

export default ContinueWithScreen;
