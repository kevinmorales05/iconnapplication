import React, { useState, useEffect, useCallback } from 'react';
import PreferredScreen from './PreferredScreen';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { vtexDocsServices } from 'services';
import { RootState, useAppSelector } from 'rtk';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';

interface Props {

}

const PreferredController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'Preferred'>>();
  const { params } = route;
  console.log('mostrar o agregar: '+params.addOrShow);
  console.log('id de tarjeta: '+params.cardNumberToShow);
  console.log('cardNumber de tarjeta: '+params.cardNumber);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [preferenteCardToUpdate, setPreferenteCardToUpdate] = useState(params.cardNumberToShow);
  const [preferenteCardToShow, setPreferenteCardToShow] = useState('');
  const [cardId, setCardId] = useState(params.cardNumberToShow);
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { cardNumber } = userFields
    console.log('cardNumber ',cardNumber);
    console.log('user.userId ',user.userId);
    let preferentePointCardBody = { type: 'preferente', userId: user.id, isActive: true, barCode: cardNumber };
    try {
      if (cardNumber.length == 18) {
        const response = vtexDocsServices.createDoc('PC', preferentePointCardBody).then(cardSaved => {
          console.log('.............');
          console.log(cardSaved);
          console.log('.............');
          if (cardSaved) {
            setPreferenteCardToUpdate(cardSaved.DocumentId);
          }
        });
      } else {
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    } finally {

    }
  };

  const deletePointCard = async () => {
    vtexDocsServices.deleteDocByDocID('PC', preferenteCardToUpdate);
  };

  useEffect(() => {
    //setCardId(params.cardNumberToShow);
  }, [preferenteCardToShow, params, cardId]);

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
        cardId={cardId}
      />
    </SafeArea>
  );
};

export default PreferredController;
