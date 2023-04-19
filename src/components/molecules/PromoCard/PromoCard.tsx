import { Container, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { TextContainer } from '../TextContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LitresPromoStatus } from 'rtk/types/accumulate.types';

interface Props {
  promoPic: ImageSourcePropType;
  title: string;
  expiry: string;
  amount: number;
  status?: LitresPromoStatus;
}

const PromosCard: React.FC<Props> = ({ promoPic, title, expiry, amount, status }) => {
  return (
    <Container backgroundColor={theme.brandColor.iconn_white} row style={{ borderRadius: 8, marginBottom: 12, paddingHorizontal: 0 }}>
      <Image source={promoPic} style={{ height: 80, width: 120 }} />
      <Container flex style={styles.container}>
        <TextContainer text={title} fontSize={14} marginTop={12} />
        {status ? (
          <Container flex row space="between" style={{ marginTop: 24 }}>
            <TextContainer
              text={status}
              fontSize={12}
              marginRight={30}
              fontWeight={'800'}
              textColor={status === 'ACTIVO' ? theme.brandColor.iconn_green_original : theme.fontColor.placeholder}
            />
            <Container row style={{ marginLeft: 20 }}>
              <CustomText text={`- ${amount} litros`} fontSize={14} textColor={theme.fontColor.placeholder} />
            </Container>
          </Container>
        ) : (
          <Container center row space="between" style={{ marginTop: 24 }}>
            <TextContainer text={`Válido al ${expiry}`} fontSize={10} />
            <Container row style={{ marginLeft: 34 }}>
              <MaterialCommunityIcons name="water" size={17} color={theme.brandColor.iconn_green_original} />
              <CustomText text={`${amount} litros`} fontSize={14} fontWeight="800" textColor={theme.brandColor.iconn_green_original} />
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12
  }
});

export default PromosCard;
