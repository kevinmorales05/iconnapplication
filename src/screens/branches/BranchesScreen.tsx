import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, Container, CustomMap, PointsList } from 'components';
import { PointDisplayMode, PointInterface } from 'rtk';
import theme from 'components/theme/theme';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import { ICONN_BRANCHES_FILTER_OPTION } from 'assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  markers: PointInterface[];
  onPressMarker: (marker: PointInterface) => void;
  onPressOut: () => void;
  onPressSeeList: () => void;
  onPressSeeMap: () => void;
  permissions: {};
  pointDisplayMode: PointDisplayMode;
}

const BranchesScreen: React.FC<Props> = ({ markers, onPressMarker, onPressOut, onPressSeeList, onPressSeeMap, pointDisplayMode }) => {
  return (
    <>
      {/* <TextContainer typography="paragraph" text={JSON.stringify(permissions)} marginTop={23} marginBottom={16} /> */}
      <Container row space="between" middle style={{ paddingHorizontal: 16, paddingVertical: 8, width: '100%' }}>
        <Container style={{ width: '30%' }}>
          {pointDisplayMode === 'map' && (
            <Button
              onPress={onPressSeeList}
              color="iconn_white"
              style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
              size="xsmall"
              length="long"
              width="xxlarge"
              fontColor="dark"
              fontBold
              fontSize="label"
              leftIcon={<Foundation name="list-bullet" size={24} color={theme.brandColor.iconn_dark_grey} style={{ left: 8 }} />}
            >
              Ver lista
            </Button>
          )}
          {pointDisplayMode === 'list' && (
            <Button
              onPress={onPressSeeMap}
              color="iconn_white"
              style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
              size="xsmall"
              length="long"
              width="xxlarge"
              fontColor="dark"
              fontBold
              fontSize="label"
              leftIcon={<Ionicons name="map-outline" size={24} color={theme.brandColor.iconn_dark_grey} style={{ left: 8 }} />}
            >
              Ver Mapa
            </Button>
          )}
        </Container>
        <Container style={{ width: '30%' }}>
          <Button
            onPress={() => {}}
            color="iconn_white"
            style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
            size="xsmall"
            length="long"
            width="xxlarge"
            fontColor="dark"
            fontBold
            fontSize="label"
            leftIcon={<Feather name="layers" size={24} color={theme.brandColor.iconn_dark_grey} style={{ left: 8 }} />}
          >
            Mostrar
          </Button>
        </Container>
        <Container style={{ width: '30%' }}>
          <Button
            onPress={() => {}}
            color="iconn_white"
            style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.brandColor.iconn_med_grey }}
            size="xsmall"
            length="long"
            width="xxlarge"
            fontColor="dark"
            fontBold
            fontSize="label"
            leftIcon={<Image source={ICONN_BRANCHES_FILTER_OPTION} style={{ left: 8, width: 24, height: 24 }} />}
          >
            Filtrar
          </Button>
        </Container>
      </Container>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1
        }}
      >
        <>
          <Container flex>
            {pointDisplayMode === 'map' && <CustomMap markers={markers} onPressMarker={onPressMarker} onPressOut={onPressOut} />}
            {pointDisplayMode === 'list' && <PointsList markers={markers} onPressMarker={onPressMarker} />}
          </Container>
        </>
      </ScrollView>
    </>
  );
};

export default BranchesScreen;
