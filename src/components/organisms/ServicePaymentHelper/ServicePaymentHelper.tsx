import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  img: ImageSourcePropType;
  message: string;
  onPressOut: () => void;
  visible: boolean;
}

const ServicePaymentHelper: React.FC<Props> = ({ img, message, onPressOut, visible }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  return (
    <CustomModal visible={visible} onDismiss={onPressOut} animationType="slide">
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container>
            <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
              <Container>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Número de contrato o servicio" typography="h3" fontBold />
              </Container>
              <Container>
                <ActionButton
                  style={{ marginTop: -6, shadowColor: 'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <Container>
              {/* TODO: fix this "source" eslint error */}
              <Image resizeMode="cover" source={{ uri: img }} style={{ height: 230, width: 360, alignSelf: 'center' }} />
              <TextContainer text={message} marginTop={8} numberOfLines={4} />
            </Container>
          </Container>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16
  }
});

export default ServicePaymentHelper;
