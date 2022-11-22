import React from 'react';
import { Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { ICONN_NO_CONNECTION, ICONN_USER_PROFILE } from 'assets/images';
import { Container } from '../Container';
import { TextContainer } from '../../molecules/TextContainer';
import theme from '../../theme/theme';

export type InfoCardPropsType = 'no-data' | 'connection';

interface InfoCardProps {
  text: string;
  type?: InfoCardPropsType;
}

const InfoCard: React.FC<InfoCardProps> = ({ text, type }: InfoCardProps) => {
  const InfoCardStyle: StyleProp<ViewStyle> = {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 26
  };

  const TextStyle: StyleProp<ViewStyle> = {
    marginTop: 16,
    justifyContent: 'space-between',
    paddingHorizontal: '12%',
  };

  const ImageStyle: StyleProp<ImageStyle> = {
    width: type === 'connection' ? 28 : 28,
    height: type === 'no-data' ? 28 : 28,
    alignSelf: 'center'
  };

  return (
    <Container style={InfoCardStyle}>
      <Container row center space="between">
        <Image source={type === 'no-data' ? ICONN_USER_PROFILE : ICONN_NO_CONNECTION} style={ImageStyle} />
      </Container>
      <Container style={TextStyle}>
        <TextContainer text={text} textAlign={'center'} fontSize={theme.fontSize.h5} textColor={theme.brandColor.iconn_grey} lineHeight={20} />
      </Container>
    </Container>
  );
};

export default InfoCard;