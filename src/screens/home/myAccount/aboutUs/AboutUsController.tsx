import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import AboutUsScreen from './AboutUsScreen';

const AboutUsController: React.FC = () => {
  const onPressSevenFacebook = () => {
    console.log('onPressSevenFacebook...');
  };
  const onPressSevenTwitter = () => {
    console.log('onPressSevenTwitter...');
  };
  const onPressSevenPlay = () => {
    console.log('onPressSevenPlay...');
  };
  const onPressSevenInstagram = () => {
    console.log('onPressSevenInstagram...');
  };
  const onPressPetroFacebook = () => {
    console.log('onPressPetroFacebook...');
  };
  const onPressPetroTwitter = () => {
    console.log('onPressPetroTwitter...');
  };
  const onPressPetroPlay = () => {
    console.log('onPressPetroPlay...');
  };
  const onPressPetroInstagram = () => {
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
