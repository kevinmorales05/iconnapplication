import { Button, Container, TaxInfoCard } from 'components';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
