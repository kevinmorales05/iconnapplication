import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLoading } from 'context';
import { HomeStackParams } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { SuggestionInterface } from 'rtk';
import { ratingServices } from 'services/rating-services';
import RateOrderScreen from './RateOrderScreen';

const RateOrderController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'RateOrder'>>();
  const loader = useLoading();
  const { params } = route;
  const [pressedRating, setPressedRating] = useState<number>(0);
  const [improvementOptions, setImprovementOptions] = useState<SuggestionInterface[]>();
  const [wellDoneOptions, setWellDoneOptions] = useState<SuggestionInterface[]>();
  const [selectsPill, setSelectsPills] = useState<SuggestionInterface[]>([]);

  const findOptionSelect = (option: string) => {
    const temSelect: SuggestionInterface[] = selectsPill.concat([]);
    if (temSelect.length) {
      const idxFind = temSelect.findIndex(pillOption => pillOption.description === option);
      if (idxFind >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const onPressPill = (option: SuggestionInterface) => {
    const temSelect: SuggestionInterface[] = selectsPill.concat([]);
    if (temSelect.length) {
      const idxFind = temSelect.findIndex(pillOption => pillOption === option);
      if (idxFind >= 0) {
        temSelect.splice(idxFind, 1);
        setSelectsPills(temSelect);
      } else {
        temSelect.push(option);
        setSelectsPills(temSelect);
      }
    } else {
      temSelect.push(option);
      setSelectsPills(temSelect);
    }
  };

  const getSuggestions = async () => {
    const { data } = await ratingServices.getSuggestionList(1);
    setImprovementOptions(data);
    const { data: data2 } = await ratingServices.getSuggestionList(2);
    setWellDoneOptions(data2);
  };

  useEffect(() => {
    if (improvementOptions === undefined || wellDoneOptions === undefined) {
      loader.show();
    } else {
      loader.hide();
    }
    getSuggestions();
  }, []);

  const toComment = () => {
    navigate('CommentOrder', { rating: pressedRating, orderId: params.orderId, suggestions: selectsPill });
  };
  const onPressStar = (rating: number) => {
    setPressedRating(rating);
    setSelectsPills([]);
  };
  return (
    <RateOrderScreen
      selectsPill={selectsPill}
      onPressPill={onPressPill}
      findOptionSelect={findOptionSelect}
      onPressStar={onPressStar}
      pressedRating={pressedRating as number}
      toComment={toComment}
      wellDoneOptions={wellDoneOptions as SuggestionInterface}
      improvementsOptions={improvementOptions as SuggestionInterface}
    />
  );
};

export default RateOrderController;
