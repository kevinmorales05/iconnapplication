import React, { useEffect } from 'react';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useToast, useAlert } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  questionsData: [];
}

const QuestionsScreen: React.FC<Props> = ({ questionsData }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const alert = useAlert();

  useEffect(() => {
  }, []);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%' , height:'100%'}} >
      {questionsData.length > 0 ? (
        questionsData.map(question => {
          return (
            <NavigationMenuItem
              text={question.question}
              disable={false}
              icon={
                <MaterialCommunityIcons
                  style={{ textAlign: 'center' }}
                  size={24}
                  name="comment-question-outline"
                  color={theme.fontColor.dark}
                />
              }
              onPressNavigateTo={() => {
                navigate('HelpSteps', { questionId: question.id, question: question.question });
              }}
            />
          );
        })
      ) : (
        <></>
      )}
    </Container>
  );
};

export default QuestionsScreen;