import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { getNearbyPoints } from 'utils/geolocation';
import { PointDetailSheet } from 'components';
import { PointInterface, TabItem } from 'rtk';
import { POINTS } from 'assets/files';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLocation } from 'hooks/useLocation';
import { usePermissions } from 'context';
import BranchesScreen from './BranchesScreen';
import theme from 'components/theme/theme';
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BranchesController: React.FC = ({ navigation, route }: any) => {
  const { permissions } = usePermissions();
  const { userLocation } = useLocation();
  const [markers, setMarkers] = useState<PointInterface[]>();
  const [pointDetailVisible, setPointDetailVisible] = useState<boolean>(false);
  const [marker, setMarker] = useState<PointInterface>();
  const insets = useSafeAreaInsets();
  const [tabSelected, setTabSelected] = useState(1);

  // removing navigation header in this screen.
  React.useLayoutEffect(() => {
    if (!navigation || !route) return;

    // Get stack parent by id
    const homeStack = navigation.getParent('HomeStack');

    if (homeStack) {
      // Make sure the route name is "BranchesScreen" before turn header off
      if (route.name === 'BranchesScreen') {
        homeStack.setOptions({
          headerShown: false
        });
      }
    }
    // Turn header back on when unmount
    return homeStack
      ? () => {
          homeStack.setOptions({
            headerShown: true
          });
        }
      : undefined;
  }, [navigation, route]);

  useEffect(() => {
    const nearbyMarkers = getNearbyPoints([userLocation?.latitude!, userLocation?.longitude!], POINTS as PointInterface[]);
    setMarkers(nearbyMarkers);
  }, [userLocation]);

  /**
   * Set the current marker/point in the BottomModalSheet
   * @param point marker
   */
  const onPressMarker = (point: PointInterface) => {
    // console.log(JSON.stringify(point, null, 3));
    bottomSheetRef.current?.present();
    setMarker(point);
  };

  // ref to PointDetailSheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // SnapPoints for PointDetailSheet
  const snapPoints = useMemo(() => [Platform.OS === 'android' ? '45%' : '42%', Dimensions.get('window').height - insets.top], []);

  // callbacks
  const onHandleSheetChanges = useCallback((index: number) => {
    if (index === 1) {
      setPointDetailVisible(true);
    } else {
      setPointDetailVisible(false);
    }
  }, []);

  /**
   * Hide PointDetailSheet.
   */
  const handleClosePress = () => bottomSheetRef.current?.close();

  const onPressShowMore = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const onPressShowLess = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const onPressTab = (tab: TabItem) => {
    if (tab.id) {
      setTabSelected(parseInt(tab.id, 10));
    }
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_white} childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <BranchesScreen permissions={permissions} markers={markers!} onPressMarker={onPressMarker} onPressOut={handleClosePress} />
      <PointDetailSheet
        bottomSheetRef={bottomSheetRef}
        marker={marker!}
        onHandleSheetChanges={onHandleSheetChanges}
        onPressShowLess={onPressShowLess}
        onPressShowMore={onPressShowMore}
        onPressTab={onPressTab}
        pointDetailVisible={pointDetailVisible}
        snapPoints={snapPoints}
        tabSelected={tabSelected}
      />
    </SafeArea>
  );
};

export default BranchesController;
