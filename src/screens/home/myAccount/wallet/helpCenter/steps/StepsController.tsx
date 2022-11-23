import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './StepsScreen';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
interface Props {

}

const StepsController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'HelpSteps'>>();
  const { params } = route;
  const questionId = params?.questionId;
  const toast = useToast();
  const [helpSteps, setHelpSteps] = useState([]);

  const qualifyResponse = async (qualification: string) => {
    try {
      console.log('qualification: ',qualification);
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  const fetchData = useCallback(async () => {
    const data = await vtexDocsServices.getHelpQuestionsStepsByQuestionsId('QS',questionId);
    setHelpSteps(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <HelpItemsScreen stepsData={helpSteps} qualify={qualifyResponse}
      />
    </SafeArea>
  );
};

export default StepsController;
