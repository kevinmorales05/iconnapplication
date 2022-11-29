import React from 'react';
import { ScrollView } from 'react-native';
import { Container, CustomMap, TextContainer } from 'components';

interface Props {
  onPress: () => void;
  permissions: {};
}

const BranchesScreen: React.FC<Props> = ({ permissions }) => {
  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      <>
        <TextContainer typography="paragraph" text={JSON.stringify(permissions)} marginTop={23} marginBottom={16} />
        <Container flex>
          <CustomMap />
        </Container>
      </>
    </ScrollView>
  );
};

export default BranchesScreen;
