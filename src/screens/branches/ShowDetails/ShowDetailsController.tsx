import React from 'react';
import { BranchesStackParams } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState, setAppVisibleSearchByDistance, setAppVisibleStoreSymbology, useAppDispatch, useAppSelector } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import ShowDetailsScreen from './ShowDetailsScreen';

const ShowDetailsController: React.FC<any> = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<BranchesStackParams>>();
  const dispatch = useAppDispatch();
  const { visibleStoreSymbology, visibleSearchByDistance } = useAppSelector((state: RootState) => state.app);

  const onValueSearchByDistanceChange = (v: boolean) => {
    dispatch(setAppVisibleSearchByDistance({ visibleSearchByDistance: v }));
  };

  const onValueStoresSimbologyChange = (v: boolean) => {
    dispatch(setAppVisibleStoreSymbology({ visibleStoreSymbology: v }));
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
