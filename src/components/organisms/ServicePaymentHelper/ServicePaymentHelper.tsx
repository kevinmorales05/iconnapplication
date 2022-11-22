import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, CustomModal, Touchable } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer } from 'components/molecules';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  img: ImageSourcePropType;
  message: string;
  onPressOut: () => void;
  visible: boolean;
}

const ServicePaymentHelper: React.FC<Props> = ({ img, message, onPressOut, visible }) => {
  const { containerStyle, closeContainer } = styles;

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
            <Container style={{ marginBottom: 8, marginRight: 4 }} crossCenter>
              <TextContainer marginRight={16} text="Número de contrato o servicio" typography="h3" fontBold textAlign="center" />
              <Container style={closeContainer}>
                <Touchable onPress={onPressOut} rounded>
                  <AntDesign name="close" size={24} color="black" />
                </Touchable>
              </Container>
            </Container>
            <Container>
              {/* TODO: fix this "source" eslint error */}
              <Image resizeMode="contain" source={{ uri: img }} style={{ height: 250, width: '100%', alignSelf: 'center' }} />
              <TextContainer text={message} marginTop={16} numberOfLines={4} />
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
  },
  closeContainer: {
    position: 'absolute',
    right: 0
  }
});

export default ServicePaymentHelper;
