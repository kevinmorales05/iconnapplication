import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BranchesStackParams } from 'navigation/types';
import { Details, Region } from 'react-native-maps';
import { Dimensions, Platform } from 'react-native';
import { getNearbyPoints } from 'utils/geolocation';
import { Location, PointDisplayMode, PointInfoNode, PointInterface, PointType, RootState, TabItem, useAppSelector } from 'rtk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PointDetailSheet } from 'components';
import { POINTS } from 'assets/files';
import { SafeArea } from 'components/atoms/SafeArea';
import { showLocation } from 'react-native-map-link';
import { useLocation } from 'hooks/useLocation';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from 'context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'context';
import BranchesScreen from './BranchesScreen';
import theme from 'components/theme/theme';

const BranchesController: React.FC<any> = ({ route }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<BranchesStackParams>>();
  const { permissions } = usePermissions();
  const { userLocation } = useLocation();
  const toast = useToast();
  const [markers, setMarkers] = useState<PointInterface[]>();
  const [finalMarkers, setFinalMarkers] = useState<PointInterface[]>();
  const [marker, setMarker] = useState<PointInterface>();
  const insets = useSafeAreaInsets();
  const [tabSelected, setTabSelected] = useState(1);
  const { visibleStoreSymbology, visibleSearchByDistance } = useAppSelector((state: RootState) => state.app);
  const [radiusOfSearch, setRadiusOfSearch] = useState(1);
  const [latitudeDelta, setLatitudeDelta] = useState(0.04);
  const [visibleSearchByAreaButton, setVisibleSearchByAreaButton] = useState(false);
  const [searchArea, setSearchArea] = useState<Location>();

  useEffect(() => {
    if (route?.params && route?.params.filterObject && markers) {
      /**
       * Get the real value of from the json file given a key from screen layout.
       * @param key The key is obtained from the screen layout and that key is relationed with the real value in the json file.
       * @returns Real value from the json file.
       */
      const getMaperValue = (key: string) => {
        const mapPointInfo = new Map();
        mapPointInfo.set('info_petro_benefits_carWashing', 'carWashing');
        mapPointInfo.set('info_petro_benefits_cinemaOrCombos', 'cinemaOrCombos');
        mapPointInfo.set('info_petro_complementaryProducts_oil', 'oil');
        mapPointInfo.set('info_petro_complementaryProducts_urea', 'urea');
        mapPointInfo.set('info_petro_evouchers_carnet', 'carnet');
        mapPointInfo.set('info_petro_evouchers_edenred', 'edenred');
        mapPointInfo.set('info_petro_evouchers_sivale', 'sivale');
        mapPointInfo.set('info_petro_others_7eleven', '7eleven');
        mapPointInfo.set('info_petro_others_parking', 'parking');
        mapPointInfo.set('info_petro_others_restroom', 'restroom');
        mapPointInfo.set('info_petro_payMethods_applePay', 'applePay');
        mapPointInfo.set('info_petro_payMethods_cards', 'cards');
        mapPointInfo.set('info_petro_payMethods_contacLess', 'contacLess');
        mapPointInfo.set('info_petro_payMethods_dollars', 'dollars');
        mapPointInfo.set('info_seven_extra_pokemon', 'pokemon');
        mapPointInfo.set('info_seven_food_bakeInStore', 'bakeInStore');
        mapPointInfo.set('info_seven_food_foodArea', 'foodArea');
        mapPointInfo.set('info_seven_food_PizzaTurbochef', 'Pizza/Turbochef');
        mapPointInfo.set('info_seven_food_Taquiza', 'Taquiza');
        mapPointInfo.set('info_seven_others_atm', 'atm');
        mapPointInfo.set('info_seven_others_drive_thru', 'drive-thru');
        mapPointInfo.set('info_seven_others_gas', 'gas');
        mapPointInfo.set('info_seven_others_wifi', 'wifi');
        return mapPointInfo.get(key);
      };

      /**
       * Get the group (seven or petro) of service selected by the user.
       * @param key The key is obtained from the screen layout and that key is relationed with the real value in the json file.
       * @returns Owner group of the service selected by the user.
       */
      const getMaperGroup = (key: string) => {
        const mapPointType = new Map();
        mapPointType.set('info_petro_benefits_carWashing', 'petro');
        mapPointType.set('info_petro_benefits_cinemaOrCombos', 'petro');
        mapPointType.set('info_petro_complementaryProducts_oil', 'petro');
        mapPointType.set('info_petro_complementaryProducts_urea', 'petro');
        mapPointType.set('info_petro_evouchers_carnet', 'petro');
        mapPointType.set('info_petro_evouchers_edenred', 'petro');
        mapPointType.set('info_petro_evouchers_sivale', 'petro');
        mapPointType.set('info_petro_others_7eleven', 'petro');
        mapPointType.set('info_petro_others_parking', 'petro');
        mapPointType.set('info_petro_others_restroom', 'petro');
        mapPointType.set('info_petro_payMethods_applePay', 'petro');
        mapPointType.set('info_petro_payMethods_cards', 'petro');
        mapPointType.set('info_petro_payMethods_contacLess', 'petro');
        mapPointType.set('info_petro_payMethods_dollars', 'petro');
        mapPointType.set('info_seven_extra_pokemon', 'seven');
        mapPointType.set('info_seven_food_bakeInStore', 'seven');
        mapPointType.set('info_seven_food_foodArea', 'seven');
        mapPointType.set('info_seven_food_PizzaTurbochef', 'seven');
        mapPointType.set('info_seven_food_Taquiza', 'seven');
        mapPointType.set('info_seven_others_atm', 'seven');
        mapPointType.set('info_seven_others_drive_thru', 'seven');
        mapPointType.set('info_seven_others_gas', 'seven');
        mapPointType.set('info_seven_others_wifi', 'seven');
        return mapPointType.get(key);
      };

      /**
       * Gets the type of branch for the search.
       * @returns PointType
       */
      const getTypeOfSearch = (): PointType => {
        let typeSeven: PointType | undefined;
        let typePetro: PointType | undefined;
        let typeOfFinalSearch: PointType;
        for (const property in route?.params.filterObject) {
          const group = getMaperGroup(property);
          if (group === 'seven') typeSeven = '7eleven';
          if (group === 'petro') typePetro = 'petro';
        }
        if (typeSeven === '7eleven' && typePetro === 'petro') typeOfFinalSearch = 'binomial';
        if (typeSeven === '7eleven' && typePetro === undefined) typeOfFinalSearch = '7eleven';
        if (typePetro === 'petro' && typeSeven === undefined) typeOfFinalSearch = 'petro';

        return typeOfFinalSearch!;
      };

      /**
       * Get the nearby markers given a filtering.
       */
      const filterNearbyMarkers = () => {
        const typeOfsearch = getTypeOfSearch();
        // console.log('El tipo de busqueda que se hará es: ', typeOfsearch);

        let newMarkersWithAvailableServices: PointInterface[] = [];

        for (const property in route?.params.filterObject) {
          if (property === 'info_binomial' || property === 'info_seven' || property === 'info_petro') {
            // console.log('Saltamos al siguiente property porque el actual es un botón: ', property);
            continue; // because its a main button.
          }

          const mapPropertyValue = getMaperValue(property);
          // console.log('Vamos a buscar el type:', mapPropertyValue);

          const filteredMarkers = markers?.filter((mrkr: PointInterface) => {
            let markerHasProperty: boolean = false;

            // This "if" means that the user has filtered by services that are only in 7eleven.
            if (typeOfsearch === '7eleven') {
              // This "if" means that we only search in points of type "7eleven" and "binomial"
              if (mrkr?.type === '7eleven' || mrkr?.type === 'binomial') {
                // 1. Buscamos en Seven food:
                markerHasProperty = mrkr.info.seven.food.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 2. Buscamos en Seven others:
                markerHasProperty = mrkr.info.seven.others.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 3. Buscamos en Seven extra:
                markerHasProperty = mrkr.info.seven.extra.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
              }
            }

            // This "if" means that the user has filtered by services that are only in petro.
            if (typeOfsearch === 'petro') {
              // This "if" means that we only search in points of type "petro" and "binomial"
              if (mrkr?.type === 'petro' || mrkr?.type === 'binomial') {
                // 1. Buscamos en Petro complementaryProducts:
                markerHasProperty = mrkr.info.petro.complementaryProducts.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 2. Buscamos en Petro others:
                markerHasProperty = mrkr.info.petro.others.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 3. Buscamos en Petro payMethods:
                markerHasProperty = mrkr.info.petro.payMethods.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 4. Buscamos en Petro evouchers:
                markerHasProperty = mrkr.info.petro.evouchers.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 5. Buscamos en Petro benefits:
                markerHasProperty = mrkr.info.petro.benefits.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
              }
            }

            // This "if" means that the user has filtered by services that are only in binomial.
            if (typeOfsearch === 'binomial') {
              // This "if" means that we only search in points of type "binomial"
              if (mrkr?.type === 'binomial') {
                // 1. Buscamos en Seven food:
                markerHasProperty = mrkr.info.seven.food.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 2. Buscamos en Seven others:
                markerHasProperty = mrkr.info.seven.others.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 3. Buscamos en Seven extra:
                markerHasProperty = mrkr.info.seven.extra.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;

                // 1. Buscamos en Petro complementaryProducts:
                markerHasProperty = mrkr.info.petro.complementaryProducts.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 2. Buscamos en Petro others:
                markerHasProperty = mrkr.info.petro.others.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 3. Buscamos en Petro payMethods:
                markerHasProperty = mrkr.info.petro.payMethods.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 4. Buscamos en Petro evouchers:
                markerHasProperty = mrkr.info.petro.evouchers.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
                // 5. Buscamos en Petro benefits:
                markerHasProperty = mrkr.info.petro.benefits.some((item: PointInfoNode) => item.type === mapPropertyValue);
                if (markerHasProperty) return mrkr;
              }
            }
          });

          newMarkersWithAvailableServices = newMarkersWithAvailableServices!.concat(filteredMarkers!);
        }

        // Filter by uniques Ids.
        const uniquePoints: PointInterface[] = newMarkersWithAvailableServices.filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i);

        // console.log('En estas tiendas es donde lo encontraras:', JSON.stringify(uniquePoints, null, 3));
        // console.log('Total de tiendas en donde lo encontraras:', uniquePoints?.length);
        if (uniquePoints.length === 0) {
          if (radiusOfSearch < 5) {
            toast.show({ message: 'No se encontraron resultados. Intenta desplazarte hacia otra área o aumentar el radio de busqueda.', type: 'error' });
          } else {
            toast.show({ message: 'No se encontraron resultados. Intenta desplazarte hacia otra área.', type: 'error' });
          }
        }
        setFinalMarkers(uniquePoints);
      };

      filterNearbyMarkers();
    } else {
      // If user hasnt filtered, then show the default geolocable markers.
      setFinalMarkers(markers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params, markers]);

  useEffect(() => {
    if (userLocation && radiusOfSearch) {
      const nearbyMarkers = getNearbyPoints([userLocation?.latitude!, userLocation?.longitude!], POINTS as PointInterface[], radiusOfSearch);
      if (nearbyMarkers.length === 0) {
        if (radiusOfSearch < 5) {
          toast.show({ message: 'No se encontraron resultados. Intenta desplazarte hacia otra área o aumentar el radio de busqueda.', type: 'error' });
        } else {
          toast.show({ message: 'No se encontraron resultados. Intenta desplazarte hacia otra área.', type: 'error' });
        }
      }
      setMarkers(nearbyMarkers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, radiusOfSearch]);

  /**
   * Search the markers based on the search area and considers the last selected search radius. And it also keeps the original markers.
   */
  const onSearchMarkersByArea = () => {
    // We get the points close to the new search area.
    // Remember that in the case of "Buscar en esta area" the "search radius" from the user's real location does not matter more than to limit the radius in this initial search.
    let nearbyMarkers = getNearbyPoints([searchArea?.latitude!, searchArea?.longitude!], POINTS as PointInterface[], radiusOfSearch); // After this line we use 100000 as search radius.
    if (nearbyMarkers.length > 0) {
      // We obtain the distance between the real location of the user and each of the new points in the new zone.
      nearbyMarkers = getNearbyPoints([userLocation?.latitude!, userLocation?.longitude!], nearbyMarkers as PointInterface[], 100000);
      // We join the markers close to the real location of the user, plus those of the new search area.
      const allMarkers = markers?.concat(nearbyMarkers);
      // In case the user hasn't scrolled too much on the map, we make sure that the new markers of the new area are not the same as the actual location. We prevent duplication.
      let uniquePoints: PointInterface[] = allMarkers!.filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i);
      // Finally we make sure to recalculate the distance between each of all the points and the actual location of the user, in addition MAINLY to ORDERING them by proximity.
      uniquePoints = getNearbyPoints([userLocation?.latitude!, userLocation?.longitude!], uniquePoints as PointInterface[], 100000);
      // Please note that in this function only we use 100000 as the "search radius" to ensure that we are not discriminating against any marker and to get
      // the total distance of each marker from the actual location of the user.
      setMarkers(uniquePoints);
    } else {
      if (radiusOfSearch < 5) {
        toast.show({ message: 'No se encontraron resultados. Intenta desplazarte hacia otra área o aumentar el radio de busqueda.', type: 'error' });
      } else {
        toast.show({ message: 'No se encontraron resultados. Intenta desplazarte hacia otra área.', type: 'error' });
      }
    }
  };

  /**
   * Set the current marker/point in the BottomModalSheet
   * @param point marker
   */
  const onPressMarker = (point: PointInterface, mode?: PointDisplayMode) => {
    // TODO: increase gorhom library to 4.4.3 to fix expand() method of bottomSheet, in case of markers mode list.
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

  /**
   * Expand the bottomSheet.
   */
  const onPressShowMore = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  /**
   * Collapse the bottomSheet.
   */
  const onPressShowLess = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  /**
   * Makes the tab selected by the user visible.
   * @param tab In case the modal is binomial.
   */
  const onPressTab = (tab: TabItem) => {
    if (tab.id) {
      setTabSelected(parseInt(tab.id, 10));
    }
  };

  /**
   * It is used to manage the view mode (map and list) of the markers.
   */
  const [pointDisplayMode, setPointDisplayMode] = useState<PointDisplayMode>('map');

  /**
   * Shows markers in list mode.
   */
  const onPressSeeList = () => {
    setVisibleSearchByAreaButton(false);
    bottomSheetRef.current?.close();
    setPointDisplayMode('list');
  };

  /**
   * Shows markers in map mode.
   */
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

  /**
   * Shows details screen (to activate or deactivate the simbology and the search radius slider).
   */
  const onPressShowDetails = () => {
    bottomSheetRef.current?.close();
    navigate('ShowDetails');
  };

  /**
   * Shows filters screen.
   */
  const onPressShowFilters = () => {
    bottomSheetRef.current?.close();
    navigate('BranchesFilters', route.params ? route.params : undefined);
  };

  /**
   * Event to detect when the region has been changed either by the user or by the app.
   * @param r Current Region. Contains latitude and longitude for the central point in the screen.
   * @param d Details. Notice if the movement is caused by the user gestures or programatically by the app.
   */
  const onChangeRegionComplete = (r: Region, d: Details) => {
    // console.log('Cambia region de busqueda', r, d);
    if (d.isGesture) {
      setVisibleSearchByAreaButton(true);
      setSearchArea({ latitude: r.latitude, longitude: r.longitude });
    }

    // Details: contain if the movement is by gestures or not.
    // Region: contain de center coordinates of screen.
  };

  /**
   * Event to detect when the region change is happening.
   */
  const onRegionChange = () => {
    // console.log('Cambia region:', r, d);
    if (visibleSearchByAreaButton) {
      setVisibleSearchByAreaButton(false);
    }
  };

  /**
   * Sets the delta latitude and delta longitud based on search radius. This allows the user to view all the points when the search radius increases, that means it will zoom out.
   * @param km search radius, expressed in kilometers.
   */
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
        markers={finalMarkers!}
        onChangeRegionComplete={onChangeRegionComplete}
        onChangeSearchOfRadius={onChangeSearchOfRadius}
        onPressMarker={onPressMarker}
        onPressOut={handleClosePress}
        onPressSeeList={onPressSeeList}
        onPressSeeMap={onPressSeeMap}
        onPressShowDetails={onPressShowDetails}
        onPressShowFilters={onPressShowFilters}
        onRegionChange={onRegionChange}
        onSearchMarkersByArea={onSearchMarkersByArea}
        permissions={permissions}
        pointDisplayMode={pointDisplayMode}
        visibleSearchByAreaButton={visibleSearchByAreaButton}
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
