import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CardBilling, TaxInfoCard, AnnounceItem, CardAction } from 'components';
import theme from 'components/theme/theme';
import { InvoicingProfileInterface } from 'rtk';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  onSubmit: () => void;  
}

const InvoiceTicketSevenScreen: React.FC<Props> = ({ onSubmit }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16
      }}
    >
    
    </ScrollView>
  );
};

export default InvoiceTicketSevenScreen;
