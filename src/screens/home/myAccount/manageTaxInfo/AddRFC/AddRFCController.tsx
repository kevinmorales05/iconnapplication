import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useLoading, useToast } from 'context';
import { invoicingServices } from 'services';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { setInvoicingProfilesList } from 'rtk/slices/invoicingSlice';
import { InvoicingProfileInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';

const AddRFCController: React.FC = () => {
  const loader = useLoading();
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const dispatch = useAppDispatch();

  const onSubmit = async (invoiceProfile: any) => {
    loader.show();

    try {
      const data = await invoicingServices.registerInvoicingProfile(invoiceProfile);
      if (data.responseCode === 44) {
        toast.show({
          message: data.responseMessage,
          type: 'success'
        });
        const created = data.data as InvoicingProfileInterface;
        dispatch(setInvoicingProfilesList([...invoicingProfileList, created]));
        goBack();
      } else {
        toast.show({
          message: data.responseMessage,
          type: 'error'
        });
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos. \n Intenta mas tarde.',
        type: 'error'
      });
    } finally {
      loader.hide();
    }
  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <BillingScreen onSubmit={onSubmit} />
    </SafeArea>
  );
};

export default AddRFCController;
