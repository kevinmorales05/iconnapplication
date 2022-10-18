import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, TextContainer } from 'components';
import { CustomModal } from '../../../components/atoms';
import { ActionButton } from '../../../components/atoms';
import Octicons from 'react-native-vector-icons/Octicons';
import { vtexDocsServices } from 'services';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  onPressClose: () => void;
  visible: boolean
}

const AdultAgeVerificationScreen: React.FC<Props> = ({ visible, onPressClose }) => {
  const insets = useSafeAreaInsets();
  const updateUserAgeStatus = (async (adultStatus) => {
    await vtexDocsServices.updateDocByDocIDForAgeStatus('CL', '1f15b210-4bf8-11ed-83ab-125ddee16d89', { isAdult: adultStatus })
      .then(async updatedDoc => {
        console.log(updatedDoc);
        if (!adultStatus) {
          Linking.openURL('https://www.alcoholinformate.org.mx/');
        }
      }).catch((error) => console.log(error))
  });

  const { containerStyle } = styles;

  return (
    <CustomModal visible={visible} onDismiss={onPressClose} animationType="slide">
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
            <Container />
            <Container>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text='Verifica tu edad' typography="h3" fontBold />
            </Container>
            <Container>
              <ActionButton
                style={{ marginTop: -6, shadowColor: 'none' }}
                size="xxsmall"
                onPress={onPressClose}
                color="white"
                icon={
                  <Ionicons
                    name="close"
                    size={24}
                    color={theme.fontColor.dark_grey}
                  />
                }

              />
            </Container>
          </Container>
          <ScrollView
            bounces={false}
            contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Container flex>
              <Container>
                <Container space="between" style={{ width: '95%' }}>
                  <Container>
                    <TextContainer
                      text="Para prevenir la venta de alcohol a menores de edad, te pedimos contestar con responsabilidad."
                      fontSize={14}
                      marginTop={15}
                      textAlign="justify"
                      marginBottom={8}
                    ></TextContainer>
                  </Container>
                  <Container style={{ marginTop: 20 }}>
                    <Button
                      length="long"
                      fontColor='light_green'
                      fontSize="h5"
                      round
                      fontBold
                      onPress={() => updateUserAgeStatus(false)

                      }
                      style={{ marginBottom: 5, backgroundColor: theme.brandColor.iconn_white, height: 50, borderRadius: 10 }}
                    >
                      Tengo menos de 18 años
                    </Button>
                  </Container>
                  <Container style={{ marginTop: 10 }}>
                    <Button
                      length="long"
                      fontSize="h5"
                      round
                      fontBold
                      onPress={() => updateUserAgeStatus(true)}
                      style={{ marginBottom: 5, backgroundColor: theme.brandColor.iconn_green_original, height: 50, borderRadius: 10 }}
                    >
                      Confirmo que tengo 18 años o más
                    </Button>
                  </Container>
                  <Container row space='between' style={{
                    borderLeftColor: '#f3d449',
                    borderRightColor: '#f3d449',
                    borderBottomColor: '#f3d449',
                    borderTopColor: '#f3d449',
                    borderWidth: 1,
                    marginTop: 20,
                    marginBottom: 0,
                    backgroundColor: '#fffaed',
                    borderRadius: 8,
                    paddingVertical: 15
                  }}>
                    <Container center space='around' style={{ marginLeft: 6, width: '10%' }}>
                      <Octicons name="info" size={24} color={theme.fontColor.dark} />
                    </Container>
                    <Container center space='around' style={{ width: '90%' }}>
                      <TextContainer
                        text="Al momento de la entrega de los productos se te pedirá tu identificación oficial para corroborar tu mayoría de edad."
                        fontSize={12}
                        textAlign="justify"
                        numberOfLines={3}
                        marginRight={10}
                      ></TextContainer>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </ScrollView>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16,
    maxHeight: '80%'
  }
});

export default AdultAgeVerificationScreen;
