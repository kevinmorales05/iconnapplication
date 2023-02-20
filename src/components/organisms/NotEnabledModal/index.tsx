import React from 'react';
import { Container, CustomModal, CustomText } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import { CloseSvg } from 'components/svgComponents';
import { moderateScale } from 'utils/scaleMetrics';
import styles from './styles';
import theme from 'components/theme/theme';
import { Button, TextContainer } from 'components/molecules';
import { DisconnetSvg } from 'components/svgComponents/DisconnetSvg';

interface OrderEvaluateModalDataInterface {
  visible: boolean;
  onPressOut: () => void;
}

const NotEnabledModal: React.FC<OrderEvaluateModalDataInterface> = ({ visible, onPressOut }) => {
  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container style={styles.container} flex alignment="end">
        <Container style={styles.containerModal}>
          <Container style={styles.containerHeader} />
          <Container style={styles.containerButtonClose}>
            <Container style={{ paddingTop: moderateScale(10) }}>{<DisconnetSvg size={moderateScale(56)} />}</Container>
            <TouchableOpacity onPress={onPressOut} style={styles.buttonClose}>
              <CloseSvg size={moderateScale(24)} />
            </TouchableOpacity>
          </Container>
          <Container style={styles.containerText}>
            <CustomText fontSize={moderateScale(18)} textColor={theme.fontColor.dark} fontBold text={'Lo sentimos'} />
            <TextContainer
              textAlign="center"
              text={'Esta sección se encuentra temporalmente no disponible.'}
              fontSize={moderateScale(14)}
              textColor={theme.fontColor.dark}
              marginTop={moderateScale(15)}
            />
          </Container>
          <Container style={styles.containerButtons}>
            <Button
              onPress={onPressOut}
              size={'medium'}
              borderColor={'iconn_med_grey'}
              round
              fontSize="h3"
              outline
              style={{ width: moderateScale(250) }}
              fontBold
              color="iconn_dark_grey"
            >
              Aceptar
            </Button>
          </Container>
        </Container>
      </Container>
    </CustomModal>
  );
};

export type { OrderEvaluateModalDataInterface };
export { NotEnabledModal };
