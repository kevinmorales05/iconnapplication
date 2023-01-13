import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationMenuItem, Container } from 'components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface LegalScreenProps {}

const WhoWeAreScreen: React.FC<LegalScreenProps> = ({openPage}) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={{ marginHorizontal: 8 }}>
        <NavigationMenuItem
          text="Seven Eleven"
          disable={false}
          onPressNavigateTo={() => {
            openPage('https://7-eleven.com.mx/nuestra-empresa/quienes-somos/');

          }}
        />
        <NavigationMenuItem
          text="Petro-7"
          disable={false}
          onPressNavigateTo={() => {
            openPage('https://www.petro-7.com.mx/nosotros/');
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default WhoWeAreScreen;
