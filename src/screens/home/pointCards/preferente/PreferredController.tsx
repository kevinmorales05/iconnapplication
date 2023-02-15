import React, { useState, useEffect } from 'react';
import PreferredScreen from './PreferredScreen';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { vtexDocsServices } from 'services';
import { RootState, useAppSelector } from 'rtk';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { logEvent } from 'utils/analytics';

interface Props {}

const PreferredController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'Preferred'>>();
  const { params } = route;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [preferenteCardToUpdate, setPreferenteCardToUpdate] = useState(params.cardId);
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { cardNumber } = userFields;
    let preferentePointCardBody = { type: 'preferente', userId: user.id, isActive: true, barCode: cardNumber };
    try {
      if (cardNumber.length == 18) {
        const cardSaved = await vtexDocsServices.createDoc('PC', preferentePointCardBody);
        if (cardSaved) {
          setPreferenteCardToUpdate(cardSaved.DocumentId);
          logEvent('walSaveCard', {
            id: user.id,
            description: 'Botón de editar un depósito',
            cardType: 'ICONN',
            cardId: cardSaved.Id
          });
        }
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  const deletePointCard = async () => {
    await vtexDocsServices.deleteDocByDocID('PC', preferenteCardToUpdate);
  };

  useEffect(() => {
    //setCardId(params.cardId);
  }, [params, params.cardId]);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PreferredScreen
        addOrShow={params.addOrShow}
        cardNumberToShow={params.cardNumber}
        onSubmit={onSubmit}
        deleteCard={deletePointCard}
        cardToUpdate={preferenteCardToUpdate}
        cardId={params.cardId}
        onPressSendAnalytics={logEvent}
      />
    </SafeArea>
  );
};

export default PreferredController;
