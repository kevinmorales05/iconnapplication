import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import AboutUsScreen from './AboutUsScreen';
import { Linking } from 'react-native';
import Config from 'react-native-config';

const AboutUsController: React.FC = () => {
  const {
    ABOUTUS_SEVEN_FACEBOOK,
    ABOUTUS_SEVEN_TWITTER,
    ABOUTUS_SEVEN_YOUTUBE,
    ABOUTUS_SEVEN_INSTAGRAM,
    ABOUTUS_PETRO_FACEBOOK,
    ABOUTUS_PETRO_TWITTER,
    ABOUTUS_PETRO_YOUTUBE,
    ABOUTUS_PETRO_INSTAGRAM
  } = Config;
  const onPressSevenFacebook = () => {
    Linking.openURL(ABOUTUS_SEVEN_FACEBOOK!);
  };
  const onPressSevenTwitter = () => {
    Linking.openURL(ABOUTUS_SEVEN_TWITTER!);
  };
  const onPressSevenPlay = () => {
    Linking.openURL(ABOUTUS_SEVEN_YOUTUBE!);
  };
  const onPressSevenInstagram = () => {
    Linking.openURL(ABOUTUS_SEVEN_INSTAGRAM!);
  };
  const onPressPetroFacebook = () => {
    Linking.openURL(ABOUTUS_PETRO_FACEBOOK!);
  };
  const onPressPetroTwitter = () => {
    Linking.openURL(ABOUTUS_PETRO_TWITTER!);
  };
  const onPressPetroPlay = () => {
    Linking.openURL(ABOUTUS_PETRO_YOUTUBE!);
  };
  const onPressPetroInstagram = () => {
    Linking.openURL(ABOUTUS_PETRO_INSTAGRAM!);
  };
  const openPage = (page: string) => {
    Linking.openURL(page);
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <AboutUsScreen
        onPressSevenFacebook={onPressSevenFacebook}
        onPressSevenTwitter={onPressSevenTwitter}
        onPressSevenPlay={onPressSevenPlay}
        onPressSevenInstagram={onPressSevenInstagram}
        onPressPetroFacebook={onPressPetroFacebook}
        onPressPetroTwitter={onPressPetroTwitter}
        onPressPetroPlay={onPressPetroPlay}
        onPressPetroInstagram={onPressPetroInstagram}
        openPage={openPage}
      />
    </SafeArea>
  );
};

export default AboutUsController;
