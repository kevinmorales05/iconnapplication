import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import ContinueWithScreen from './ContinueWithScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ROAD } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';

const ContinueWithController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const onPressUnavailableItem = () => {
    // alert.show({
    //   title: t('global:sorry'),
    //   message: t('global:functionalityNotAvailable')
    // });
  };

  const onSubmit = (amount: number) => {
    // navigate('QrCode', { amount });
  };

  useEffect(() => {
    // doSomething();
    // doAnotherThing();
  }, []);

  return (
    <ImageBackground source={ROAD} style={styles.backgroundImage}>
      <SafeArea
        topSafeArea={false}
        bottomSafeArea={false}
        backgroundColor="transparent"
      >
        <ContinueWithScreen
          onPressFacebook={() => {}}
          onPressGoogle={() => {}}
          onPressEmail={() => {}}
          onPressOthers={() => {}}
        />
      </SafeArea>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default ContinueWithController;
