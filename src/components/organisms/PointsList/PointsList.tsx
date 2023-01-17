import React from 'react';
import { Container } from 'components/atoms';
import { Platform, ScrollView } from 'react-native';
import { PointDisplayMode, PointInterface } from 'rtk';
import { PointItem } from '../../molecules';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';

interface Props {
  markers: PointInterface[];
  onPressMarker: (marker: PointInterface, mode?: PointDisplayMode) => void;
}

const PointsList: React.FC<Props> = ({ markers, onPressMarker }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Container backgroundColor={theme.brandColor.iconn_background}>
          {markers
            ? markers.map((marker, i) => (
                <Container key={i}>
                  <PointItem onPress={onPressMarker} point={marker} />
                  <Container backgroundColor={theme.brandColor.iconn_white} style={{ height: 4 }} />
                </Container>
              ))
            : null}
        </Container>
      </Container>
    </ScrollView>
  );
};

export default PointsList;
