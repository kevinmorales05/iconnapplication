import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import ContinueWithScreen from './ContinueWithScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';
import LinearGradient from 'react-native-linear-gradient';

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
    <ImageBackground source={ICONN_BACKGROUND_IMAGE} style={styles.backgroundImage}>
       <LinearGradient 
        colors={['#000000','#00000000', '#00000000', '#00000000', '#00000000', '#000000']} 
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{height : '100%', width : '100%', position:'absolute'}}>
      </LinearGradient>
      <SafeArea
        topSafeArea={false}
        bottomSafeArea={false}
        backgroundColor="transparent"
        barStyle='light'
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
