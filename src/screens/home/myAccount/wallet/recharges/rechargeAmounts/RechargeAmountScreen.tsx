import { Container, PackCard, SafeArea } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import Config from 'react-native-config';
import { FlatList } from 'react-native-gesture-handler';
import { RechargeAmount, RechargeSupplier, ServiceQRType } from 'rtk';

interface Props {
  suppliersAmounts?: RechargeAmount[];
  supplier?: RechargeSupplier;
  onPressAmount: (id: string) => void;
  rechargeUser?: ServiceQRType;
}

const RechargeAmountScreen: React.FC<Props> = ({ suppliersAmounts, supplier, onPressAmount, rechargeUser }) => {
  const { CATEGORIES_ASSETS } = Config;
  return (
    <SafeArea backgroundColor={theme.brandColor.iconn_grey_background}>
      <Container style={{ marginTop: 16.5 }}>
        <FlatList
          data={suppliersAmounts}
          renderItem={({ item, index }) => (
            <PackCard
              onPress={onPressAmount}
              parentImage={rechargeUser ? CATEGORIES_ASSETS + `${rechargeUser.supplierName}Logo.png` : (supplier?.imageURL as string)}
              amount={item}
              key={index}
              isSelect={item.isSelected as boolean}
            />
          )}
        />
      </Container>
    </SafeArea>
  );
};

export default RechargeAmountScreen;
