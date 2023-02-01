import React, { useEffect } from 'react';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextContainer } from 'components/molecules';
import { RootState, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';

interface Props {
  questionsData: [];
  moduleId: string;
}

const QuestionsScreen: React.FC<Props> = ({ questionsData, moduleId }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {}, []);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%', height: '100%' }}>
      <Container style={{ marginLeft: 10 }}>
        {questionsData.length > 0 ? (
          questionsData.map((question, index) => {
            return (
              <NavigationMenuItem
                key={index + 'nav'}
                text={question.description}
                disable={false}
                icon={<MaterialCommunityIcons style={{ textAlign: 'center' }} size={24} name="comment-question-outline" color={theme.fontColor.dark} />}
                onPressNavigateTo={() => {
                  navigate('HelpSteps', { moduleId: moduleId, questionId: question.questions_cats_id, question: question.description });
                  logEvent('accOpenQuestion', {
                    id: user.id,
                    description: 'Calificar información de respuesta',
                    questionId: question.questions_cats_id
                  });
                }}
              />
            );
          })
        ) : (
          <Container center>
            <Container center style={{ width: '70%', height: '100%', marginTop: 100 }}>
              <MaterialCommunityIcons size={60} name="alert" color={theme.fontColor.grey} />
              <TextContainer text="Información no disponible por el momento. Disculpe las molestias" textColor={theme.fontColor.grey} />
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default QuestionsScreen;
