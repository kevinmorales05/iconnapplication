import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { Touchable } from '../../atoms/Touchable';
import { StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';

interface NavigationMenuItemProps {
  disable?: boolean;
  icon: React.ReactNode;
  text: string;
  onPressNavigateTo: () => void;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ text, icon, disable = false, onPressNavigateTo }: NavigationMenuItemProps) => {
  const NavigationMenuItemStyle: StyleProp<ViewStyle> = {
    marginHorizontal: 8,
    opacity: disable ? 0.5 : 1,
    backgroundColor: disable ? theme.brandColor.iconn_med_grey : theme.brandColor.iconn_white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.brandColor.iconn_light_grey
  };

  return (
    <Touchable onPress={onPressNavigateTo} disabled={disable}>
      <Container row space="between" style={NavigationMenuItemStyle} crossCenter center>
        <Container width={'80%'} flex row center>
          {icon}
          <TextContainer text={text} marginLeft={16} />
        </Container>
        <Container width={'20%'} crossAlignment="end" style={{ marginRight: 20 }}>
          <Octicons name="chevron-right" size={24} color={theme.brandColor.dark_grey} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default NavigationMenuItem;
