import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EvaluateServiceInterface, TicketValidInterfece } from 'components/types/StepsWallet';
import { useToast } from 'context';
import moment from 'moment';
import { EvaluateStackParams } from 'navigation/types/EvaluateStackParams';
import React, { useEffect, useState } from 'react';
import { InvoicingPetroTicketRequestInterface, InvoicingSevenTicketRequestInterface } from 'rtk';
import { evaluatedServices, invoicingServices } from 'services';
import { formatDate } from 'utils/functions';
import StepOneScreen from './StepOneScreen';

interface Props {
  barcode: string;
}

const StepOneController: React.FC<Props> = ({ barcode }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<EvaluateStackParams>>();
  const toast = useToast();
  const [barcodeProp, setBarcodeProp] = useState<string>('');

  useEffect(() => {
    if (barcode) {
      setBarcodeProp(barcode);
    }
  }, [barcode]);

  const onPressScan = () => { 
    navigate('CodeReader', { navigationDestiny: 'EvaluateStack' });
  };

  const onSubmit = async (data: EvaluateServiceInterface) => {
    let requestData: TicketValidInterfece;
    let requestDataInvoicing: InvoicingPetroTicketRequestInterface | InvoicingSevenTicketRequestInterface;
    if (data.establishment_id === 1) {
      requestData = {
        establishment_id: data.establishment_id,
        ticket: `${data.station}|${data.folio}|${data.webid}|${data.date}`
      };
      requestDataInvoicing = {
        establishment: data.establishment_id,
        folio: data.folio,
        webId: data.webid,
        station: data.station,
        date: formatDate(moment(data.date, 'DD/MM/YYYY').toDate(), "yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
      };
    } else if (data.establishment_id === 2) {
      requestData = {
        establishment_id: data.establishment_id,
        ticket: data.ticket
      };
      requestDataInvoicing = {
        establishment: data.establishment_id,
        ticket: data.ticket
      };
    }
    const responseFirstEvaluation = await invoicingServices.getTicket(requestDataInvoicing);
    if (responseFirstEvaluation.responseCode === 57 || responseFirstEvaluation.responseCode === 595 || responseFirstEvaluation.responseCode === 580) {
      const responseSecondEvaluation = await evaluatedServices.getTicketValid(requestData);
      if (responseSecondEvaluation.data?.isValid) {
        navigate('StepTwo', { dataParam: requestData });
      } else {
        // ticket ya evaluado
        toast.show({
          message: 'Ticket ya calificado.',
          type: 'error'
        });
      }
    } else {
      //ticket no encontrado
      toast.show({
        message: 'Ticket no encontrado.',
        type: 'error'
      });
    }
  };

  return <StepOneScreen onSubmit={onSubmit} onPressScan={onPressScan} barcodeProp={barcodeProp} />;
};

export default StepOneController;
