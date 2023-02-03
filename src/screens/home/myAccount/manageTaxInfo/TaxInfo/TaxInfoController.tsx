import React, { useCallback, useEffect } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import TaxInfoScreen from './TaxInfoScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import theme from 'components/theme/theme';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { getInvoicingProfileListThunk } from 'rtk/thunks/invoicing.thunks';
import { useLoading } from 'context';
import { logEvent } from 'utils/analytics';

const TaxInfoController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading: invoicingLoading, invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const loader = useLoading();
  const dispatch = useAppDispatch();

  const goToAddRFC = () => {
    navigate('AddRFC');
    logEvent('invCreateInvoicingProfile', {
      id: user.id,
      description: 'Crear perfil de facturación'
    });
  };

  useEffect(() => {
    if (invoicingLoading === false) loader.hide();
  }, [invoicingLoading]);

  /**
   * Load Invocing Profile List and store it in the redux store.
   */
  const fetchInvoicingProfileList = useCallback(async () => {
    loader.show();
    await dispatch(getInvoicingProfileListThunk(user.userId!));
  }, []);

  /**
   * We get the invoicing profile list just if there isn`t any profile.
   */
  useEffect(() => {
    if (user.userId && invoicingProfileList.length === 0) fetchInvoicingProfileList();
  }, [fetchInvoicingProfileList]);

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <TaxInfoScreen invoicingProfileList={invoicingProfileList} addRFC={goToAddRFC} />
    </SafeArea>
  );
};

export default TaxInfoController;
