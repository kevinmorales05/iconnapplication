import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import InvoiceHistory from './InvoiceHistory';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';
import { useToast } from 'context';

import { useAppDispatch } from 'rtk';

const InvoiceHistoryController: React.FC = () => {
  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <InvoiceHistory />
    </SafeArea>
  );
};

export default InvoiceHistoryController;
