import { TextContainer } from 'components/molecules';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { WalletFav } from 'rtk';
import { Container } from '../Container';
import theme from 'components/theme/theme';
import { Touchable } from 'components';
import { TELCEL_LOGO } from 'assets/images';

interface ServiceCardWalletProps {
  item: WalletFav;
  onPressService: (item: WalletFav) => void;
}
const ServiceCardWallet: React.FC<ServiceCardWalletProps> = ({ item, onPressService }) => {
  console.log({item})
  return (
    <Touchable onPress={()=>onPressService(item)}>
      <Container row style={styles.serviceCard}>
        <Image source={TELCEL_LOGO} style={{ height: 48, width: 48 }} resizeMode={'contain'} />
        <Container>
          <TextContainer
            text={'Recarga · Telcel'}
            textColor={theme.fontColor.placeholder}
            fontSize={12}
            marginLeft={16}
          />
          <TextContainer text={item.tagName} fontBold fontSize={14} marginLeft={16} marginTop={6} textColor={theme.fontColor.dark} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default ServiceCardWallet;

const styles = StyleSheet.create({
  serviceCard: {
    paddingLeft: 16,
    marginLeft: 16,
    paddingTop: 28,
    borderBottomColor: '#e9edf7',
    borderBottomWidth: 1,
    paddingBottom: 15.5
  }
});
