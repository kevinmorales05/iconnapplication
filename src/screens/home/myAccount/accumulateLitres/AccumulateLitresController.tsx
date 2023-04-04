import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PROMO1, PROMO2, PROMO3 } from 'assets/images';
import { HomeStackParams } from 'navigation/types';
import React from 'react';
import { LitresPromoInterface } from 'rtk';
import AccumulateLitresScreen from './AccumulateLitresScreen';

const AccumulateLitresControlller: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const promos: LitresPromoInterface[] = [
    {
      id: '1',
      picture: PROMO1,
      name: 'Relleno de café GRATIS',
      expiry: '31/12/22',
      costLitres: 5
    },
    {
      id: '2',
      picture: PROMO2,
      name: '2 cafés GRATIS',
      expiry: '31/12/22',
      costLitres: 20
    },
    {
      id: '3',
      picture: PROMO3,
      name: 'Big bite clásico GRATIS',
      expiry: '31/12/22',
      costLitres: 9
    }
  ];

  const reclaimed: LitresPromoInterface[] = [
    {
      id: '1',
      picture: PROMO1,
      name: 'Relleno de café GRATIS',
      expiry: '31/12/22',
      costLitres: 5,
      status: 'ACTIVO'
    },
    {
      id: '2',
      picture: PROMO2,
      name: '2 cafés GRATIS',
      expiry: '31/12/22',
      costLitres: 20,
      status: 'REDIMIDO'
    },
    {
      id: '3',
      picture: PROMO3,
      name: 'Big bite clásico GRATIS',
      expiry: '31/12/22',
      costLitres: 9,
      status: 'EXPIRADO'
    }
  ];

  const onPressPromo = (promo: LitresPromoInterface) => {
    navigate('PromoDetailLitres', { promo: promo });
  };

  const onPressAdd = () => {
    navigate('AddTicketLitres');
  };

  return <AccumulateLitresScreen promos={promos} reclaimed={reclaimed} onPressDetail={onPressPromo} onPressAdd={onPressAdd} />;
};

export default AccumulateLitresControlller;
