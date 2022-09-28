import React, { useEffect } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { useLoading, useToast } from 'context';
import { FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { ContactInformationScreen } from 'components';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';

const ContactInformationController: React.FC<any> = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const loader = useLoading();
  const dispatch = useAppDispatch();
  const { loading, invoicingPaymentMethodForSevenTicketList, invoicingStoreForSevenTicketList } = useAppSelector((state: RootState) => state.invoicing);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const onSubmit = async (fields: FieldValues) => {};

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <ContactInformationScreen onSubmit={onSubmit} goBack={goBack} user={user} />
    </SafeArea>
  );
};

export default ContactInformationController;
