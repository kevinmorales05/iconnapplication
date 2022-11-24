import React, { useState, useEffect, useCallback } from 'react';
import ContactUsScreen from './ContactUsScreen';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { ICON_CONCTACTUSBYPHONE, ICON_CONCTACTUSBYEMAIL, ICON_CONCTACTUSBYWHATSAPP } from 'assets/images';
interface Props {}

const ContactUsController: React.FC<Props> = ({}) => {
  const [contactUsValues, setContactUsValues] = useState([
    { img: ICON_CONCTACTUSBYPHONE, mainText: 'Llama al 800 837 1100', description: 'Lun-Sáb: 7am-9pm / Dom: 8am-8pm' },
    { img: ICON_CONCTACTUSBYEMAIL, mainText: 'WhatsApp al 81 1234 5567', description: 'Lun-Sáb: 7am-9pm / Dom: 8am-8pm' },
    { img: ICON_CONCTACTUSBYWHATSAPP, mainText: 'Envía un correo electrónico', description: 'Responderemos lo antes posible.' }
  ]);

  useEffect(() => {}, []);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <ContactUsScreen contactUsValues={contactUsValues} />
    </SafeArea>
  );
};

export default ContactUsController;
