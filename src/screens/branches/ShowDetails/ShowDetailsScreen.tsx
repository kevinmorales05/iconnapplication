import React from 'react';
import { ICONN_BRANCHES_DETAILS_SYMBOLOGY, ICONN_BRANCHES_SEARCH_BY_DISTANCE } from 'assets/images';
import { Image } from 'react-native';
import { TextContainer, Container, Touchable, SafeArea } from 'components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { CustomSwitch } from 'components/atoms';

interface Props {
  goBack: () => void;
  isSearchByDistanceEnabled: boolean;
  isStoreSimbologyEnabled: boolean;
  onValueSearchByDistanceChange: (v: boolean) => void;
  onValueStoresSimbologyChange: (v: boolean) => void;
}

const ShowDetailsScreen: React.FC<Props> = ({
  goBack,
  isSearchByDistanceEnabled,
  isStoreSimbologyEnabled,
  onValueSearchByDistanceChange,
  onValueStoresSimbologyChange
}) => {
  const insets = useSafeAreaInsets();

  const onClose = () => {
    goBack();
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={true} barStyle="dark" childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <Container style={{ marginTop: insets.top + 16 }} crossCenter>
        <Container>
          <TextContainer text="Mostrar detalles" fontSize={22} fontBold textAlign="center" />
        </Container>
        <Container style={{ position: 'absolute', right: 0 }}>
          <Touchable onPress={onClose} rounded marginHorizontal={16}>
            <AntDesign name="close" size={28} color="black" />
          </Touchable>
        </Container>
      </Container>
      <Container style={{ paddingHorizontal: 16, borderTopWidth: 1, marginTop: 12, borderTopColor: theme.brandColor.iconn_light_grey }} />
      <Container>
        <Container row space="between" center height={100} style={{ paddingHorizontal: 16 }}>
          <Container width={'25%'}>
            <Image source={ICONN_BRANCHES_DETAILS_SYMBOLOGY} style={{ width: 90, height: 90 }} resizeMode="contain" />
          </Container>
          <Container width={'50%'}>
            <TextContainer text="Simbología de tiendas" typography="paragraph" />
          </Container>
          <Container width={'25%'}>
            <CustomSwitch isEnabled={isStoreSimbologyEnabled} onValueChange={onValueStoresSimbologyChange} />
          </Container>
        </Container>
        <Container backgroundColor={theme.brandColor.iconn_warm_grey} style={{ height: 4 }} />
        <Container row space="between" center height={100} style={{ paddingHorizontal: 16 }}>
          <Container width={'25%'}>
            <Image source={ICONN_BRANCHES_SEARCH_BY_DISTANCE} style={{ width: 90, height: 90 }} resizeMode="contain" />
          </Container>
          <Container width={'50%'}>
            <TextContainer text={'Búsqueda por distancia\n(km)'} typography="paragraph" numberOfLines={2} />
          </Container>
          <Container width={'25%'}>
            <CustomSwitch isEnabled={isSearchByDistanceEnabled} onValueChange={onValueSearchByDistanceChange} />
          </Container>
        </Container>
      </Container>
    </SafeArea>
  );
};

export default ShowDetailsScreen;
