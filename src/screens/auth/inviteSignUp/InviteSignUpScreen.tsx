import { Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container } from 'components/atoms';
import { TextContainer, Button } from 'components/molecules';
import { ICONN_SIGNIN } from 'assets/images';

interface Props {
  onSubmit: () => void;
  goBack: () => void;
}

const InviteSignUpScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
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
        <TextContainer
        text='Disfruta de una experiencia completa'
        textAlign='center'
        typography='h2'
        fontBold
        marginTop={30}
        marginHorizontal={55}
        />
        <Container flex style={{marginTop: 45, alignItems: 'center', justifyContent:'center'}} >
            <Image source={ICONN_SIGNIN} style={{height:208, width: 193}} />
        </Container>
        <Button
        round
        fontBold
        fontSize='h4'
        marginTop={57}
        onPress={onSubmit}>
            Registrarme
        </Button>
        <Button
        round
        color='iconn_light_grey'
        fontBold
        fontSize='h4'
        fontColor='dark_grey'
        marginTop={16}
        onPress={goBack}>
            En otro momento
        </Button>
    </ScrollView>
  );
};

export default InviteSignUpScreen;