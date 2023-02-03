import React, { useEffect, useState } from 'react';
import { BranchesStackParams } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BranchesFiltersScreen from './BranchesFiltersScreen';
import { PointFilteringDetailInterface, RootState, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';

const BranchesFiltersController: React.FC<any> = ({ route }) => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<BranchesStackParams>>();
  const [filterObject, setFilterObject] = useState<PointFilteringDetailInterface>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (route?.params) {
      setFilterObject(route.params.filterObject);
    }
  }, [route?.params]);

  const setFiltering = (key: string, value: boolean) => {
    let newFilterObject: any = { ...filterObject, [key]: value };

    if (key === 'info_seven' && value) {
      newFilterObject = { ...newFilterObject, info_petro: false };
      newFilterObject = { ...newFilterObject, info_binomial: false };
    } else if (key === 'info_seven' && !value) {
      newFilterObject = { ...newFilterObject, info_petro: false };
    }

    if (key === 'info_petro' && value) {
      newFilterObject = { ...newFilterObject, info_seven: false };
      newFilterObject = { ...newFilterObject, info_binomial: false };
    } else if (key === 'info_petro' && !value) {
      newFilterObject = { ...newFilterObject, info_seven: false };
    }

    if (key === 'info_binomial' && value) {
      newFilterObject = { ...newFilterObject, info_seven: false };
      newFilterObject = { ...newFilterObject, info_petro: false };
    } else if (key === 'info_binomial' && !value) {
      newFilterObject = { ...newFilterObject, info_seven: false };
      newFilterObject = { ...newFilterObject, info_petro: false };
    }

    if (!value && key !== 'info_binomial' && key !== 'info_seven' && key !== 'info_petro') delete newFilterObject[key];

    if (Object.keys(newFilterObject).length === 0) newFilterObject = undefined;
    setFilterObject(newFilterObject);
    // console.log('newFilterObject mutado: ', JSON.stringify(newFilterObject, null, 3));

    if (value && key !== 'info_binomial' && key !== 'info_seven' && key !== 'info_petro') {
      logEvent('sucSelectedFilter', {
        id: user.id,
        description: 'Seleccionar filtro genérico según tipo de filtro y con identificador del filtro',
        filterId: key,
        filterName: value
      });
    }
  };

  const cleanFilters = () => {
    setFilterObject(undefined);
  };

  const showResults = () => {
    // console.log('el objeto para la busqueda es: ', JSON.stringify(filterObject, null, 3));
    navigate('Branches', { filterObject: filterObject! });
  };

  return (
    <BranchesFiltersScreen cleanFilters={cleanFilters} filterObject={filterObject!} goBack={goBack} setFiltering={setFiltering} showResults={showResults} />
  );
};

export default BranchesFiltersController;
