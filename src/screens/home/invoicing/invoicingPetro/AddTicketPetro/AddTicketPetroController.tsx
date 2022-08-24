import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import AddTicketPetroScreen from './AddTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_PETRO_REFERENCE } from 'assets/images';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useLoading, useToast } from 'context';
import { addTicketPetroToList, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { getTicketThunk } from 'rtk/thunks/invoicing.thunks';
import { formatDate } from 'utils/functions';
import moment from 'moment';

const AddTicketPetroController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [helpVisible, setHelpVisible] = useState<boolean>(false);
  const toast = useToast();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.invoicing);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const manageGetTicketResponseCode = (responseCode: number): string => {
    switch (responseCode) {
      case 592:
        return 'El ticket no existe en el sistema.';
      case 580:
        return 'Ticket facturado anteriormente.';
      default:
        return 'unknown';
    }
  };

  // TODO: we need more petro tickets to test this.
  const onSubmit = async (fields: SubmitHandler<FieldValues>) => {
    const dateMomentObject = moment(fields.ticketDate, 'DD/MM/YYYY');
    const dateObject = dateMomentObject.toDate();
    loader.show();
    try {
      // establishment 1 = petro
      const response = await dispatch(
        getTicketThunk({
          establishment: 1,
          date: formatDate(dateObject, "yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
          folio: fields.folio,
          station: fields.station,
          webId: fields.webId
        })
      ).unwrap();
      if (response.responseCode === 57) {
        toast.show({ message: 'Ticket agregado correctamente.', type: 'success' });
        dispatch(addTicketPetroToList(response.data));
        navigate('InvoiceTicketPetro');
      } else {
        const errorMessage = manageGetTicketResponseCode(response.responseCode);
        if (errorMessage !== 'unknown') {
          toast.show({ message: errorMessage, type: 'error' });
          return;
        }
        console.log('un codigo nuevo en petro, agregalo!!! ===> ', response.responseCode);
        toast.show({ message: response.responseMessage, type: 'warning' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressHelpIcon = () => setHelpVisible(true);

  const onPressOut = () => setHelpVisible(false);

  const onPressScan = () => {
    console.log('onPressScan Petro...');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <AddTicketPetroScreen onSubmit={onSubmit} goBack={goBack} onPressQuestionButton={onPressHelpIcon} onPressScan={onPressScan} />
      <InvoicingHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        onUnderstood={onPressOut}
        message={`Puedes encontrar la estación, folio y el web ID\ndel ticket a facturar en tu comprobante físico.`}
        img={ICONN_INVOICING_PETRO_REFERENCE}
      />
    </SafeArea>
  );
};

export default AddTicketPetroController;
