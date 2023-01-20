import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import theme from 'components/theme/theme';
import { EvaluateStackParams } from 'navigation/types/EvaluateStackParams';
import StepOneController from 'screens/evaluate/stepOne/StepOneController';
import { BackButton } from 'components';
import StepTwoController from 'screens/evaluate/stepTwo/StepTwo';
import StepThreeController from 'screens/evaluate/stepThree/StepThreeController';
import StepFourController from 'screens/evaluate/stepFour/StepFourController';
import { HomeStackParams } from 'navigation/types';

const EvaluateStack: React.FC = () => {
  const Stack = createNativeStackNavigator<EvaluateStackParams>();
  const route = useRoute<RouteProp<HomeStackParams, 'EvaluateStack'>>();
  const [barcodeProp, setBarcodeProp] = useState<string>('');

  useEffect(() => {
    if (route.params?.ticket) {
      setBarcodeProp(route.params.ticket.ticketNo);
    }
  }, [route.params]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { color: 'black', fontWeight: 'bold' },
        headerTintColor: `${theme.brandColor.iconn_accent_secondary}`,
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        headerBackImageSource: require('../../../assets/images/back-button/left_arrow.png')
      }}
      id="EvaluateStack"
      initialRouteName="StepOne"
    >
      <Stack.Screen
        name="StepOne"
        initialParams={{ barcode: barcodeProp }}
        // eslint-disable-next-line react/no-children-prop
        children={() => <StepOneController barcode={barcodeProp} />}
        options={{
          headerTitle: 'Evalúa tu experiencia',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />
        }}
      />
      <Stack.Screen
        name="StepTwo"
        component={StepTwoController}
        options={{
          headerTitle: 'Evalúa tu experiencia',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />
        }}
      />
      <Stack.Screen
        name="StepThree"
        component={StepThreeController}
        options={{
          headerTitle: 'Evalúa tu experiencia',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />
        }}
      />
      <Stack.Screen
        name="StepFour"
        component={StepFourController}
        options={{
          headerTitle: 'Evalúa tu experiencia',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />
        }}
      />
    </Stack.Navigator>
  );
};

export default EvaluateStack;
