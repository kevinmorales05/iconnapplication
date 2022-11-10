import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, CardImage } from 'components';
import { ServicePaymentInterface } from 'rtk';

interface Props {
  onSubmit: () => void;
  servicePaymentList: ServicePaymentInterface[];
}

const ServicePaymentScreen: React.FC<Props> = ({ onSubmit, servicePaymentList }) => {
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
      <TextContainer typography="paragraph" text="Paga tus servicios en caja más rápido." marginTop={23} marginBottom={8} />

      {servicePaymentList.map(service => {
        <CardImage image={service.image} onPress={onSubmit} />;
      })}

      <TextContainer
        typography="paragraph"
        text="Agrega los servicios deseados y te recordaremos las fechas de corte y próximos pagos."
        marginTop={23}
        marginBottom={8}
      />
    </ScrollView>
  );
};

export default ServicePaymentScreen;
