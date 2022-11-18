import React, { useState } from 'react';
import PaybackScreen from './PaybackScreen';
import { RootState, useAppSelector } from 'rtk';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {}

const PaybackController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'Payback'>>();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { params } = route;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [paybackCardToUpdate, setPaybackCardToUpdate] = useState(params.cardId);
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { barcodeNumber } = userFields;
    let paybackPointCardBody = { type: 'payback', userId: user.id, isActive: true, barCode: barcodeNumber };
    try {
      if (barcodeNumber.length == 13) {
        const cardSaved = await vtexDocsServices.createDoc('PC', paybackPointCardBody);
        if (cardSaved) {
          //
          setPaybackCardToUpdate(cardSaved.DocumentId);
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
    await vtexDocsServices.deleteDocByDocID('PC', paybackCardToUpdate);
  };

  const onPressScan = () => {
    navigate('CodeReader', { navigationDestiny: 'Payback' });
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PaybackScreen
        onPressScan={onPressScan}
        addOrShow={params.addOrShow}
        cardNumberToShow={params.cardNumber}
        onSubmit={onSubmit}
        deleteCard={deletePointCard}
        cardToUpdate={paybackCardToUpdate}
        cardId={params.cardId}
        barcodeFromScan={params.ticket}
      />
    </SafeArea>
  );
};

export default PaybackController;
