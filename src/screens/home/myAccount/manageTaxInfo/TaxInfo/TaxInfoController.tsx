import React, { useReducer } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import TaxInfoScreen from './TaxInfoScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import theme from 'components/theme/theme';
import { RootState, useAppSelector, useAppDispatch, InvoicingProfileInterface } from 'rtk';
import { useAlert } from 'context';
import { invoicingServices } from 'services';
import { setInvoicingProfilesList } from 'rtk/slices/invoicingSlice';
import { useWindowDimensions } from 'react-native';

const TaxInfoController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const goToAddRFC = () => navigate('AddRFC');

  const alert = useAlert();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const deleteInvoice = async (invoiceProfile: InvoicingProfileInterface) => {
    invoicingServices.deleteInvoicingProfile(invoiceProfile);
  };
  const showAlert = (invoiceProfile: InvoicingProfileInterface) => {
    alert.show({
      title: 'Eliminar perfil fiscal',
      message: 'Puedes registrarlo de nuevo en otro momento.',
      acceptTitle: 'Cancelar',
      cancelTitle: 'Eliminar',
      cancelOutline: 'iconn_error',
      cancelTextColor: 'iconn_error',
      onAccept() {
        alert.hide();
      }, 
      onCancel() {
        console.log('Invoice ID->>>', invoiceProfile.invoicing_profile_id);
        deleteInvoice(invoiceProfile);
        navigate('TaxInfo');
        alert.hide();
      },
    }, 'error');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <TaxInfoScreen invoicingProfileList={invoicingProfileList} addRFC={goToAddRFC} />
    </SafeArea>
  );
};

export default TaxInfoController;
