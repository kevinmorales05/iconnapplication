import { Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container } from 'components/atoms';
import { TextContainer, Button } from 'components/molecules';
import { ICONN_INVITE } from 'assets/images';

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
        text='Estamos trabajando para brindarte una mejor experiencia.'
        textAlign='center'
        typography='h2'
        fontBold
        marginTop={30}
        marginHorizontal={55}
        />
        <Container flex style={{marginTop: 45, alignItems: 'center', justifyContent:'center'}} >
            <Image source={ICONN_INVITE} style={{height:208, width: 193}} />
        </Container>
    </ScrollView>
  );
};

export default InviteSignUpScreen;