import React, { useEffect, useState } from 'react';
import { Container, SafeArea, TextContainer} from 'components';
import theme from 'components/theme/theme';

import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { HomeStackParams } from 'navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TELCEL_LOGO } from 'assets/images';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarCheck from 'components/svgComponents/CalendarCheck';
import { HistoryServices } from 'rtk';
import { formatDate2 } from 'utils/functions';
import ReactNativeCalendarEvents from 'react-native-calendar-events';
import { useToast } from 'context';

const ConfirmPay: React.FC = () => {

  const route = useRoute<RouteProp<HomeStackParams, 'TicketPay'>>();

  const [service, setService] = useState<HistoryServices>();
  const [permiss, setPermiss] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if(route.params.service){
      setService(route.params.service)
    }
  }, [route.params]);

  useEffect(()=>{
    checkPermissionIos();
  }, []);

  const checkPermissionIos = () => {
    ReactNativeCalendarEvents.requestPermissions().then((res)=>{
      if(res === 'authorized'){
        setPermiss(true);
      }
    })
  }

  const createEvent = () => {
    if(permiss){
      const date = new Date();
      date.setHours(date.getHours() + 23);
      const newDate = new Date();
      newDate.setHours(newDate.getHours() + 24);
  
      ReactNativeCalendarEvents.saveEvent('Recarga Telcel',{
        calendarId: service?.reference + '',
        startDate: date.toISOString(),
        endDate: newDate.toISOString()
      }).then(() => {
        toast.show({
          message: 'Evento creado correctamente',
          type: 'success'
        });
      })
    } else {
      checkPermissionIos();
    }
  }

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <Container style={{alignItems: 'center', width: '100%', paddingHorizontal: moderateScale(16)}}>
        <Container style={styles.containerInfoPay}>
            <Container style={styles.containerImage}>
              <Image source={TELCEL_LOGO} style={styles.image} resizeMode='contain' />
            </Container>
            <Container style={styles.containerInfoText}>
              <TextContainer text='Convenio' typography='h5' textColor={theme.fontColor.placeholder}/>
              <TextContainer text="Telcel" marginTop={verticalScale(4)} typography="h5" /> 
              <TextContainer text='No. de referencia' typography='h5' marginTop={verticalScale(8)} textColor={theme.fontColor.placeholder}/>
              <TextContainer text={service ? service.reference : ''} typography="h5" marginTop={verticalScale(4)}/> 
            </Container>
        </Container>
        <TouchableOpacity style={styles.containerButton} onPress={createEvent} >
          <CalendarCheck size={moderateScale(24)} />
          <TextContainer text='Crear recordatorio de pago' typography='h4' marginLeft={moderateScale(6)} fontBold/>
        </TouchableOpacity>
        <Container width={'100%'}>
          <TextContainer marginTop={verticalScale(21)} text='Detalles de transacción' typography='h6' fontBold textAlign='left' />
        </Container>
        <Container style={styles.containerDetail}>
          <TextContainer text='Fecha y hora' typography='h5' textColor={theme.fontColor.placeholder}/>
          <TextContainer text={service ? formatDate2(new Date(service.date), 'PPpp') : ''} marginTop={verticalScale(8)} typography="h5" /> 
          <TextContainer text='Folio de operación' typography='h5' marginTop={verticalScale(18)} textColor={theme.fontColor.placeholder}/>
          <TextContainer text="9127398217301" typography="h5" marginTop={verticalScale(8)}/> 
        </Container>
        <Container width={'100%'}>
          <TextContainer marginTop={verticalScale(21)} text='Detalles de pago' typography='h6' fontBold textAlign='left' />
        </Container>
        <Container style={styles.containerExtraInfo}>
          <Container row width={'100%'} style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <TextContainer text='Importe' typography='h5' textColor={theme.fontColor.placeholder}/>
            <TextContainer text={`$${service ? service.amount : '0'}.00`} typography='h5'/>
          </Container>
          <Container row width={'100%'} style={{justifyContent: 'space-between', marginTop: moderateScale(16), alignItems: 'center'}}>
            <TextContainer text='Comisión' typography='h5' textColor={theme.fontColor.placeholder}/>
            <TextContainer text='$0.00' typography='h5'/>
          </Container>
          <Container row width={'100%'} style={{justifyContent: 'space-between', marginTop: moderateScale(16), alignItems: 'center'}}>
            <TextContainer text='Método de pago' typography='h5' textColor={theme.fontColor.placeholder}/>
            <TextContainer text='Saldo 7-Eleven' typography='h5'/>
          </Container>
          <Container row width={'100%'} style={{justifyContent: 'space-between', marginTop: moderateScale(16), alignItems: 'center'}}>
            <TextContainer text='No. de autorización' typography='h5' textColor={theme.fontColor.placeholder}/>
            <TextContainer text='689602' typography='h5'/>
          </Container>
          <Container row width={'100%'} style={{justifyContent: 'space-between', marginTop: moderateScale(16), alignItems: 'center'}}>
            <TextContainer text='No. de orden' typography='h5' textColor={theme.fontColor.placeholder}/>
            <TextContainer text='ICNN023ACB117513' typography='h5'/>
          </Container>
        </Container>
      </Container>
    </SafeArea>
  );
};

export default ConfirmPay;

const styles = StyleSheet.create({
  containerInfoPay: {
    width: '100%',
    backgroundColor: theme.brandColor.iconn_white,
    height: moderateScale(104),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(15)
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
  containerButton: {
    width: '100%',
    height: verticalScale(42),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: '#dadadb',
    marginTop: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
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
  },
  containerDetail: {
    width: '100%',
    backgroundColor: theme.brandColor.iconn_white,
    height: moderateScale(130),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(8)
  },
  containerExtraInfo: {
    width: '100%',
    backgroundColor: theme.brandColor.iconn_white,
    height: moderateScale(173),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(8)
  },
})
