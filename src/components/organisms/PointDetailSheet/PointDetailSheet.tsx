import React from 'react';
import { Button, TextContainer } from '../../molecules';
import { Container, CustomModal, Touchable } from 'components/atoms';
import { ICONN_BRANCHES_ARROW_UP, ICONN_BRANCHES_BINOMIAL, ICONN_BRANCHES_LOCATION_PIN, ICONN_BRANCHES_PETRO, ICONN_BRANCHES_SEVEN } from 'assets/images';
import { Image, TouchableOpacity } from 'react-native';
import { PointInterface } from 'rtk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';

interface Props {
  marker: PointInterface;
  onPressOut: () => void;
  visible: boolean;
}

const PointDetailSheet: React.FC<Props> = ({ marker, onPressOut, visible }) => {
  const insets = useSafeAreaInsets();

  return (
    <CustomModal visible={visible} onDismiss={onPressOut} animationType="slide" backgroundOpacity={0}>
      <Container flex alignment="end">
        <TouchableOpacity onPress={onPressOut} style={{ height: '100%', width: '100%' }} />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container>
            <Container style={{ marginHorizontal: 16, marginTop: 16 }}>
              <Image
                resizeMode="contain"
                source={
                  marker
                    ? marker.type === 'binomial'
                      ? ICONN_BRANCHES_BINOMIAL
                      : marker.type === 'petro'
                      ? ICONN_BRANCHES_PETRO
                      : ICONN_BRANCHES_SEVEN
                    : undefined
                }
                style={{
                  width: marker ? (marker.type === 'binomial' ? 240 : marker.type === 'petro' ? 120 : 120) : undefined,
                  height: marker ? (marker.type === 'binomial' ? 40 : marker.type === 'petro' ? 40 : 40) : undefined
                }}
              />
            </Container>
            <Container row center style={{ paddingRight: 42, marginHorizontal: 16 }}>
              <Image resizeMode="contain" source={ICONN_BRANCHES_LOCATION_PIN} style={{ width: 25, height: 25 }} />
              <TextContainer text={marker?.address} marginTop={16} numberOfLines={3} marginLeft={4} />
            </Container>
            <Container row alignment="end" style={{ marginTop: 16, marginHorizontal: 16 }}>
              <Touchable onPress={onPressOut}>
                <Container row middle>
                  <TextContainer
                    fontBold
                    marginRight={8}
                    text="Mostrar más"
                    textAlign="center"
                    textColor={theme.brandColor.iconn_green_original}
                    typography="h5"
                    underline
                  />
                  <Image resizeMode="contain" source={ICONN_BRANCHES_ARROW_UP} style={{ width: 25, height: 25 }} />
                </Container>
              </Touchable>
            </Container>
            <Container backgroundColor={theme.brandColor.iconn_warm_grey} style={{ height: 5, paddingHorizontal: 0, marginTop: 8 }} />
            <Container row space="between" style={{ marginTop: 8, marginHorizontal: 16 }} middle>
              <Container style={{ width: '25%' }}>
                <TextContainer text="DISTANCIA" textAlign="center" textColor={theme.fontColor.placeholder} typography="placeholder" />
                <TextContainer fontBold text={`${marker?.kmDistance} km`} textAlign="center" typography="h5" marginTop={4} />
              </Container>
              <Container style={{ width: '25%' }}>
                <TextContainer text="TIEMPO" textAlign="center" textColor={theme.fontColor.placeholder} typography="placeholder" />
                <TextContainer fontBold text="5 Min" textAlign="center" typography="h5" marginTop={4} />
              </Container>
              <Container style={{ width: '50%' }} middle>
                <Button length="short" round onPress={() => {}} fontSize="h4" fontBold>
                  Cómo llegar
                </Button>
              </Container>
            </Container>
          </Container>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

export default PointDetailSheet;
