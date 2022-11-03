import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import LegalScreen from './LegalScreen';
import { Linking } from 'react-native';

const LegalController: React.FC = () => {
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
      <LegalScreen openPage={openPage} />
    </SafeArea>
  );
};

export default LegalController;
