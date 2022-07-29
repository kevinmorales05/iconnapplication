import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';
import { Touchable } from '../../atoms/Touchable';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/AntDesign';

interface TaxInfoProps {
  rfc: string;
  name: string;
  onPress: () => void;
  isDefault?: boolean;
}

const TaxInfoCard: React.FC<TaxInfoProps> = ({ rfc, name, onPress, isDefault = false }: TaxInfoProps) => {
  const taxInfoStyle: StyleProp<ViewStyle> = {
    borderRadius: 8,
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: 12
  };

  return (
    <Container row space="between" crossCenter center style={taxInfoStyle}>
      <Container width={'85%'} flex crossCenter>
        <Container style={{ marginLeft: 16, marginBottom: 12 }}>
          <TextContainer text={rfc} typography="h3" fontBold marginTop={12} />
          <TextContainer text={name} typography="h4" marginTop={8} />
        </Container>
        {isDefault && (
          <Container row style={{ marginLeft: 16, marginBottom: 14 }}>
            <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ marginRight: 5 }} />
            <TextContainer textColor={theme.brandColor.iconn_green_original} text="Predeterminado" typography="h5" fontWeight="normal" />
          </Container>
        )}
      </Container>
      <Container width={'15%'} crossAlignment="end">
        <Touchable onPress={onPress} marginRight={20} marginBottom={isDefault ? 35 : 0}>
          <Octicons name="chevron-right" size={24} color={theme.fontColor.dark} />
        </Touchable>
      </Container>
    </Container>
  );
};

export default TaxInfoCard;
