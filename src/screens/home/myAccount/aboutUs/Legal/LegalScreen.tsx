import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationMenuItem, Container } from 'components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface LegalScreenProps {}

const LegalScreen: React.FC<LegalScreenProps> = ({openPage}) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={{ marginHorizontal: 8 }}>
        <NavigationMenuItem
          text="Términos y Condiciones"
          disable={false}
          onPressNavigateTo={() => {
            openPage('https://oneiconn.myvtex.com/terminos-y-condiciones');

          }}
        />
        <NavigationMenuItem
          text="Aviso de privacidad"
          disable={false}
          onPressNavigateTo={() => {
            openPage('https://oneiconn.myvtex.com/aviso-de-privacidad');
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default LegalScreen;
