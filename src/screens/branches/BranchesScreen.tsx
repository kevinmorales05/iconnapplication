import React from 'react';
import { ScrollView } from 'react-native';
import { Container, CustomMap, TextContainer } from 'components';
import { PointInterface } from 'rtk';

interface Props {
  markers: PointInterface[];
  onPressMarker: (marker: PointInterface) => void;
  permissions: {};
}

const BranchesScreen: React.FC<Props> = ({ markers, onPressMarker, permissions }) => {
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
          <CustomMap markers={markers} onPressMarker={onPressMarker} />
        </Container>
      </>
    </ScrollView>
  );
};

export default BranchesScreen;
