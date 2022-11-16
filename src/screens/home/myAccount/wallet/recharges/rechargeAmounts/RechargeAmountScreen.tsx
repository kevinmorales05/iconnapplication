import { Container, PackCard, SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { RechargeAmount, RechargeSupplier } from 'rtk';

interface Props {
  suppliersAmounts: RechargeAmount[];
  supplier: RechargeSupplier;
  onPressAmount: (id: string) => void;
}

const RechargeAmountScreen: React.FC<Props> = ({ suppliersAmounts, supplier, onPressAmount }) => {
  return (
    <SafeArea backgroundColor={theme.brandColor.iconn_grey_background}>
      <Container style={{ marginTop: 16.5 }}>
        <FlatList
          data={suppliersAmounts}
          renderItem={({ item, index }) => (
            <PackCard onPress={onPressAmount} parentImage={supplier.imageURL} amount={item} key={index} isSelect={item.isSelected as boolean} />
          )}
        />
      </Container>
    </SafeArea>
  );
};

export default RechargeAmountScreen;
