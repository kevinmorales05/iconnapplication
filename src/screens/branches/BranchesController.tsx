import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BranchesStackParams } from 'navigation/types';
import { Dimensions, Linking, Platform } from 'react-native';
import { getNearbyPoints } from 'utils/geolocation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PointDetailSheet } from 'components';
import { PointDisplayMode, PointInterface, RootState, TabItem, useAppSelector } from 'rtk';
import { POINTS } from 'assets/files';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLocation } from 'hooks/useLocation';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from 'context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BranchesScreen from './BranchesScreen';
import theme from 'components/theme/theme';
import { Details, Region } from 'react-native-maps';

const BranchesController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<BranchesStackParams>>();
  const { permissions } = usePermissions();
  const { userLocation } = useLocation();
  const [markers, setMarkers] = useState<PointInterface[]>();
  const [marker, setMarker] = useState<PointInterface>();
  const insets = useSafeAreaInsets();
  const [tabSelected, setTabSelected] = useState(1);
  const { visibleStoreSymbology, visibleSearchByDistance } = useAppSelector((state: RootState) => state.app);
  const [radiusOfSearch, setRadiusOfSearch] = useState(1);
  const [latitudeDelta, setLatitudeDelta] = useState(0.04);

  useEffect(() => {
    const nearbyMarkers = getNearbyPoints([userLocation?.latitude!, userLocation?.longitude!], POINTS as PointInterface[], radiusOfSearch);
    setMarkers(nearbyMarkers);
  }, [userLocation, radiusOfSearch]);

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
  const snapPoints = useMemo(
    () => [
      Platform.OS === 'android' ? '50%' : '50%',
      Platform.OS === 'android' ? Dimensions.get('window').height : Dimensions.get('window').height - insets.top
    ],
    []
  );

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

  const [pointDisplayMode, setPointDisplayMode] = useState<PointDisplayMode>('map');

  const onPressSeeList = () => setPointDisplayMode('list');
  const onPressSeeMap = () => setPointDisplayMode('map');

  /**
   * This function allows open always the google maps app for IOS. In Android will ask to the user for the app to open the address.
   * TODO: DT Alex. Alex should provide a new version of json markers, this version should have shopName property for gas stations.
   */
  const onPressHowToGet = () => {
    const latLng = `${marker?.latitude},${marker?.longitude}`;
    if (Platform.OS === 'android') {
      const scheme = Platform.select({ android: 'geo:0,0?q=' });
      const label = marker?.type === '7eleven' ? marker.shopName : marker?.address;
      const url = Platform.select({
        android: `${scheme}${latLng}(${label})`
      });
      Linking.openURL(url!);
    } else {
      Linking.openURL(`https://maps.google.com/maps?daddr=${latLng}`);
    }
  };

  const onPressShowDetails = () => {
    navigate('ShowDetails');
  };

  const onChangeRegionComplete = (_r: Region, _d: Details) => {
    // console.log('Cambia region de busqueda', r, d);
    // details contain if the movement is by gestures or not.
    // r contain de center coordinates of screen.
  };

  const onChangeSearchOfRadius = (km: number) => {
    if (km === 1) setLatitudeDelta(0.04);
    else if (km === 2) setLatitudeDelta(0.14);
    else if (km === 3) setLatitudeDelta(0.24);
    else if (km === 4) setLatitudeDelta(0.34);
    else if (km === 5) setLatitudeDelta(0.44);
    setRadiusOfSearch(km);
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_white} childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <BranchesScreen
        latitudeDelta={latitudeDelta}
        markers={markers!}
        onChangeRegionComplete={onChangeRegionComplete}
        onChangeSearchOfRadius={onChangeSearchOfRadius}
        onPressMarker={onPressMarker}
        onPressOut={handleClosePress}
        onPressSeeList={onPressSeeList}
        onPressSeeMap={onPressSeeMap}
        onPressShowDetails={onPressShowDetails}
        permissions={permissions}
        pointDisplayMode={pointDisplayMode}
        visibleSearchByDistance={visibleSearchByDistance!}
        visibleStoreSymbology={visibleStoreSymbology!}
      />
      <PointDetailSheet
        bottomSheetRef={bottomSheetRef}
        marker={marker!}
        onPressHowToGet={onPressHowToGet}
        onPressShowLess={onPressShowLess}
        onPressShowMore={onPressShowMore}
        onPressTab={onPressTab}
        snapPoints={snapPoints}
        tabSelected={tabSelected}
      />
    </SafeArea>
  );
};

export default BranchesController;
