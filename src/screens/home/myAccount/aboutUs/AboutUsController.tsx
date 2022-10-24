import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import AboutUsScreen from './AboutUsScreen';
import { Linking } from 'react-native';

// TODO: relocate this urls to .ENV
const AboutUsController: React.FC = () => {
  const onPressSevenFacebook = () => {
    Linking.openURL('https://www.facebook.com/7ElevenMexico');
    console.log('onPressSevenFacebook...');
  };
  const onPressSevenTwitter = () => {
    Linking.openURL('https://twitter.com/7ElevenMexico');
    console.log('onPressSevenTwitter...');
  };
  const onPressSevenPlay = () => {
    Linking.openURL('https://www.youtube.com/user/7ElevenMexico');
    console.log('onPressSevenPlay...');
  };
  const onPressSevenInstagram = () => {
    Linking.openURL('https://www.instagram.com/seven_eleven_mexico/');
    console.log('onPressSevenInstagram...');
  };
  const onPressPetroFacebook = () => {
    Linking.openURL('https://www.facebook.com/Petro7Gas');
    console.log('onPressPetroFacebook...');
  };
  const onPressPetroTwitter = () => {
    Linking.openURL('https://twitter.com/Petro7Gas');
    console.log('onPressPetroTwitter...');
  };
  const onPressPetroPlay = () => {
    Linking.openURL('https://www.youtube.com/user/Petro7Gas');
    console.log('onPressPetroPlay...');
  };
  const onPressPetroInstagram = () => {
    Linking.openURL('https://www.instagram.com/explore/locations/1018904360/petro-7/');
    console.log('onPressPetroInstagram...');
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
      />
    </SafeArea>
  );
};

export default AboutUsController;
