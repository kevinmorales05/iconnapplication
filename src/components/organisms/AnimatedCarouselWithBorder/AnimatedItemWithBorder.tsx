import { Container, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, ImageStyle, ViewStyle } from 'react-native';

interface Props {
  icon: any;
  serviceName: string;
  onPressItem: () => void;
  style?: ViewStyle;
  slug?: boolean;
  imgStyle?: ImageStyle;
  disabled?: boolean;
}

const AnimatedItemWithBorder: React.FC<Props> = ({ icon, serviceName, onPressItem, style, slug = true, imgStyle, disabled }) => {
  return (
    <Touchable
      onPress={() => {
        onPressItem();
      }}
    >
      <Container
        width={96}
        height={136}
        center
        backgroundColor={theme.brandColor.iconn_white}
        style={{ borderRadius: 8, paddingTop: 24, paddingBottom: 44, paddingHorizontal: 7, marginRight: 8, ...style, opacity: disabled ? 0.4 : 1 }}
      >
        <Image source={icon} style={{ width: 35, height: 35, resizeMode: 'contain', ...imgStyle }} />
        {slug && <TextContainer text={serviceName} marginTop={6} typography="h5" textAlign="center" />}
      </Container>
    </Touchable>
  );
};

export default AnimatedItemWithBorder;
