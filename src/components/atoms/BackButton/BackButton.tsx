import React from 'react';
import { Image } from 'react-native';
import { Touchable } from '../Touchable';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'utils/scaleMetrics';

const BackButton: React.FC<any> = () => {
  const { goBack } = useNavigation<any>();

  return (
    <Touchable onPress={() => goBack()}>
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
