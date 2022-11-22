import { ICONN_CARD_PETRO, ICONN_CHECK_PWD, ICONN_INVOICING_GENERATED_INVOICE_SEVEN } from 'assets/images';
import { Container } from 'components/atoms';
import { Button, TextContainer } from 'components/molecules';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onSubmit: () => void;
  goBack: () => void;
}

const ChangedPasswordScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top
      }}
    >
        <Container flex style={{marginTop: 45, alignItems: 'center', justifyContent:'center'}} >
            <Image source={ICONN_CHECK_PWD} style={{height:50, width: 50}} />
        </Container>
        <TextContainer
        text='Contraseña actualizada exitosamente'
        textAlign='center'
        typography='h2'
        fontBold
        marginTop={30}
        marginHorizontal={55}
        />
         <TextContainer
        text='Tu contraseña para entrar a la App ICONN ha sido actualizada correctamente.'
        textAlign='center'
        typography='h5'
        marginTop={40}
        marginHorizontal={16}
        />
        <Button
        round
        fontBold
        fontSize='h4'
        marginTop={57}
        onPress={onSubmit}>
            Ir a inicio
        </Button>
        <Container row flex style={{marginTop: 45, alignItems: 'center', justifyContent:'center'}} >
            <Image source={ICONN_INVOICING_GENERATED_INVOICE_SEVEN} style={{height:41, width: 41.9, marginRight: 23.8}} resizeMode='contain' />
            <Image source={ICONN_CARD_PETRO} style={{height:34.9, width: 82.6}} resizeMode='contain' />
        </Container>
    </ScrollView>
  );
};

export default ChangedPasswordScreen;