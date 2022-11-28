import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Container, TextContainer } from 'components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

interface Props {
  onPressAskPermission: () => void;
  permissions: {};
}

const BranchesScreen: React.FC<Props> = ({ onPressAskPermission, permissions }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom
      }}
    >
      <TextContainer typography="paragraph" text={JSON.stringify(permissions, null, 3)} marginTop={23} marginBottom={16} />
      <Button onPress={onPressAskPermission}>Permiso</Button>

      <Container flex>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default BranchesScreen;
