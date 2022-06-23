import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import theme from 'components/theme/theme';
import {
  Container,
  CustomModal,
  CustomText,
  Touchable
} from 'components/atoms';
import { CustomModalProps } from 'components/atoms';

interface Props extends CustomModalProps {
  padding?: ViewStyle['padding'];
  closeComponent?: ReactElement;
  renderCloseComponent?: boolean;
}

const ModalCard: React.FC<Props> = ({
  visible,
  children,
  onDismiss,
  padding = 24,
  closeComponent,
  renderCloseComponent = true
}: Props) => {
  const { modalCenterCardStyle, closeContainer } = styles;

  return (
    <CustomModal visible={visible} onDismiss={onDismiss}>
      <Container flex middle>
        <TouchableOpacity activeOpacity={1}>
          <Container
            style={[
              modalCenterCardStyle,
              {
                padding,
                backgroundColor: theme.brandColor.iconn_grey
              }
            ]}
          >
            {children}
            {onDismiss && renderCloseComponent && (
              <Container style={closeContainer}>
                <Touchable
                  effectEnable={!!closeComponent}
                  onPress={onDismiss}
                  hitSlop={16}
                >
                  {closeComponent || (
                    <Container flex middle>
                      <CustomText text="X" />
                    </Container>
                  )}
                </Touchable>
              </Container>
            )}
          </Container>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};
const styles = StyleSheet.create({
  modalCenterCardStyle: {
    backgroundColor: theme.brandColor.iconn_accent_secondary,
    borderRadius: 10,
    minWidth: '85%',
    width: '85%'
  },
  closeContainer: {
    position: 'absolute',
    top: 8,
    right: 8
  }
});

export default ModalCard;
