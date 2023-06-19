import React from 'react';
import { Button, Container, SafeArea, TextContainer} from 'components';
import theme from 'components/theme/theme';

import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { ScrollView } from 'react-native-gesture-handler';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { SEVEN_MINI_LOGO, TELCEL_LOGO } from 'assets/images';
import { Image, StyleSheet } from 'react-native';
import { HistoryServices, RootState, WalletFav, setFavs, setHistory, useAppDispatch, useAppSelector } from 'rtk';
import { useLoading } from 'context';
import { citiWalletServices } from 'services/citi-wallet.services';

const ConfirmPay: React.FC = () => {

  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { amountOfRecharge, numberRecharge, tagName, history, favs } = useAppSelector((state: RootState) => state.wallet);
  const loader = useLoading();

  const payService = async () => {
      loader.show();
      const res = await citiWalletServices.payServiceRecharge();
      if(res.responseCode === 206){
        const tem: WalletFav = {
          tagName: tagName ? tagName : '',
          company: 'TELCEL',
          reference: numberRecharge ? numberRecharge : ''
        }
        let temFavs: WalletFav[] = [];
        const hisTem: HistoryServices = {
          amount: amountOfRecharge,
          company: 'Telcel',
          date: new Date(),
          reference: numberRecharge
        }
        if(favs){
          if(favs.length){
            const find = favs.find((itm) => itm.reference === tem.reference);
            if(!find?.reference){
              temFavs = favs.concat([tem]);
            } else {
              temFavs = favs.concat([]);
            }
          } else {
            temFavs.push(tem);
          }
        } else {
          temFavs.push(tem);
        }
        const temHis: HistoryServices[] = history ? history.concat([hisTem]) : [hisTem];
        dispatch(setFavs(temFavs));
        dispatch(setHistory(temHis));
        navigate('SuccesPay');
      }
      loader.hide();
    }
  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <ScrollView>
        <Container style={styles.containerInfoPay}>
            <Container style={styles.containerImage}>
              <Image source={TELCEL_LOGO} style={styles.image} resizeMode='contain' />
            </Container>
            <Container style={styles.containerInfoText}>
              <TextContainer text="Telcel" typography="h5" /> 
              <TextContainer text={numberRecharge ? numberRecharge : ''} typography="h5" marginTop={moderateScale(8)}/> 
            </Container>
        </Container>
        <Container style={styles.containerSchedule}>
          <TextContainer text="Resumen" fontBold typography="h6" marginTop={moderateScale(24)}/> 
          <Container row style={{justifyContent: 'space-between', width: '100%', marginTop: moderateScale(16)}} >
            <TextContainer text="Importe" typography="h5" /> 
            <TextContainer text={`$${amountOfRecharge ? amountOfRecharge : ''}.00`} typography="h5" /> 
          </Container>
          <Container row style={{justifyContent: 'space-between', width: '100%', marginTop: moderateScale(8)}} >
            <TextContainer text="Comisión" typography="h5" /> 
            <TextContainer text="$0.00" typography="h5" /> 
          </Container>
          <TextContainer text="Método de pago" fontBold typography="h6" marginTop={moderateScale(44)}/> 
          <Container row style={{alignItems: 'center', width: '100%', marginTop: moderateScale(10)}} >
            <Image source={SEVEN_MINI_LOGO} resizeMode='contain' style={{width: moderateScale(32), height: moderateScale(32)}} /> 
            <TextContainer text="Saldo 7-Eleven" typography="h5" marginHorizontal={moderateScale(8)} /> 
          </Container>
        </Container>
        <Container style={styles.containerPay}>
          <Container row style={{justifyContent: 'space-between', alignItems: 'center',width: '100%', marginTop: moderateScale(28)}} >
            <TextContainer text="Total a pagar:" typography="h5" /> 
            <TextContainer text={`$${amountOfRecharge ? (Number.parseFloat(amountOfRecharge)).toFixed(2) : ''}`} fontBold typography="h3" /> 
          </Container>
          <Container style={{marginTop: verticalScale(24)}}>
                <Button
                    length="long"
                    fontSize="h5"
                    round
                    fontBold
                    disabled={false}
                    onPress={payService}
                    borderColor={'iconn_green_original'}
                    style={{
                        width: '100%',
                        backgroundColor: theme.brandColor.iconn_green_original,
                        height: verticalScale(48),
                        borderRadius: moderateScale(12)
                    }}
                    >
                    Pagar
                </Button>
            </Container>
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

export default ConfirmPay;

const styles = StyleSheet.create({
  containerInfoPay: {
    width: '100%',
    backgroundColor: theme.brandColor.iconn_background,
    height: moderateScale(90),
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(16),
  },
  containerImage: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(8),
    backgroundColor: theme.brandColor.iconn_white
  },
  image: {
    width: '100%',
    height: '100%'
  },
  containerInfoText: {
    marginLeft: moderateScale(16),
    justifyContent: 'center'
  },
  containerSchedule: {
    paddingHorizontal: moderateScale(16),
    height: verticalScale(342)
  },
  containerPay: {
    paddingHorizontal: moderateScale(16),
    height: verticalScale(129),
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    shadowColor: theme.brandColor.iconn_accent_secondary,
    shadowOpacity: .3,
    shadowBlur: 6,
    borderTopWidth: 1,
    borderTopColor: 'white'
  }
})
