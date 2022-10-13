import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceHistory from './InvoiceHistory';

const InvoiceHistoryController: React.FC = () => {
  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea={true} barStyle="dark">
      <InvoiceHistory />
    </SafeArea>
  );
};

export default InvoiceHistoryController;
