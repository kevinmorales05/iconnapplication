import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationMenuItem, Container } from 'components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface AboutUsScreenProps {}

const AboutUsScreen: React.FC<AboutUsScreenProps> = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={{ marginHorizontal: 8 }}>
        <NavigationMenuItem
          text="Acerca de la APP"
          disable={false}
          onPressNavigateTo={() => {
            console.log('Acerca de la APP...');
          }}
        />
        <NavigationMenuItem
          text="Legal"
          disable={false}
          onPressNavigateTo={() => {
            navigate('Legal')
          }}
        />
        <NavigationMenuItem
          text="Contáctanos por correo electrónico"
          disable={false}
          onPressNavigateTo={() => {
            console.log('Contáctanos por correo electrónico...');
          }}
        />
        <NavigationMenuItem
          text="7-Eleven.com.mx"
          disable={false}
          onPressNavigateTo={() => {
            console.log('7-Eleven.com.mx...');
          }}
        />

        <NavigationMenuItem
          text="Petro-7.com.mx"
          disable={false}
          onPressNavigateTo={() => {
            console.log('Petro-7.com.mx...');
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default AboutUsScreen;
