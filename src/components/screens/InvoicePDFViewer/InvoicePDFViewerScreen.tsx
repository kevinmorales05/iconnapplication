import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { Container, Touchable } from '../../atoms';
import Pdf from 'react-native-pdf';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';

interface Props {
  goBack: () => void;
  share: () => void;
  base64: string;
}

const InvoicePDFViewerScreen: React.FC<Props> = ({ goBack, base64 }) => {
  const source = { uri: `data:application/pdf;base64,${base64}` };

  const insets = useSafeAreaInsets();
  return (
    <Container flex useKeyboard>
      <Container style={{ marginTop: insets.top, paddingHorizontal: 16, marginBottom: 10 }} row space="between" center>
        <Touchable onPress={goBack} rounded>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Touchable>
        {/* // TODO: uncomment when sharing feature is required. */}
        {/* {Platform.OS === 'ios' ? (
          <Feather name="share" onPress={share} size={24} color="black" />
        ) : (
          <Feather name="share-2" onPress={share} size={24} color="black" />
        )} */}
      </Container>

      <ScrollView
        bounces={false}
        style={{ flex: 1 }}
        contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Container flex space="between" backgroundColor={theme.brandColor.iconn_background} style={{ paddingHorizontal: 16 }}>
          <Pdf source={source} style={styles.pdf} />
        </Container>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25
  },
  pdf: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  }
});

export default InvoicePDFViewerScreen;
