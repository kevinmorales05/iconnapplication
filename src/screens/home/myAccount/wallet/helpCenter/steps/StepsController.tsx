import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './StepsScreen';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { useAppSelector, RootState, useAppDispatch } from 'rtk';
import { ICON_HELPSADSMILE, ICON_HELPHAPPYSMILE, ICON_HELPVERYHAPPYSMILE } from 'assets/images';
import { setModules } from 'rtk/slices/helpCenterSlice';
interface Props {}

const StepsController: React.FC<Props> = () => {
  const { helpCenterModules } = useAppSelector((state: RootState) => state.helpCenterModules);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'HelpSteps'>>();
  const { params } = route;
  const questionId = params?.questionId;
  const moduleId = params?.moduleId;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [helpSteps, setHelpSteps] = useState([]);
  const [stepIdSaved, setStepIdSaved] = useState('');
  const [stepReceived, setStepReceived] = useState(undefined);
  const [isQualified, setIsQualified] = useState(false);
  const [qualificationStatus, setQualificationStatus] = useState([
    { img: ICON_HELPSADSMILE, isQualified: false, qualificationValue: 0, color: theme.brandColor.iconn_red_original },
    { img: ICON_HELPHAPPYSMILE, isQualified: false, qualificationValue: 5, color: theme.brandColor.iconn_orange_original },
    { img: ICON_HELPVERYHAPPYSMILE, isQualified: false, qualificationValue: 10, color: theme.brandColor.iconn_green_original }
  ]);

  const updateReduxQualification = async (moduleId: string, questionId: string, qualification: number) => {
    let modules = [];
    for (let m = 0; m < helpCenterModules.length; m++) {
      let quests = [];
      for (let q = 0; q < helpCenterModules[m].questions.length; q++) {
        if (helpCenterModules[m].id == moduleId) {
          let ques = {
            moduleId: helpCenterModules[m].id,
            moduleName: helpCenterModules[m].questions[q].qualification.name,
            qualification:
              helpCenterModules[m].questions[q].questionId == questionId ? qualification : helpCenterModules[m].questions[q].qualification.qualification,
            questionId: helpCenterModules[m].questions[q].qualification.questionId,
            userId: helpCenterModules[m].questions[q].qualification.userId,
            id: helpCenterModules[m].questions[q].qualification.id
          };

          let question = {
            moduleId: helpCenterModules[m].id,
            questionId: helpCenterModules[m].questions[q].questionId,
            question: helpCenterModules[m].questions[q].question,
            steps: helpCenterModules[m].questions[q].steps,
            qualification: ques
          };
          quests.push(question);
        } else {
          let ques = {
            moduleId: helpCenterModules[m].id,
            moduleName: helpCenterModules[m].questions[q].qualification.name,
            qualification: helpCenterModules[m].questions[q].qualification.qualification,
            questionId: helpCenterModules[m].questions[q].qualification.questionId,
            userId: helpCenterModules[m].questions[q].qualification.userId,
            id: helpCenterModules[m].questions[q].qualification.id
          };

          let question = {
            moduleId: helpCenterModules[m].id,
            questionId: helpCenterModules[m].questions[q].questionId,
            question: helpCenterModules[m].questions[q].question,
            steps: helpCenterModules[m].questions[q].steps,
            qualification: ques
          };
          quests.push(question);
        }
      }

      let mod = {
        index: helpCenterModules[m].index,
        accountId: helpCenterModules[m].dataModule,
        description: helpCenterModules[m].description,
        id: helpCenterModules[m].id,
        name: helpCenterModules[m].name,
        icon: helpCenterModules[m].icon,
        questions: quests
      };
      modules.push(mod);
    }
    dispatch(setModules(modules));
  };

  const qualify = async (qualification: number) => {
    try {
      const newRecord = {
        questionId: questionId,
        userId: user.id,
        qualification: qualification,
        moduleId: moduleId
      };
      const data = await vtexDocsServices.createDoc('AQ', newRecord);
      toast.show({
        message: 'La pregunta ha sido calificada con éxito.',
        type: 'success'
      });
      setStepIdSaved(data.DocumentId);

      updateReduxQualification(moduleId, questionId, qualification);
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  const updateQualify = async (qualification: number) => {
    try {
      const toUpdate = {
        questionId: questionId,
        userId: user.id,
        qualification: qualification,
        moduleId: moduleId
      };
      await vtexDocsServices.updateDocByDocID('AQ', stepIdSaved, toUpdate);
      toast.show({
        message: 'La calificación de la pregunta ha sido actualizada con éxito.',
        type: 'success'
      });

      for (let i = 0; i < qualificationStatus.length; i++) {
        if (qualificationStatus[i].qualificationValue == qualification) {
          qualificationStatus[i].isQualified = true;
        } else {
          qualificationStatus[i].isQualified = false;
        }
      }
      setQualificationStatus(qualificationStatus);
      updateReduxQualification(moduleId, questionId, qualification);
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  const fetchData = useCallback(async () => {
    try {
      let steps = [];
      let qualificationReceived = {};
      let received;
      for (let m = 0; m < helpCenterModules.length; m++) {
        if (helpCenterModules[m].id == moduleId) {
          for (let q = 0; q < helpCenterModules[m].questions.length; q++) {
            if (helpCenterModules[m].questions[q].questionId == questionId) {
              steps = helpCenterModules[m].questions[q].steps;
              qualificationReceived = helpCenterModules[m].questions[q].qualification;

              setStepReceived(qualificationReceived);
              received = qualificationReceived;
            }
          }
        }
      }
      setHelpSteps(steps);

      if (received != undefined) {
        setStepIdSaved(received.id);
        for (let i = 0; i < qualificationStatus.length; i++) {
          if (qualificationStatus[i].qualificationValue == received.qualification) {
            qualificationStatus[i].isQualified = true;
            setIsQualified(true);
          }
        }
        setQualificationStatus(qualificationStatus);
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al obtener la calificación.\nIntenta más tarde.',
        type: 'error'
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, qualificationStatus]);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <HelpItemsScreen
        stepsData={helpSteps}
        qualify={qualify}
        updateQualify={updateQualify}
        stepReceived={stepReceived}
        qualificationState={qualificationStatus}
        isQualified={isQualified}
      />
    </SafeArea>
  );
};

export default StepsController;
