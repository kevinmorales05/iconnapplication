import React from 'react';
import UpdatePreferenteScreen from './UpdatePreferredScreen';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { vtexDocsServices } from 'services';
import { RootState, useAppSelector } from 'rtk';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { useToast } from 'context';
import { logEvent } from 'utils/analytics';

interface Props {}

const UpdatePreferredController: React.FC<Props> = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'UpdatePreferente'>>();
  const { params } = route;
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { cardNumberToUpdate } = userFields;
    let preferentePointCardBody = { type: 'preferente', userId: user.id, isActive: true, barCode: cardNumberToUpdate };
    try {
      if (cardNumberToUpdate.length == 18) {
        await vtexDocsServices.updateDocByDocID('PC', params.cardIdToUpdate, preferentePointCardBody);
        logEvent('walSaveCard', {
          id: user.id,
          description: 'Botón de editar un depósito',
          cardType: 'ICONN',
          cardId: params.cardIdToUpdate
        });
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <UpdatePreferenteScreen onSubmit={onSubmit} preferenteCardToUpdate={params.preferenteCard} mode={'update'} cardId={params.cardId} />
    </SafeArea>
  );
};

export default UpdatePreferredController;
