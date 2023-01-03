import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SuggestionInterface } from 'components/types/StepsWallet';
import { EvaluateStackParams } from 'navigation/types/EvaluateStackParams';
import React, { useEffect, useState } from 'react';
import { evaluatedServices } from 'services';
import StepThreeScreen from './StepThreeScreen';

const StepThreeController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<EvaluateStackParams>>();
  const route = useRoute<RouteProp<EvaluateStackParams, 'StepThree'>>();
  const { dataParam } = route.params;

  const [options, setOptions] = useState<SuggestionInterface[]>([]);

  const onSubmit = (sugestion: string[]) => {
    dataParam.suggestions = sugestion;
    navigate('StepFour', { dataParam: dataParam });
  };

  useEffect(() => {
    if (route.params.dataParam?.score) {
      getOptions();
    }
  }, [route.params]);

  const getOptions = async () => {
    const optionsResponse = await evaluatedServices.getSuggestions(dataParam.score > 3 ? 2 : 1);
    if (optionsResponse.responseCode === 398) {
      const optionsTem: SuggestionInterface[] = optionsResponse.data.map(option => {
        const tem: SuggestionInterface = {
          suggestions_cat_id: option.suggestions_cat_id,
          description: option.description
        };
        return tem;
      });
      setOptions(optionsTem);
    }
  };

  return <StepThreeScreen onSubmit={onSubmit} suggestions={options} isBad={dataParam.score < 4} />;
};

export default StepThreeController;
