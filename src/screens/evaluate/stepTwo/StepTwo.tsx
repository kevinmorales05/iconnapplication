import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EvaluateStackParams } from 'navigation/types/EvaluateStackParams';
import React from 'react';
import StepTwoScreen from './StepTwoScreen';

const StepTwoController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<EvaluateStackParams>>();
  const route = useRoute<RouteProp<EvaluateStackParams, 'StepTwo'>>();
  const { dataParam } = route.params;

  const onSubmit = (rating: number) => {
    dataParam.score = rating;
    navigate('StepThree', { dataParam: dataParam });
  };

  return <StepTwoScreen onSubmit={onSubmit} />;
};

export default StepTwoController;
