import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { Touchable } from '../../atoms/Touchable';
import { StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import { Address } from 'rtk';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AddressCardProps {
  address: Address;
  index: number;
  onPressEdit: () => void;
  onPressDelete?: () => void;
  onPressSetDefault?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onPressEdit, onPressDelete, onPressSetDefault }: AddressCardProps) => {
  const AddressCardStyle: StyleProp<ViewStyle> = {
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: 16,
    paddingVertical: 12
  };

  return (
    <Container row space="between" style={AddressCardStyle} crossCenter center>
      {onPressSetDefault && (
        <Touchable onPress={onPressSetDefault}>
          <Container width={'10%'}>
            <RadioButton selected={address.isDefault} />
          </Container>
        </Touchable>
      )}
      <Container width={'75%'} flex space="between" style={{ marginLeft: 13 }}>
        <Touchable onPress={() => {}}>
          <TextContainer text={address?.addressName} fontBold />
          <TextContainer text={`${address.street}, ${address.neighborhood}, ${address.city}, ${address.state}`} marginTop={12} />
        </Touchable>
        {onPressDelete && (
          <Container row>
            <Touchable onPress={onPressDelete}>
              <Container row style={{ marginTop: 12 }}>
                <Ionicons name="md-trash-outline" size={theme.iconSize.xsmall} color={theme.brandColor.iconn_red_original} />
                <TextContainer text="Eliminar" textColor={theme.brandColor.iconn_red_original} fontSize={theme.fontSize.h6} marginTop={4} />
              </Container>
            </Touchable>
            <Container />
          </Container>
        )}
      </Container>
      <Touchable onPress={onPressEdit} width={'15%'}>
        <Container crossAlignment="end" style={{ marginRight: 20 }}>
          <Octicons name="chevron-right" size={24} color={theme.fontColor.dark} />
        </Container>
      </Touchable>
    </Container>
  );
};

export default AddressCard;

const RadioButton = (props: any) => {
  return (
    <Container
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.brandColor.iconn_green_original,
          alignItems: 'center',
          justifyContent: 'center'
        },
        props.style
      ]}
    >
      {props.selected ? (
        <Container
          style={{
            height: 17,
            width: 17,
            borderRadius: 10,
            backgroundColor: theme.brandColor.iconn_green_original
          }}
        />
      ) : null}
    </Container>
  );
};
