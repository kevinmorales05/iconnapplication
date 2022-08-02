import { AnnounceItem, Button, CardAction, Container, InfoCard, TaxInfoCard } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  addRFC: () => void;
}

const TaxInfoScreen: React.FC<Props> = ({ addRFC }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom,
        paddingTop: 14
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <InfoCard text="No tienes datos fiscales guardados." type="no-data" />
      <InfoCard text="No podemos cargar la información,\n revisa tu conexión a intenta mas tarde." />
      <Container style={{ marginTop: 12 }}>
        <CardAction
          text="Historial de Facturas"
          onPress={() => {}}
          icon={<AntDesign name="copy1" size={25} color={theme.brandColor.iconn_accent_secondary} />}
        />
      </Container>
      <Container>
        <AnnounceItem
          message="Verifica tu correo para facturar"
          icon={<AntDesign name="warning" size={25} color={theme.brandColor.iconn_white} />}
        ></AnnounceItem>
      </Container>
      <Container flex>
        <TaxInfoCard rfc="RAPA880105P32" name="Alejandra Ramírez Pedroza" isDefault onPress={() => {}} />
        <TaxInfoCard rfc="MAAM890518UR6" name="Mariano Martinez Apolinar" onPress={() => {}} />
      </Container>
      <Container>
        <Button length="long" round disabled={false} onPress={addRFC} fontSize="h3" fontBold>
          + Agregar RFC
        </Button>
      </Container>
    </ScrollView>
  );
};

export default TaxInfoScreen;
