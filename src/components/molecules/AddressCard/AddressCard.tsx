import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { Touchable } from '../../atoms/Touchable';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';
import { ICONN_CARD_PETRO, ICONN_CARD_SEVEN } from 'assets/images';
import Octicons from 'react-native-vector-icons/Octicons';
import { Address } from 'rtk';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AddressCardProps {
  address: Address;
  index: number;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onPressEdit, onPressDelete }: AddressCardProps) => {
  const AddressCardStyle: StyleProp<ViewStyle> = {
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: 16
  };

  return (
    <Container row space="between" height={120} style={AddressCardStyle} crossCenter center>
      <Container width={'85%'} flex space="between" style={{ marginLeft: 13 }}>
        <TextContainer text={address.tag} fontBold />
        <TextContainer text={`${address.streetAndNumber}, ${address.colony}, ${address.city}, ${address.state}`} marginTop={12} />
        <Container row style={{ marginTop: 12 }}>
          <Ionicons name="md-trash-outline" size={theme.iconSize.xsmall} color={theme.brandColor.iconn_red_original} />
          <TextContainer text="Eliminar" textColor={theme.brandColor.iconn_red_original} fontSize={theme.fontSize.h6} marginTop={4} />
        </Container>
      </Container>
      <Container width={'15%'} crossAlignment="end" style={{ marginRight: 20 }}>
        <Octicons name="chevron-right" size={24} color={theme.fontColor.dark} />
      </Container>
    </Container>
  );
};

export default AddressCard;
