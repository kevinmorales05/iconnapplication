import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import WhoWeAreScreen from './WhoWeAreScreen';
import { Linking } from 'react-native';

const WhoWeAreController: React.FC = () => {
  const openPage = (page: string) => {
    Linking.openURL(page);
    // console.log('Opening......... ', page)
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <WhoWeAreScreen openPage={openPage} />
    </SafeArea>
  );
};

export default WhoWeAreController;
