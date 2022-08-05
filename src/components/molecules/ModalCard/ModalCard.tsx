import React, { ReactElement } from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import theme from 'components/theme/theme';
import {
  ActionButton,
  Container,
  CustomModal,  
} from 'components/atoms';
import { CustomModalProps } from 'components/atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { ICONN_ERROR, ICONN_SUCCESS, ICONN_WARNING } from 'assets/images';
import { modalType } from 'components/types/modal-type';

interface Props extends CustomModalProps {
  padding?: ViewStyle['padding'];
  closeComponent?: ReactElement;
  renderCloseComponent?: boolean;
  secondButton: boolean;
  type: modalType;
}

const ModalCard: React.FC<Props> = ({
  visible,
  children,
  onDismiss,
  type = 'warning'
}: Props) => {
  const { modalCenterCardStyle, closeContainer } = styles;

  return (
    <CustomModal visible={visible} onDismiss={onDismiss}>
      <Container flex middle>
        <TouchableOpacity activeOpacity={1}>
          <Container style={ modalCenterCardStyle }>
            <LinearGradient
              colors={type === 'warning' ? [ '#efd363', '#d0b64d' ] : type === 'error' ? [ '#be646b', '#9f3038' ] : [ '#34c28c', '#319f72' ]}
              style={{ height: 64, width: '100%', position: 'absolute', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} >
            </LinearGradient>
            <Container style={{backgroundColor: 'transparent', borderTopLeftRadius: 16, borderTopRightRadius: 16}}>
              <Image
                source={type === 'warning' ? ICONN_WARNING : type === 'error' ? ICONN_ERROR : ICONN_SUCCESS}
                style={{ alignSelf: 'center', margin: 0, height: 80, top: 16 }}
                resizeMode="center"
              />
              <Container style={closeContainer}>
                <ActionButton
                  style={{ shadowColor:'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onDismiss!}
                  color='iconn_med_grey'
                  circle
                />                
              </Container>              
            </Container>
            {children}
          </Container>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};
const styles = StyleSheet.create({
  modalCenterCardStyle: {
    backgroundColor: theme.brandColor.iconn_white,
    borderRadius: 16,
    width: 280    
  },  
  closeContainer: {
    position: 'absolute',
    top: 16,
    right: 16
  }
});

export default ModalCard;
