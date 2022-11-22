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
import { RootState,useAppSelector } from 'rtk';
import { authServices } from 'services';
import Config from 'react-native-config';

interface Props {
  onPressClose: () => void;
  visible: boolean;
  productId: string;
  userUpdated: (productId: string, udpated: boolean) => void;
}

const AdultAgeVerificationScreen: React.FC<Props> = ({ onPressClose, visible, productId, userUpdated }) => {
  const { AGE_VERIFICATION_URL } = Config;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const insets = useSafeAreaInsets();

  const updateUserAgeStatus = (async (adultStatus) => {
    console.log(adultStatus);
    if (user.userId) {
      console.log('user.userId:::',user.userId);
      let id = ''+user.userId;
      await authServices.getProfile(user.email).then(async profileReceived => {
        if(profileReceived){
          if(profileReceived.length>0){
            // TODO: relocate entity name to .ENV
            await vtexDocsServices.updateDocByDocIDForAgeStatus('CL', profileReceived[0].id, { isAdult: adultStatus })
            .then(async updatedDoc => {
              console.log(updatedDoc);
              if (!adultStatus) {
                Linking.openURL(AGE_VERIFICATION_URL!);
                onPressClose();
              } else {
                userUpdated(productId,true);
              }
            }).catch((error) => console.log(error))
          }
        }
      });
    }
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
              <Container center>
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
                  <Container style={{
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
                    <Container row style={{ marginLeft: 7, width: '100%' }}>
                      <Container center space='around' style={{ marginLeft: 7, width: '10%' }}>
                        <Octicons name="info" size={24} color={theme.fontColor.dark} />
                      </Container>
                      <Container style={{ width: '90%' }}>
                        <Container style={{ width: '98%', marginLeft: 8 }}>
                          <TextContainer
                            text="Al momento de la entrega de los productos se te pedirá tu identificación oficial para corroborar tu mayoría de edad."
                            fontSize={12}
                            numberOfLines={3}
                            marginRight={4}
                          ></TextContainer>
                        </Container>
                      </Container>
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
