import React, { useState, useEffect } from 'react';
import PaybackScreen from './PaybackScreen';
import { RootState, useAppSelector } from 'rtk';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';

interface Props {

}

const PaybackController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'Payback'>>();
  const { params } = route;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [paybackCardToUpdate, setPaybackCardToUpdate] = useState(params.cardNumberToShow);
  const [preferenteCardToShow, setPreferenteCardToShow] = useState('');
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { barcodeNumber } = userFields;
    let paybackPointCardBody = { type: 'payback', userId: user.id, isActive: true, barCode: barcodeNumber };
    try {
      if (barcodeNumber.length == 13) {
        const response = vtexDocsServices.createDoc('PC', paybackPointCardBody).then(cardSaved => {
          if (cardSaved) {
            setPaybackCardToUpdate(cardSaved.DocumentId);
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
    vtexDocsServices.deleteDocByDocID('PC', paybackCardToUpdate);
  };

  useEffect(() => {
  }, [preferenteCardToShow]);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PaybackScreen
        addOrShow={params.addOrShow}
        cardNumberToShow={params.cardNumber}
        onSubmit={onSubmit}
        deleteCard={deletePointCard}
        cardToUpdate={paybackCardToUpdate}
        cardId={params.cardNumberToShow}
      />
    </SafeArea>
  );
};

export default PaybackController;
