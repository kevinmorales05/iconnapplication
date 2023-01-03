import React, { useEffect } from 'react';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useToast, useAlert } from 'context';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';

interface Props {
  contactUsValues: [];
}

const ContactUsScreen: React.FC<Props> = ({ contactUsValues }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const alert = useAlert();

  useEffect(() => {
  }, [contactUsValues]);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%' , height:'100%'}} >
      {contactUsValues.length > 0 ? (
        contactUsValues.map(contact => {
          return (
            <NavigationMenuItem
              text={contact.mainText}
              disable={false}
              icon={
              <Image source={contact.img} style={{ width: 32, height: 32 }} />
            }
              onPressNavigateTo={() => {

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