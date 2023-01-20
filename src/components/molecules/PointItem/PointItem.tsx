import React from 'react';
import { Container } from '../../atoms/Container';
import { ICONN_BRANCHES_ICON_PETRO, ICONN_BRANCHES_ICON_7ELEVEN, ICONN_BRANCHES_ICON_BINOMIAL, ICONN_ERROR_CROSS } from 'assets/images';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { PointDisplayMode, PointInterface } from 'rtk';
import { TextContainer } from '../TextContainer';
import { Touchable } from '../../atoms/Touchable';
import Octicons from 'react-native-vector-icons/Octicons';
import theme from '../../theme/theme';

interface PointItemProps {
  onPress: (marker: PointInterface, mode: PointDisplayMode) => void;
  point: PointInterface;
  pointFound?: boolean;
}

/**
 * This component is used in the "Sucursales" tab. Is used to show every marker that is near of the user.
 * @param PointItemProps
 * @returns React.FC
 */
const PointItem: React.FC<PointItemProps> = ({ onPress, point, pointFound = false }) => {
  const cardImageStyle: StyleProp<ImageStyle> = {
    width: point.type === 'binomial' ? 50 : 35,
    height: point.type === 'binomial' ? 60 : 35,
    right: 8,
    top: point.type === 'binomial' ? 10 : 0
  };

  return (
    <Touchable onPress={() => onPress(point, pointFound ? 'map' : 'list')}>
      <Container style={{ height: 85, paddingHorizontal: 16, paddingTop: 14 }}>
        <Container row space="between" center height={'60%'}>
          <Container width={'15%'} center>
            <Image
              source={
                point.type === 'binomial'
                  ? ICONN_BRANCHES_ICON_BINOMIAL
                  : point.type === '7eleven'
                  ? ICONN_BRANCHES_ICON_7ELEVEN
                  : point.type === 'petro'
                  ? ICONN_BRANCHES_ICON_PETRO
                  : ICONN_ERROR_CROSS
              }
              style={cardImageStyle}
              resizeMode="contain"
            />
          </Container>
          {/* TODO: DT Alex. Alex should provide a new version of json markers, this version should have shopName property for gas stations. */}
          <Container width={pointFound ? '75%' : '60%'} flex style={{ left: -8 }}>
            <TextContainer text={point.shopName} fontSize={10} />
            <TextContainer text={point.address} numberOfLines={4} fontSize={10} />
          </Container>
          <Container width={pointFound ? '10%' : '25%'} row alignment="end">
            {pointFound ? (
              <Octicons name="link-external" size={24} color={theme.brandColor.iconn_dark_grey} style={{ right: 8 }} />
            ) : (
              <>
                <TextContainer text="Detalles" typography="h5" fontBold underline textColor={theme.brandColor.iconn_green_original} marginRight={20} />
                <Octicons name="chevron-right" size={24} color={theme.brandColor.iconn_green_original} style={{ right: 8, bottom: 4 }} />
              </>
            )}
          </Container>
        </Container>
        <Container row alignment="start" height={'40%'} style={{ marginTop: 4 }}>
          <Container width={'15%'} />
          <Container row width={'70%'} style={{ left: -8 }}>
            <TextContainer text="DISTANCIA" textColor={theme.fontColor.placeholder} typography="h6" />
            <TextContainer text={`${point?.kmDistance} km`} marginLeft={8} fontBold typography="h6" />
          </Container>
          <Container width={'15%'} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default PointItem;
