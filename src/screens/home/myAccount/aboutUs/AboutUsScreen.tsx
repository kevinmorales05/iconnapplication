import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationMenuItem, Container, TextContainer, Touchable } from 'components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import theme from 'components/theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import Config from 'react-native-config';

interface AboutUsScreenProps {
  onPressSevenFacebook: () => void;
  onPressSevenTwitter: () => void;
  onPressSevenPlay: () => void;
  onPressSevenInstagram: () => void;
  onPressPetroFacebook: () => void;
  onPressPetroTwitter: () => void;
  onPressPetroPlay: () => void;
  onPressPetroInstagram: () => void;
  openPage: (page: string) => void;
}

const AboutUsScreen: React.FC<AboutUsScreenProps> = ({
  onPressSevenFacebook,
  onPressSevenTwitter,
  onPressSevenPlay,
  onPressSevenInstagram,
  onPressPetroFacebook,
  onPressPetroTwitter,
  onPressPetroPlay,
  onPressPetroInstagram,
  openPage
}) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { ABOUTUS_PETRO_WEB, ABOUTUS_SEVEN_WEB } = Config;

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={{ marginHorizontal: 8 }}>
        <NavigationMenuItem
          text="Acerca de Nosotros"
          disable={false}
          onPressNavigateTo={() => {
            navigate('AboutOptions')
          }}
        />
        <NavigationMenuItem
          text="Legal"
          disable={false}
          onPressNavigateTo={() => {
            navigate('Legal');
          }}
        />
        <NavigationMenuItem
          text="7-Eleven.com.mx"
          disable={false}
          onPressNavigateTo={() => {
            openPage(ABOUTUS_SEVEN_WEB!);
          }}
        />

        <NavigationMenuItem
          text="Petro-7.com.mx"
          disable={false}
          onPressNavigateTo={() => {
            openPage(ABOUTUS_PETRO_WEB!);
          }}
        />
        <Container row crossCenter style={{ marginTop: 38 }}>
          <TextContainer text="Síguenos como" typography="h6" textAlign="center" />
          <TextContainer text="7-Eleven" typography="h6" fontBold marginLeft={2} textAlign="center" />
          <TextContainer text="en:" typography="h6" marginLeft={3} textAlign="center" />
        </Container>
        <Container row crossCenter style={{ marginTop: 12 }}>
          <Touchable onPress={onPressSevenFacebook}>
            <EvilIcons name="sc-facebook" size={28} color={theme.brandColor.iconn_dark_grey} />
          </Touchable>
          <Touchable onPress={onPressSevenTwitter}>
            <Feather name="twitter" size={24} color={theme.brandColor.iconn_dark_grey} style={{ marginLeft: 20 }} />
          </Touchable>
          <Touchable onPress={onPressSevenPlay}>
            <Feather name="play" size={24} color={theme.brandColor.iconn_dark_grey} style={{ marginLeft: 20 }} />
          </Touchable>
          <Touchable onPress={onPressSevenInstagram}>
            <Feather name="instagram" size={24} color={theme.brandColor.iconn_dark_grey} style={{ marginLeft: 20 }} />
          </Touchable>
        </Container>
        <Container row crossCenter style={{ marginTop: 32 }}>
          <TextContainer text="Síguenos como" typography="h6" textAlign="center" />
          <TextContainer text="Petro Seven" typography="h6" fontBold marginLeft={2} textAlign="center" />
          <TextContainer text="en:" typography="h6" marginLeft={3} textAlign="center" />
        </Container>
        <Container row crossCenter style={{ marginTop: 12 }}>
          <Touchable onPress={onPressPetroFacebook}>
            <EvilIcons name="sc-facebook" size={28} color={theme.brandColor.iconn_dark_grey} />
          </Touchable>
          <Touchable onPress={onPressPetroTwitter}>
            <Feather name="twitter" size={24} color={theme.brandColor.iconn_dark_grey} style={{ marginLeft: 20 }} />
          </Touchable>
          <Touchable onPress={onPressPetroPlay}>
            <Feather name="play" size={24} color={theme.brandColor.iconn_dark_grey} style={{ marginLeft: 20 }} />
          </Touchable>
          <Touchable onPress={onPressPetroInstagram}>
            <Feather name="instagram" size={24} color={theme.brandColor.iconn_dark_grey} style={{ marginLeft: 20 }} />
          </Touchable>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default AboutUsScreen;
