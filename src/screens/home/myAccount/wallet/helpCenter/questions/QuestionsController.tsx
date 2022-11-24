import React, { useState, useEffect, useCallback } from 'react';
import QuestionsScreen from './QuestionsScreen';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
interface Props {
  
}

const QuestionsController: React.FC<Props> = ({  }) => {
  const route = useRoute<RouteProp<HomeStackParams, 'HelpQuestions'>>();
  const { params } = route;
  const moduleId = params?.moduleId;
  const [helpQuestions, setHelpQuestions] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await vtexDocsServices.getHelpModuleQuestionsByModuleId('HQ',moduleId);
    setHelpQuestions(data);
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
      <QuestionsScreen questionsData = {helpQuestions} moduleId={moduleId}
      />
    </SafeArea>
  );
};

export default QuestionsController;
