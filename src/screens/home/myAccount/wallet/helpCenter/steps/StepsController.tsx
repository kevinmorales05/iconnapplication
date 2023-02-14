import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './StepsScreen';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { useAppSelector, RootState } from 'rtk';
import { ICON_HELPSADSMILE, ICON_HELPHAPPYSMILE, ICON_HELPVERYHAPPYSMILE } from 'assets/images';
import { helpCenterServices } from 'services/helpCenter.services';
import { logEvent } from 'utils/analytics';

interface Props {}

const StepsController: React.FC<Props> = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'HelpSteps'>>();
  const { params } = route;
  const questionId = params?.questionId;
  const toast = useToast();
  const [helpSteps, setHelpSteps] = useState([]);
  const [isQualified, setIsQualified] = useState(false);
  const [qualificationStatus, setQualificationStatus] = useState([
    { img: ICON_HELPSADSMILE, isQualified: false, qualificationValue: 0, color: theme.brandColor.iconn_red_original },
    { img: ICON_HELPHAPPYSMILE, isQualified: false, qualificationValue: 5, color: theme.brandColor.iconn_orange_original },
    { img: ICON_HELPVERYHAPPYSMILE, isQualified: false, qualificationValue: 10, color: theme.brandColor.iconn_green_original }
  ]);

  const qualify = (qualification: number) => {
    logEvent('accRateInformation', {
      id: user.id,
      description: 'Calificar información de respuesta',
      questionId: questionId
    });
    try {
      const newQualification = {
        questions_cats_id: questionId,
        qualification: qualification,
        user_id: user.userId
      };
      helpCenterServices.qualifyByQuestionId(newQualification).then(() => {
        toast.show({
          message: 'La pregunta ha sido calificada con éxito.',
          type: 'success'
        });
      });
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  const updateQualify = async (qualification: number) => {
    try {
      const qualificationStatusTem = qualificationStatus.concat([]);
      const toUpdate = {
        qualification: qualification,
        user_id: user.userId
      };
      await helpCenterServices.updateQualificationByQuestionId(toUpdate, questionId).then(async updatedQualificationResponse => {
        if (updatedQualificationResponse) {
          toast.show({
            message: 'La calificación de la pregunta ha sido actualizada con éxito.',
            type: 'success'
          });

          for (let i = 0; i < qualificationStatusTem.length; i++) {
            if (qualificationStatusTem[i].qualificationValue == qualification) {
              qualificationStatusTem[i].isQualified = true;
            } else {
              qualificationStatusTem[i].isQualified = false;
            }
          }
          setQualificationStatus(qualificationStatusTem);
        }
      });
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const qualificationStatusTem = qualificationStatus.concat([]);
      let received;
      await helpCenterServices.getStepsListByQuestionId(parseInt(questionId)).then(async stepsResponse => {
        if (stepsResponse && stepsResponse.data.length > 0) {
          setHelpSteps(stepsResponse.data);
        }
      });

      await helpCenterServices.getQualificationByQuestionIdAndUserId(parseInt(questionId), user.userId).then(async qualificationReceived => {
        if (qualificationReceived) {
          received = qualificationReceived;
        }
      });

      if (received != undefined) {
        if (received.responseCode == 416) {
          for (let i = 0; i < qualificationStatusTem.length; i++) {
            if (qualificationStatusTem[i].qualificationValue == received.data.qualification) {
              qualificationStatusTem[i].isQualified = true;
              setIsQualified(true);
            }
          }
          setQualificationStatus(qualificationStatusTem);
        }
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
        qualificationState={qualificationStatus}
        isQualified={isQualified}
        question={params?.question}
      />
    </SafeArea>
  );
};

export default StepsController;
