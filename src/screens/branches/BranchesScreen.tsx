import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, Container, CustomMap } from 'components';
import { PointInterface } from 'rtk';
import theme from 'components/theme/theme';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import { ICONN_BRANCHES_FILTER_OPTION } from 'assets/images';

interface Props {
  markers: PointInterface[];
  onPressMarker: (marker: PointInterface) => void;
  permissions: {};
}

const BranchesScreen: React.FC<Props> = ({ markers, onPressMarker }) => {
  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      <>
        {/* <TextContainer typography="paragraph" text={JSON.stringify(permissions)} marginTop={23} marginBottom={16} /> */}
        <Container row space="evenly" middle style={{ paddingVertical: 8 }}>
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
            leftIcon={<Foundation name="list-bullet" size={24} color={theme.brandColor.iconn_dark_grey} style={{ left: 8 }} />}
          >
            Ver lista
          </Button>
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
        <Container flex>
          <CustomMap markers={markers} onPressMarker={onPressMarker} />
        </Container>
      </>
    </ScrollView>
  );
};

export default BranchesScreen;
