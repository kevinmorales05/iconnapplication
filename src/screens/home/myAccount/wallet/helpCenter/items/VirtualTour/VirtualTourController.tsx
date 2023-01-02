import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ICONN_HELP_STEP1,
  ICONN_HELP_STEP2,
  ICONN_HELP_STEP3,
  ICONN_HELP_STEP4,
  ICONN_HELP_STEP5,
  ICONN_HELP_STEP6,
  ICONN_HELP_STEP7,
  ICONN_HELP_STEP8
} from 'assets/images';
import { HomeStackParams } from 'navigation/types';
import React from 'react';
import { ImageTour } from 'rtk/types/help.types';
import VirtualTourScreen from './VirtualTourScreen';

const VirtualTourController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'VirtualTour'>>();
  const { params } = route;

  const toNextStep = () => {
    navigate('VirtualTour', { step: params?.step + 1 });
  };

  const toPrevStep = () => {
    navigate('VirtualTour', { step: params?.step - 1 });
  };

  const toFinish = () => {
    navigate('HelpItems');
  };

  const imageList: ImageTour[] = [
    { image: ICONN_HELP_STEP1, name: '1', description: 'Personaliza tu experiencia de compra eligiendo cómo recibir tus productos.' },
    {
      image: ICONN_HELP_STEP2,
      name: '2',
      description: 'Puedes elegir entre envío a domicilio o recoger en sucursal.'
    },
    {
      image: ICONN_HELP_STEP3,
      name: '3',
      description: 'Para envío a domicilio, ingresa la dirección en donde será entregado tu pedido.'
    },
    {
      image: ICONN_HELP_STEP4,
      name: '4',
      description: 'También puedes elegir la tienda que preparará tu pedido.'
    },
    {
      image: ICONN_HELP_STEP5,
      name: '5',
      description: 'Para recoger en tienda, selecciona la sucursal disponible de tu preferencia.'
    },
    {
      image: ICONN_HELP_STEP6,
      name: '6',
      description: 'En tu canasta podrás ver todos los artículos que has seleccionado para comprar.'
    },
    {
      image: ICONN_HELP_STEP7,
      name: '7',
      description: 'Aquí podrás ver tus accesos rápidos a productos, gasolina, cupones y más.'
    },
    {
      image: ICONN_HELP_STEP8,
      name: '8',
      description: 'Descubre todo lo que te ofrece tu app a través de nuestro menú principal.'
    }
  ];
  return <VirtualTourScreen step={params?.step as number} imageList={imageList} toNextStep={toNextStep} toPrevStep={toPrevStep} toFinish={toFinish} />;
};

export default VirtualTourController;
