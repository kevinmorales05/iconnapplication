import React, { useEffect, useState } from 'react';
import { Container, SafeArea, TextContainer} from 'components';
import theme from 'components/theme/theme';

import { packageRecharge } from '../../../common/demoServicesPay';
import { moderateScale } from 'utils/scaleMetrics';
import CardAmountRecharge from 'components/organisms/CardAmountRecharge';
import { ScrollView } from 'react-native-gesture-handler';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import OptionPayButton from 'components/organisms/OptionPayButton';
import { CREDIT_CARDS_ICON, MASTER_CARD, PAYPAL_LOGO, QR_CODE_ICON, SEVEN_MINI_LOGO, VISA } from 'assets/images';
import { citiWalletServices } from 'services/citi-wallet.services';
import { useLoading } from 'context';

const OptionsPay: React.FC = () => {

  const [ amountBalance, setAmountBalance] = useState<string>('0.00')
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();


  useEffect(()=>{
    getAmountBalance();
  }, []);

  const getAmountBalance = async () => {
    loader.show();
    const res = await citiWalletServices.getWalletBalance();
    if(res.responseCode === 2010){
      setAmountBalance(Number.parseFloat(res.data.actualBalance).toFixed(2));
    }
    loader.hide();
  }


  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <ScrollView>
        <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15), paddingTop: moderateScale(10) }}>
          <TouchableOpacity onPress={goBack}>
            <OptionPayButton text='Saldo 7-Eleven' amount={amountBalance} image={SEVEN_MINI_LOGO} />
          </TouchableOpacity>
          <OptionPayButton text='Citibanamex **** 1234' image={MASTER_CARD} />
          <OptionPayButton text='BBVA **** 5678' image={VISA} />
          <TextContainer text='Agregar método de pago' fontSize={moderateScale(16)} fontBold marginTop={moderateScale(32)} />
          <OptionPayButton text='Pagar en tienda' image={QR_CODE_ICON} />
          <OptionPayButton text='Tarjeta de crédito o débito' image={CREDIT_CARDS_ICON} icon />
          <OptionPayButton text='PayPal' image={PAYPAL_LOGO} icon />
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

export default OptionsPay;
