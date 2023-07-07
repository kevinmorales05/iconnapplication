import React from 'react';
import { Image } from 'react-native';
import { Touchable } from '../Touchable';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { moderateScale } from 'utils/scaleMetrics';
import { setAmountOfRecharge, setNumberRecharge, setTagName, useAppDispatch } from 'rtk';

interface Props {
  isReset?: boolean;
  navigation?: any;
}

const BackButton: React.FC<Props> = ({isReset, navigation}) => {
  const { goBack } = useNavigation<any>();
  const dispatch = useAppDispatch();

  const resetStack = () => {
    dispatch(setTagName(''));
    dispatch(setNumberRecharge(''));
    dispatch(setAmountOfRecharge(''));
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'Home',
          },
          {
            name: 'HomeServices'
          }
        ]
      })
    );

  }
  return (
    <Touchable onPress={() => isReset ? resetStack() : goBack()}>
      <Image
        style={{
          width: moderateScale(24),
          height: moderateScale(24),
          marginLeft: moderateScale(-8)
        }}
        source={require('../../../assets/images/back-button/left_arrow.png')}
      />
    </Touchable>
  );
};

export default BackButton;
