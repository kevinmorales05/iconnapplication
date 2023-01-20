import { Container, PackCard } from 'components';
import React from 'react';
import Config from 'react-native-config';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView>
      <Container style={{ marginHorizontal: 16, marginTop: -15 }}>
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
    </SafeAreaView>
  );
};

export default RechargeAmountScreen;
