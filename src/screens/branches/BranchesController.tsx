import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BranchesStackParams } from 'navigation/types';
import { Details, Region } from 'react-native-maps';
import { Dimensions, Platform } from 'react-native';
import { getNearbyPoints } from 'utils/geolocation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PointDetailSheet } from 'components';
import { PointDisplayMode, PointInterface, RootState, TabItem, useAppSelector } from 'rtk';
import { POINTS } from 'assets/files';
import { SafeArea } from 'components/atoms/SafeArea';
import { showLocation } from 'react-native-map-link';
import { useLocation } from 'hooks/useLocation';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from 'context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BranchesScreen from './BranchesScreen';
import theme from 'components/theme/theme';

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
  const onPressMarker = (point: PointInterface, mode?: PointDisplayMode) => {
    // TODO: increase gorhom library to 4.4.3 to fix expand() method in case of markers mode list.
    // console.log(JSON.stringify(point, null, 3));
    // console.log('mode', mode);
    if (mode === 'list') bottomSheetRef.current?.present();
    else bottomSheetRef.current?.present();
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

  const onPressSeeList = () => {
    bottomSheetRef.current?.close();
    setPointDisplayMode('list');
  };

  const onPressSeeMap = () => {
    bottomSheetRef.current?.close();
    setPointDisplayMode('map');
  };

  /**
   * This function "showLocation" will shown an action sheet on iOS and an alert on Android, without any custom styling.
   * TODO: DT Alex. Alex should provide a new version of json markers, this version should have shopName property for gas stations.
   */
  const onPressHowToGet = () => {
    showLocation({
      alwaysIncludeGoogle: true,
      appsWhiteList: ['google-maps', 'apple-maps', 'waze'],
      cancelText: 'Cancelar',
      dialogMessage: '¿Qué aplicación te gustaría utilizar?',
      dialogTitle: 'Seleccionar aplicación',
      directionsMode: 'walk',
      googleForceLatLon: true,
      latitude: marker?.latitude!,
      longitude: marker?.longitude!,
      sourceLatitude: userLocation?.latitude,
      sourceLongitude: userLocation?.longitude
    });
  };

  const onPressShowDetails = () => {
    bottomSheetRef.current?.close();
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
