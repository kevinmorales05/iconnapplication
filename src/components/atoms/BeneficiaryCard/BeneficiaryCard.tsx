import { BeneficiaryInterface } from 'rtk';
import React from 'react';
import { ICONN_DOLLAR_CIRCLE } from 'assets/images';
import { TextContainer } from 'components/molecules';
import { Image, StyleSheet } from 'react-native';
import { Container } from '../Container';
import theme from 'components/theme/theme';
import { TouchableOpacity } from 'react-native';

interface BeneficiaryCardProps {
  beneficiary: BeneficiaryInterface;
  goToDepositDetail: (beneficiary: BeneficiaryInterface) => void;
}

const BeneficiaryCard: React.FC<BeneficiaryCardProps> = ({ beneficiary, goToDepositDetail }) => {
  return (
    <TouchableOpacity onPress={() => goToDepositDetail(beneficiary)}>
      <Container row style={styles.serviceCard}>
        <Container crossCenter circle height={32} backgroundColor={theme.brandColor.iconn_green_original} style={{ padding: 4 }}>
          <Image source={ICONN_DOLLAR_CIRCLE} style={{ height: 24, width: 24 }} />
        </Container>
        <Container>
          <TextContainer text="Depósito bancario" marginLeft={16} fontSize={12} textColor={theme.fontColor.placeholder} />
          <TextContainer text={beneficiary.name} fontBold marginLeft={16} fontSize={14} marginTop={2} />
          <TextContainer text={beneficiary.bank} marginLeft={16} fontSize={14} marginTop={2} />
        </Container>
      </Container>
    </TouchableOpacity>
  );
};

export default BeneficiaryCard;

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
