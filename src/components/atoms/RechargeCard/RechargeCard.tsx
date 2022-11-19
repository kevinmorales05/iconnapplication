import { Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Image } from 'react-native';
import { Container } from '../Container';

interface RechargeCardProps {
  onPressOperator: () => void;
  supplierImage: string;
}

const RechargeCard: React.FC<RechargeCardProps> = ({ onPressOperator, supplierImage }) => {
  return (
    <Touchable onPress={onPressOperator}>
      <Container
        backgroundColor={theme.brandColor.iconn_white}
        style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 16, marginLeft: 16 }}
      >
        <Image source={{ uri: supplierImage }} style={{ height: 48, width: 140 }} />
      </Container>
    </Touchable>
  );
};

export default RechargeCard;
