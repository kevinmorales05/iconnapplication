import { TextContainer } from 'components/molecules';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { HistoryServices, WalletFav } from 'rtk';
import { Container } from '../Container';
import theme from 'components/theme/theme';
import { Touchable } from 'components';
import { TELCEL_LOGO } from 'assets/images';
import { formatDate2 } from 'utils/functions';
import { moderateScale } from 'utils/scaleMetrics';
import Feather from 'react-native-vector-icons/Feather'

interface ServiceHistoryWalletWalletProps {
  item: HistoryServices;
  onPressService: (item: HistoryServices) => void;
}
const ServiceHistoryWalletWallet: React.FC<ServiceHistoryWalletWalletProps> = ({ item, onPressService }) => {
  return (
    <Touchable onPress={()=>onPressService(item)}>
      <Container row style={styles.serviceCard}>
        <Container>
          <TextContainer
            text={formatDate2(item.date)}
            textColor={theme.fontColor.placeholder}
            fontSize={12}
          />
          <Container row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: moderateScale(5)}}>
            <TextContainer
              text={`${item.company} · Amigo Sin Límite ${item.amount}`}
              textColor={theme.fontColor.dark}
              fontSize={14}

            />
            <TextContainer text={`$${item.amount}.00`} fontSize={14} marginLeft={moderateScale(50)} marginRight={moderateScale(30)}/>
            <Feather name="chevron-right" size={moderateScale(24)} color={theme.brandColor.iconn_dark_grey} />
          </Container>
        </Container>
      </Container>
    </Touchable>
  );
};

export default ServiceHistoryWalletWallet;

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
