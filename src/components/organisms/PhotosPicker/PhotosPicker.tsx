import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  ActionButton,
  Container,
  CustomModal,
  CustomText
} from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import usePhotosPicker, { PhotosPickerMode } from './usePhotosPicker';

interface Props {
  visible: boolean;
  handleCamera: () => void;
  handleGallery: () => void;
  onPressOut: () => void;
}

export const PickerMode: React.FC<Props> = ({
  visible,
  handleGallery,
  handleCamera,
  onPressOut
}) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
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
            <Container
              row
              space="between"
              style={{ marginTop: 16, marginBottom: 16 }}
            >
              <Container>
                <CustomText
                  textColor={theme.brandColor.iconn_dark_grey}
                  text="Sube una foto de perfil"
                  typography="h3"
                  fontBold
                />
              </Container>
              <Container>
                <ActionButton
                  style={{ marginTop: -6, shadowColor: 'none' }}
                  icon={
                    <Ionicons
                      name="close-outline"
                      size={20}
                      color={theme.fontColor.dark_grey}
                    />
                  }
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <Container>
              <Button
                marginTop={28}
                round
                fontBold
                fontSize="h4"
                onPress={handleCamera}
                icon={
                  <Feather
                    name="camera"
                    size={20}
                    color={theme.fontColor.white}
                  />
                }
              >
                Tomar foto
              </Button>
              <Button
                color="iconn_light_grey"
                fontColor="dark"
                round
                fontBold
                fontSize="h4"
                onPress={handleGallery}
                style={{ marginTop: 8 }}
                icon={
                  <FontAwesome5
                    name="images"
                    size={20}
                    color={theme.brandColor.iconn_green_original}
                  />
                }
              >
                Elegir de galería
              </Button>

              <Container
                row
                crossCenter
                style={{ marginTop: 16, marginBottom: 16 }}
              ></Container>
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

export { usePhotosPicker, PhotosPickerMode };
