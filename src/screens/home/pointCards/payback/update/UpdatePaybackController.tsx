import React from 'react';
import UpdatePaybackScreen from './UpdatePaybackScreen';
import { RootState, useAppSelector } from 'rtk';
import { RouteProp, useRoute } from '@react-navigation/native';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { HomeStackParams } from 'navigation/types';
import { useToast } from 'context';

interface Props {}

const UpdatePaybackController: React.FC<Props> = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'UpdatePayback'>>();
  const { params } = route;
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { barcodeNumberToUpdate } = userFields;
    let paybackPointCardBody = { type: 'payback', userId: user.id, isActive: true, barCode: barcodeNumberToUpdate };
    try {
      if (barcodeNumberToUpdate.length == 13) {
        const response = await vtexDocsServices.updateDocByDocID('PC', params.cardIdToUpdate, paybackPointCardBody).then(cardSaved => {
          if (cardSaved) {

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

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <UpdatePaybackScreen onSubmit={onSubmit} paybackCardToUpdate={params.paybackCard} mode={'update'} cardId={params.cardId} />
    </SafeArea>
  );
};

export default UpdatePaybackController;
