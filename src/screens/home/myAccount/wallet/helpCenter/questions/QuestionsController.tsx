import React, { useState, useEffect, useCallback } from 'react';
import QuestionsScreen from './QuestionsScreen';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { helpCenterServices } from 'services/helpCenter.services';
interface Props {}

const QuestionsController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'HelpQuestions'>>();
  const { params } = route;
  const moduleId = params?.moduleId;
  const [helpQuestions, setHelpQuestions] = useState([]);

  const fetchData = useCallback(async () => {
    await helpCenterServices.getQuestionsListByModuleId(moduleId).then(async questionsResponse => {
      if (questionsResponse && questionsResponse.data.length>0) {
        setHelpQuestions(questionsResponse.data);
      }
    });
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
      <QuestionsScreen questionsData={helpQuestions} moduleId={moduleId} />
    </SafeArea>
  );
};

export default QuestionsController;
