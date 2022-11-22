import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import theme from 'components/theme/theme';
import { Container, CustomModal, CustomText } from 'components/atoms';

interface LoadingInterface {
  visible: boolean;
  message?: string;
  variant?: string;
}

const Loading: React.FC<LoadingInterface> = ({
  visible,
  message
}: LoadingInterface) => {
  const { modalBg, absoluteView } = styles;

  return (
    <CustomModal visible={visible}>
      <Container style={modalBg}>
        <Container center style={absoluteView}>
          <SafeAreaView />
        </Container>
        <Container flex middle>
          <ActivityIndicator size="large" />
          {message && (
            <Container style={{ marginTop: 8 }}>
              <CustomText
                text={message}
                textAlign="center"
                typography="h2"
                textColor={theme.fontColor.dark}
              />
              <SafeAreaView />
            </Container>
          )}
        </Container>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    width: '100%',
    height: '100%'
  },
  absoluteView: {
    position: 'absolute',
    left: 0,
    right: 0
  }
});

export type { LoadingInterface }
export { Loading };
