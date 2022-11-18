import React from 'react';
import UpdatePaybackScreen from './UpdatePaybackScreen';
import { RootState, useAppSelector } from 'rtk';
import { RouteProp, useRoute } from '@react-navigation/native';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { HomeStackParams } from 'navigation/types';
import { useToast } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {}

const UpdatePaybackController: React.FC<Props> = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'UpdatePayback'>>();
  const { params } = route;
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { barcodeNumberToUpdate } = userFields;
    let paybackPointCardBody = { type: 'payback', userId: user.id, isActive: true, barCode: barcodeNumberToUpdate };
    try {
      if (barcodeNumberToUpdate.length == 13) {
        await vtexDocsServices.updateDocByDocID('PC', params.cardIdToUpdate, paybackPointCardBody);
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    }
  };

  const onPressScan = () => {
    navigate('CodeReader', { navigationDestiny: 'UpdatePayback' });
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <UpdatePaybackScreen
        onPressScan={onPressScan}
        onSubmit={onSubmit}
        paybackCardToUpdate={params.paybackCard}
        mode={'update'}
        cardId={params.cardId}
        barcodeFromScan={params.ticket}
      />
    </SafeArea>
  );
};

export default UpdatePaybackController;
