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
import { ICONN_SUCCESS, ICONN_WARNING_MARK, ICONN_ERROR_CROSS } from 'assets/images';
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
              colors={type === 'warning' ? [ '#efd363', '#d0b64d' ] : type === 'error' ? [ '#D91212', '#D91212' ] : type === 'deleteCart' ? [ '#D91212', '#D91212' ] : [ '#34c28c', '#319f72' ]}
              style={{ height: 16, width: '100%', position: 'absolute', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} >
            </LinearGradient>
            {
              type !== 'deleteCart' && 
                <Container style={{backgroundColor: 'transparent', borderTopLeftRadius: 16, borderTopRightRadius: 16}}>
                  <Image
                    source={type === 'warning' ? ICONN_WARNING_MARK : type === 'error' ? ICONN_ERROR_CROSS : ICONN_SUCCESS}
                    style={{ alignSelf: 'center', marginTop: "15%", height: 56, top: 16 }}
                    resizeMode="contain"
                  />
                  <Container style={closeContainer}>
                    <ActionButton
                      style={{ shadowColor:'none', marginTop:5 }}
                      icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                      size="xxsmall"
                      onPress={onDismiss!}
                      color='iconn_med_grey'
                      circle
                    />                
                  </Container>              
                </Container>
            }
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
    width: 280,
    paddingVertical: 15,
  },  
  closeContainer: {
    position: 'absolute',
    top: 16,
    right: 16
  }
});

export default ModalCard;
