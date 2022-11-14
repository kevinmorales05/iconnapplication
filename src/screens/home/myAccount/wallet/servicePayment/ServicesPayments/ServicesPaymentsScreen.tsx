import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, CardImage, Touchable, Container } from 'components';
import { ServicePaymentInterface } from 'rtk';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from 'components/theme/theme';

interface Props {
  onSubmit: (servicePayment: ServicePaymentInterface) => void;
  servicePaymentList: ServicePaymentInterface[];
  onPressQuestionButton: () => void;
}

const ServicesPaymentsScreen: React.FC<Props> = ({ onSubmit, servicePaymentList, onPressQuestionButton }) => {
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
      <TextContainer typography="paragraph" text="Paga tus servicios en caja más rápido." marginTop={23} marginBottom={16} />

      <Container flex={1} row style={{ flexWrap: 'wrap' }}>
        {servicePaymentList &&
          servicePaymentList.map((service, i) => <CardImage key={i} servicePayment={service} onPress={() => onSubmit(service)} position={i} />)}
      </Container>

      <Container row center crossCenter>
        <Touchable onPress={onPressQuestionButton} marginTop={8}>
          <MaterialIcons name="help" size={24} color={theme.brandColor.iconn_green_original} style={{ alignSelf: 'center' }} />
        </Touchable>
        <TextContainer typography="paragraph" text="Más información." marginTop={8} marginLeft={4} />
      </Container>
    </ScrollView>
  );
};

export default ServicesPaymentsScreen;
