import React, { useEffect } from 'react';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextContainer } from 'components/molecules';

interface Props {
  questionsData: [];
  moduleId: string;
}

const QuestionsScreen: React.FC<Props> = ({ questionsData, moduleId }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  useEffect(() => {}, []);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%', height: '100%' }}>
      <Container style={{ marginLeft: 10 }}>
        {questionsData.length > 0 ? (
          questionsData.map(question => {
            return (
              <NavigationMenuItem
                text={question.question}
                disable={false}
                icon={<MaterialCommunityIcons style={{ textAlign: 'center' }} size={24} name="comment-question-outline" color={theme.fontColor.dark} />}
                onPressNavigateTo={() => {
                  navigate('HelpSteps', { moduleId: moduleId, questionId: question.questionId, question: question.question });
                }}
              />
            );
          })
        ) : (
          <Container center>
            <Container center style={{ width: '70%', height: '100%', marginTop: 100 }}>
              <MaterialCommunityIcons size={60} name="alert" color={theme.fontColor.grey} />
              <TextContainer text="Información no disponible por el momento. Disculpe las molestias" textColor={theme.fontColor.grey}></TextContainer>
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default QuestionsScreen;
