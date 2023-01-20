import { RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import { EvaluateStackParams } from 'navigation/types/EvaluateStackParams';
import React from 'react';
import { RootState, useAppSelector } from 'rtk';
import { evaluatedServices } from 'services';
import StepFourcreen from './StepFourScreen';

interface Props {
  navigation: any;
}

const StepFourController: React.FC<Props> = ({ navigation }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<EvaluateStackParams, 'StepFour'>>();
  const { dataParam } = route.params;

  const onSubmit = async (scoreApp: number, comments: string) => {
    let flagError: string = '';
    dataParam.score_app = scoreApp;
    dataParam.comment = comments;
    dataParam.user_id = user.userId;
    try {
      const res = await evaluatedServices.setEvaluation(dataParam);
      if (res.responseCode === 402) {
        flagError = 'success';
      } else {
        flagError = 'error';
      }
    } catch {
      flagError = 'error';
    } finally {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'Home',
              params: { screen: 'MyAccountScreen' }
            },
            {
              name: 'HelpItems',
              params: { flagError: flagError }
            }
          ]
        })
      );
    }
  };

  return <StepFourcreen onSubmit={onSubmit} />;
};

export default StepFourController;
