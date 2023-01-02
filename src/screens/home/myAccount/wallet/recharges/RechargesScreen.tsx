import { Container, RechargeCard, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Platform } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RechargeSupplier } from 'rtk';

interface Props {
  onPressHelp: () => void;
  onPressOperator: (supplierData: RechargeSupplier) => void;
  supplierList: RechargeSupplier[];
}

const RechargesScreen: React.FC<Props> = ({ onPressHelp, onPressOperator, supplierList }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextContainer textAlign="center" marginTop={23.5} marginBottom={24} text="Recarga más rápido el saldo de tu celular en caja." fontSize={14} />
      <FlatList
        data={supplierList}
        renderItem={({ item, index }) => <RechargeCard key={index} supplierImage={item.imageURL} onPressOperator={() => onPressOperator(item)} />}
        numColumns={2}
      />
      <Touchable onPress={onPressHelp}>
        <Container row crossCenter style={{ marginTop: 10, marginBottom: 30 }}>
          <AntDesign name="questioncircle" size={24} color={theme.brandColor.iconn_green_original} />
          <TextContainer text="Más información" fontSize={14} marginTop={3} marginLeft={4} />
        </Container>
      </Touchable>
    </ScrollView>
  );
};

export default RechargesScreen;
