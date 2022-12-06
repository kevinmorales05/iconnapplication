import React, { useState, useEffect, useCallback } from 'react';
import QuestionsScreen from './QuestionsScreen';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { RootState, useAppSelector } from 'rtk';
interface Props {
  
}

const QuestionsController: React.FC<Props> = ({  }) => {
  const { helpCenterModules } = useAppSelector((state: RootState) => state.helpCenterModules);
  const route = useRoute<RouteProp<HomeStackParams, 'HelpQuestions'>>();
  const { params } = route;
  const moduleId = params?.moduleId;
  const [helpQuestions, setHelpQuestions] = useState([]);

  const fetchData = useCallback(async () => {
    let questions = [];
    for (let i = 0; i < helpCenterModules.length; i++) {
      if (helpCenterModules[i].id == moduleId) {
        questions = helpCenterModules[i].questions;
      }
    }
    setHelpQuestions(questions);
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
