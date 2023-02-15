import React, { useEffect } from 'react';
import ContactUsScreen from './ContactUsScreen';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { ICON_CONCTACTUSBYPHONE, ICON_CONCTACTUSBYEMAIL, ICON_CONCTACTUSBYWHATSAPP } from 'assets/images';
import analytics from '@react-native-firebase/analytics';
import { RootState, useAppSelector } from 'rtk';

const ContactUsController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const contactUsValues = [
    { img: ICON_CONCTACTUSBYPHONE, mainText: 'Llama al 800 837 1100', description: 'Lun-Sáb: 7am-9pm / Dom: 8am-8pm' },
    { img: ICON_CONCTACTUSBYEMAIL, mainText: 'WhatsApp al 81 1234 5567', description: 'Lun-Sáb: 7am-9pm / Dom: 8am-8pm' },
    { img: ICON_CONCTACTUSBYWHATSAPP, mainText: 'Envía un correo electrónico', description: 'Responderemos lo antes posible.' }
  ];

  const onPressSendAnalyticst = async (analyticsName: string) => {
    if (analyticsName === 'call') {
      await analytics().logEvent('openCall', {
        id: user.id,
        description: 'Hacer llamada'
      });
    } else if (analyticsName === 'whatsapp') {
      await analytics().logEvent('openWhatsApp', {
        id: user.id,
        description: 'WhatsApp al 81 1234 5567'
      });
    } else if (analyticsName === 'email') {
      await analytics().logEvent('openSendAnEmail', {
        id: user.id,
        description: 'Enviar un email'
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <ContactUsScreen contactUsValues={contactUsValues} onPressSendAnalytics={onPressSendAnalyticst} />
    </SafeArea>
  );
};

export default ContactUsController;
