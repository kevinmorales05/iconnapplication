import React from 'react';
import { BranchesStackParams } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState, setAppVisibleSearchByDistance, setAppVisibleStoreSymbology, useAppDispatch, useAppSelector } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import ShowDetailsScreen from './ShowDetailsScreen';
import { logEvent } from 'utils/analytics';

const ShowDetailsController: React.FC<any> = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<BranchesStackParams>>();
  const dispatch = useAppDispatch();
  const { visibleStoreSymbology, visibleSearchByDistance } = useAppSelector((state: RootState) => state.app);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const onValueSearchByDistanceChange = (v: boolean) => {
    dispatch(setAppVisibleSearchByDistance({ visibleSearchByDistance: v }));
    logEvent("sucDistanceSearch", {
      id: user.id,
      description: "Encender mostrar búsqueda por distancia",
      state: v === true ? "ON" : "OFF"
    })
  };

  const onValueStoresSimbologyChange = (v: boolean) => {
    dispatch(setAppVisibleStoreSymbology({ visibleStoreSymbology: v }));
    logEvent("sucShowDetailAnnotations", {
      id: user.id,
      description: "Encender mostrar cuadro de notaciones",
      state: v === true ? "ON" : "OFF"
    })
  };

  return (
    <ShowDetailsScreen
      goBack={goBack}
      isSearchByDistanceEnabled={visibleSearchByDistance!}
      isStoreSimbologyEnabled={visibleStoreSymbology!}
      onValueSearchByDistanceChange={onValueSearchByDistanceChange}
      onValueStoresSimbologyChange={onValueStoresSimbologyChange}
    />
  );
};

export default ShowDetailsController;
