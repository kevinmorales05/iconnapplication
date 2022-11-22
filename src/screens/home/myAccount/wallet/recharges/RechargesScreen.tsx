import { Container, RechargeCard, SafeArea, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RechargeSupplier } from 'rtk';

interface Props {
  onPressHelp: () => void;
  onPressOperator: (supplierData: RechargeSupplier) => void;
  supplierList: RechargeSupplier[];
}

const RechargesScreen: React.FC<Props> = ({ onPressHelp, onPressOperator, supplierList }) => {
  return (
    <SafeArea backgroundColor={theme.brandColor.iconn_background}>
      <TextContainer textAlign="center" marginTop={23.5} marginBottom={24} text="Recarga más rápido el saldo de tu celular en caja." fontSize={14} />
      <FlatList
        data={supplierList}
        renderItem={({ item, index }) => <RechargeCard key={index} supplierImage={item.imageURL} onPressOperator={() => onPressOperator(item)} />}
        numColumns={2}
      />
      <Touchable onPress={onPressHelp}>
        <Container row crossCenter style={{ marginTop: 10, marginBottom: 10 }}>
          <AntDesign name="questioncircle" size={24} color={theme.brandColor.iconn_green_original} />
          <TextContainer text="Más información" fontSize={14} marginTop={3} marginLeft={4} />
        </Container>
      </Touchable>
    </SafeArea>
  );
};

export default RechargesScreen;
