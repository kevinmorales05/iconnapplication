import React, { useCallback, useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { InvoicePDFViewerScreen } from 'components/screens/InvoicePDFViewer';
import { getInvoicePDFThunk } from 'rtk/thunks/invoicing.thunks';

const ViewInvoiceGeneratedSevenController: React.FC<any> = ({ route }) => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [Base64, setBase64] = useState<string>('');

  const fetchInvoice = useCallback(async () => {
    const { data } = await dispatch(
      getInvoicePDFThunk({ userId: user.user_id!, uuid: route.params ? route.params.invoiceGenerated.uuidInvoice : undefined })
    ).unwrap();
    setBase64(data.b64);
  }, []);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  const share = () => {
    // TODO: 'implement native sharing.'
    console.log('TODO: implement native sharing');
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      barStyle="dark"
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
    >
      <InvoicePDFViewerScreen goBack={goBack} share={share} base64={Base64} />
    </SafeArea>
  );
};

export default ViewInvoiceGeneratedSevenController;
