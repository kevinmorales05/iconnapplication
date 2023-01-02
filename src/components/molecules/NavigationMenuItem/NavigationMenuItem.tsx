import React from 'react';
import { Container } from '../../atoms/Container';
import { TextContainer } from '../TextContainer';
import { Touchable } from '../../atoms/Touchable';
import { StyleProp, ViewStyle } from 'react-native';
import theme from '../../theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';

interface NavigationMenuItemProps {
  disable?: boolean;
  icon?: React.ReactNode;
  text: string;
  mainTextSize?: number;
  onPressNavigateTo: () => void;
  color?: string;
  isMainTextBold?: boolean;
  description?: string;
  descriptionTextSize?: number;
  marginHorizontal?: number;
  widthContainer?: string | number;
  paddingLeft?: number;
  marginBottom?: number;
  height?: number | string;
  paddingVertical?: number;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  text,
  icon,
  disable = false,
  mainTextSize,
  onPressNavigateTo,
  color,
  isMainTextBold,
  description,
  descriptionTextSize,
  marginHorizontal,
  widthContainer,
  paddingLeft,
  marginBottom,
  height,
  paddingVertical
}: NavigationMenuItemProps) => {
  const NavigationMenuItemStyle: StyleProp<ViewStyle> = {
    marginHorizontal: marginHorizontal != undefined ? marginHorizontal : 8,
    opacity: disable ? 0.5 : 1,
    backgroundColor: disable ? theme.brandColor.iconn_med_grey : color != undefined ? color : theme.brandColor.iconn_white,
    paddingVertical: paddingVertical ? paddingVertical : 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.brandColor.iconn_light_grey,
    width: widthContainer ? widthContainer : 'auto',
    paddingLeft: paddingLeft != undefined ? paddingLeft : 0,
    marginBottom: marginBottom != undefined ? marginBottom : 0,
    height: height != undefined ? height : 'auto'
  };

  return (
    <Touchable onPress={onPressNavigateTo} disabled={disable}>
      <Container row space="between" style={NavigationMenuItemStyle} center>
        <Container width={'80%'} flex row center>
          {icon ? icon : null}
          <Container>
            <TextContainer text={text} marginLeft={16} fontBold={isMainTextBold} fontSize={mainTextSize != undefined ? 14 : 15} />
            {description != undefined ? (
              <TextContainer
                text={description}
                marginLeft={14}
                textColor={theme.fontColor.placeholder}
                fontSize={descriptionTextSize != undefined ? 12 : 12}
                numberOfLines={2}
              />
            ) : (
              <></>
            )}
          </Container>
        </Container>
        <Container width={'20%'} crossAlignment="end" style={{ marginRight: 20 }}>
          <Octicons name="chevron-right" size={24} color={theme.brandColor.dark_grey} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default NavigationMenuItem;
