import { PETRO_LOGO, SEVEN_LOGO } from 'assets/images';
import { Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { EvaluateServiceInterface } from 'components/types/StepsWallet';
import React, { useState } from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import StepOnePetro from '../stepOnePetro/StepOnePetro';
import StepOneSeven from '../stepOneSeven/StepOneSeven';

import styles from './styles';

interface Props {
  onSubmit: (data: EvaluateServiceInterface) => void;
  onPressScan: () => void;
  barcodeProp: string;
}

const StepOneScreen: React.FC<Props> = ({ onSubmit, onPressScan, barcodeProp }) => {
  const insets = useSafeAreaInsets();
  const [select, setSelect] = useState<string>('');

  const onPressButton = (option: string) => {
    setSelect(option);
  };

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: moderateScale(15),
        backgroundColor: theme.brandColor.iconn_white,
        alignItems: 'center'
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextContainer typography="h5" text={'1/4'} marginTop={verticalScale(30)} />
      <TextContainer
        textAlign="center"
        fontBold
        typography="h4"
        text={'¿De cuál establecimiento es el servicio que quieres evaluar?'}
        marginTop={verticalScale(30)}
      />
      <Container style={styles.containerLogos}>
        <TouchableOpacity onPress={() => onPressButton('seven')}>
          <Container style={select === 'seven' ? styles.containerLogoSelect : styles.containerLogo}>
            <Image style={styles.image} source={SEVEN_LOGO} resizeMode={'contain'} />
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressButton('petro')}>
          <Container style={select === 'petro' ? styles.containerLogoSelect : styles.containerLogo}>
            <Image style={styles.image} source={PETRO_LOGO} resizeMode={'contain'} />
          </Container>
        </TouchableOpacity>
      </Container>
      {select === 'seven' ? (
        <Container style={styles.containerOptions}>
          <StepOneSeven onSubmit={onSubmit} onPressScan={onPressScan} barcodeProp={barcodeProp} />
        </Container>
      ) : select === 'petro' ? (
        <Container style={styles.containerOptions}>
          <StepOnePetro onSubmit={onSubmit} />
        </Container>
      ) : null}
    </ScrollView>
  );
};

export default StepOneScreen;
