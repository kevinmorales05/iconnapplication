import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, TextContainer } from 'components';

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
        paddingBottom: insets.bottom + 16
      }}
    >
      <TextContainer typography="paragraph" text={JSON.stringify(permissions, null, 3)} marginTop={23} marginBottom={16} />
      <Button onPress={onPressAskPermission}>Permiso</Button>
    </ScrollView>
  );
};

export default BranchesScreen;
