import { Button, Container, InfoCard, TaxInfoCard } from 'components';
import NetInfo from '@react-native-community/netinfo';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InvoicingProfileInterface } from 'rtk';

interface Props {
  addRFC: () => void;
  invoicingProfileList: InvoicingProfileInterface[];
}

const TaxInfoScreen: React.FC<Props> = ({ addRFC, invoicingProfileList }) => {
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(false);
  NetInfo.fetch().then(state => {
    if (state.isInternetReachable) {
      setIsOnline(true);
    }
  });

  const order = (a: any, b: any) => {
    return a < b ? -1 : a > b ? 1 : 0;
  };

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: 14
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Container>
          {!isOnline ? (
            <InfoCard text={`No podemos cargar la información,\n revisa tu conexión a intenta mas tarde.`} />
          ) : invoicingProfileList.length === 0 ? (
            <Container>
              <InfoCard text="No tienes datos fiscales guardados." type="no-data" />
            </Container>
          ) : (
            invoicingProfileList
              .map(function (profile, i) {
                return <TaxInfoCard key={i} rfc={profile.rfc} name={profile.business_name} isDefault={profile.default} onPress={() => {}} />;
              })
              .sort(order)
          )}
        </Container>
        <Container>
          <Button length="long" round disabled={!isOnline} onPress={addRFC} fontSize="h3" fontBold>
            + Agregar RFC
          </Button>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default TaxInfoScreen;
