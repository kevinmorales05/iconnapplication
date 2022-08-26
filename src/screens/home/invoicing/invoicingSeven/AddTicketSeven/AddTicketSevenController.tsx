import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import AddTicketSevenScreen from './AddTicketSevenScreen';
import { useLoading, useToast } from 'context';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_SEVEN_REFERENCE } from 'assets/images';
import { addTicketSevenToList, InvoicingSevenTicketResponseInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { getTicketThunk } from 'rtk/thunks/invoicing.thunks';

const AddTicketSevenController: React.FC<any> = ({ route }) => {
  const [Ticket, setTicket] = useState<InvoicingSevenTicketResponseInterface>();
  const [Position, setPosition] = useState<number>();

  useEffect(() => {
    if (route?.params) {
      setTicket(route.params.ticket);
      setPosition(route.params.position);
    }
  }, []);

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

  const onSubmit = async (fields: SubmitHandler<FieldValues>) => {
    loader.show();
    try {
      const response = await dispatch(getTicketThunk({ establishment: 2, ticket: fields.barCode })).unwrap();
      if (response.responseCode === 595) {
        // TODO: We need avoid adding tickets with different store and payment method. We must add a filter based on getTicket response.
        toast.show({ message: 'Ticket agregado correctamente.', type: 'success' });
        dispatch(addTicketSevenToList(response.data));
        navigate('InvoiceTicketSeven');
      } else {
        const errorMessage = manageGetTicketResponseCode(response.responseCode);
        if (errorMessage !== 'unknown') {
          toast.show({ message: errorMessage, type: 'error' });
          return;
        }
        console.log('un codigo nuevo, agregalo!!! ===> ', response.responseCode);
        toast.show({ message: response.responseMessage, type: 'warning' });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressHelpIcon = () => {
    setHelpVisible(true);
  };

  const onPressOut = () => {
    setHelpVisible(false);
  };

  const onPressScan = () => {
    console.log('onPressScan...');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <AddTicketSevenScreen
        onSubmit={onSubmit}
        goBack={goBack}
        onPressScan={onPressScan}
        onPressQuestionButton={onPressHelpIcon}
        ticket={Ticket}
        position={Position}
      />
      <InvoicingHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        onUnderstood={onPressOut}
        message={`Puedes encontrar los 35 dígitos del código de\nbarras del ticket en tu comprobante físico.`}
        img={ICONN_INVOICING_SEVEN_REFERENCE}
      />
    </SafeArea>
  );
};

export default AddTicketSevenController;
