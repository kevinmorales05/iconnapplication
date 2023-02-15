import React, { useEffect } from 'react';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useToast, useAlert } from 'context';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import analytics from '@react-native-firebase/analytics';
import { RootState, useAppSelector } from 'rtk';

interface Props {
  contactUsValues: [];
  onPressSendAnalytics: (analyticsName: string) => void;
}

const ContactUsScreen: React.FC<Props> = ({ contactUsValues, onPressSendAnalytics }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();
  const alert = useAlert();

  useEffect(() => {}, [contactUsValues]);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%', height: '100%' }}>
      {contactUsValues.length > 0 ? (
        contactUsValues.map((contact, index) => {
          let contactType = contact.mainText === 'Llama al 800 837 1100' ? 'call' : contact.mainText === 'WhatsApp al 81 1234 5567' ? 'whatsapp' : 'email';
          return (
            <NavigationMenuItem
              key={index}
              text={contact.mainText}
              disable={false}
              icon={<Image source={contact.img} style={{ width: 32, height: 32 }} />}
              onPressNavigateTo={() => {
                onPressSendAnalytics(contactType);
              }}
              isMainTextBold={true}
              description={contact.description}
              mainTextSize={14}
              color={theme.brandColor.iconn_white}
            />
          );
        })
      ) : (
        <></>
      )}
    </Container>
  );
};

export default ContactUsScreen;
