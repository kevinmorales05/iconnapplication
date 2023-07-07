import React, { useEffect, useRef, useState } from 'react';
import { Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import Share from 'react-native-share';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation, useFocusEffect, CommonActions, useIsFocused } from '@react-navigation/native';
import { BACKGROUND_SUCCESS } from 'assets/images';
import { Animated, Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ReceiptListSvg } from 'components/svgComponents/ReceiptListSvg';
import AnimatedLottieView from 'lottie-react-native';
import { ShareSvg } from 'components/svgComponents/ShareSvg';
import { DeleteSvg } from 'components/svgComponents/DeleteSvg';
import { RootState, setAmountOfRecharge, setNumberRecharge, setTagName, useAppDispatch, useAppSelector } from 'rtk';
import { HistoryServices } from 'rtk';
import { formatDate2 } from 'utils/functions';

interface Props {
  navigation: any;
}

const SuccesPay: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { amountOfRecharge, numberRecharge } = useAppSelector((state: RootState) => state.wallet);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const isFocused = useIsFocused();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(()=>{
    if(isFocused){
      setTimeout(()=>fadeIn(), 500);
      setTimeout(()=>setShowModal(true), 2200);
    }
  }, [isFocused]);

  const shareDoc = () => {
    Share.open({
      title: "This is my report ",
      message: "Message:",
      url: "https://www.africau.edu/images/default/sample.pdf",
      subject: "Report"
  })
  }

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

  const viewTicket = () => {
    setShowModal(false);
    const service: HistoryServices = {
      amount: amountOfRecharge,
      company: 'Telcel',
      date: new Date(),
      reference: numberRecharge
    }
    setTimeout(()=> navigate('TicketPay', {
      service: service
    }), 200);
  }

  return (
    <View
      style={styles.fadingContainer}
    >
      <LinearGradient
        colors={['#0ea37e', '#007456']}
        style={styles.containerBackGround}
      />
      <Animated.Image
        source={BACKGROUND_SUCCESS}
        resizeMode={'cover'}
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      />
      <Modal animationType='fade' visible={showModal} style={styles.fadingContainer} transparent>
        <Container style={styles.containerCenter}>
          <Container style={styles.containerModal}>
            <Container style={styles.containerInfo}>
              <AnimatedLottieView
                  style={{width:moderateScale(100), height:moderateScale(100)}}
                  source={require('../../../assets/files/success-payment.json')}
                  autoPlay
                  loop
              />
              <TextContainer text='Pago exitoso' typography='h2' marginTop={verticalScale(20)} fontBold/>
              <TextContainer text={`Tu pago de TAE Telcel se\ncompletó exitosamente`} typography='h6' marginTop={verticalScale(8)} textAlign='center'/>
              <TextContainer text={amountOfRecharge ? '$' + (Number.parseFloat(amountOfRecharge)).toFixed(2) : '$0.00'} marginTop={verticalScale(12)} typography='h2' fontBold/>
              <TextContainer text='Número de referencia' marginTop={verticalScale(16)} typography='h6' textColor={theme.fontColor.placeholder}/>
              <TextContainer text={numberRecharge ? numberRecharge : ''} marginTop={verticalScale(2)} typography='h5'/>
              <TouchableOpacity onPress={viewTicket}>
                <Container row style={{justifyContent: 'center', marginTop: moderateScale(23), alignItems: 'center'}}>
                  <ReceiptListSvg size={moderateScale(24)} />
                  <TextContainer text='Ver recibo' marginLeft={moderateScale(4)} marginTop={verticalScale(2)} typography='h5' fontBold textColor={theme.fontColor.link}/>
                </Container>
              </TouchableOpacity>
            </Container>
            <Container style={styles.containerExtraInfo}>
                <Container row width={'100%'} style={{justifyContent: 'space-between', marginTop: moderateScale(31), alignItems: 'center'}}>
                  <TextContainer text='Fecha y hora' typography='h6' textColor={theme.fontColor.placeholder}/>
                  <TextContainer text={formatDate2(new Date())} marginTop={verticalScale(2)} typography='h6'/>
                </Container>
                <Container row width={'100%'} style={{justifyContent: 'space-between', marginTop: moderateScale(12), alignItems: 'center'}}>
                  <TextContainer text='Folio de operación' typography='h6' textColor={theme.fontColor.placeholder}/>
                  <TextContainer text='9127398217301' marginTop={verticalScale(2)} typography='h6'/>
                </Container>
                <Container row width={'100%'} style={{justifyContent: 'space-between', marginTop: moderateScale(12), alignItems: 'center'}}>
                  <TextContainer text='Método de pago' typography='h6' textColor={theme.fontColor.placeholder}/>
                  <TextContainer text='Saldo 7-Eleven' marginTop={verticalScale(2)} typography='h6'/>
                </Container>
            </Container>
          </Container>
          <Container style={styles.leftBall}/>
          <Container style={styles.rightBall}/>
        </Container>
        <Container style={styles.containerIconsActions}>
          <TouchableOpacity onPress={shareDoc}>
            <ShareSvg size={moderateScale(24)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={resetStack} style={{marginLeft: moderateScale(16)}}>
            <DeleteSvg size={moderateScale(24)} />
          </TouchableOpacity>
        </Container>
      </Modal>
    </View>
  );
};

export default SuccesPay;

const styles = StyleSheet.create({
  containerBackGround: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  fadingContainer: {
    width: '100%',
    height: '100%'
  },
  containerModal: {
    width: moderateScale(296),
    height: verticalScale(433),
    borderRadius: moderateScale(8),
    backgroundColor: theme.brandColor.iconn_white,
    overflow: 'hidden'
  },
  containerCenter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10)
  },
  containerInfo: {
    width: '101%',
    height: verticalScale(309.5),
    borderColor: '#dadadb',
    borderWidth: 1,
    margin: -2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16)
  },
  leftBall: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    position: 'absolute',
    backgroundColor: '#ef7d00',
    top: verticalScale(417.5),
    left: moderateScale(20)
  },
  rightBall: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    position: 'absolute',
    backgroundColor: '#d72638',
    top: verticalScale(417.5),
    right: moderateScale(20)
  },
  containerExtraInfo: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16)
  },
  containerIconsActions: {
    position:'absolute',
    top:  theme.paddingHeader,
    right: moderateScale(16),
    flexDirection: 'row'
  }
})
