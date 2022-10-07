import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AirbnbRating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ICONN_STAR } from 'assets/images';

interface Props {
  visible: boolean;
  closeModal: () => void;
  postRating?: () => void;
  ratingCompleted?: () => void;
  modalClosed?: () => void;
}

const ReviewModal: React.FC<Props> = ({
  visible,
  closeModal,
  postRating,
  ratingCompleted,
  modalClosed
}) => {

const insets = useSafeAreaInsets();
const { containerStyle } = styles;


  return (
    <CustomModal visible={visible} onDismiss={modalClosed} animationType="slide">
        <Container flex alignment="end">
      <TouchableOpacity
        activeOpacity={1}
        style={{
          ...containerStyle,
          paddingBottom: insets.bottom + 16,
          backgroundColor: theme.brandColor.iconn_white
        }}
      >
        <Container row space="between" style={{ marginTop: 15, marginBottom: 12 }}>
          <Container />
          <Container>
            <CustomText textAlign='center' fontSize={theme.fontSize.h3} textColor={theme.brandColor.iconn_dark_grey} text={"Calificar producto:"} fontBold />
          </Container>
          <Container>
            <ActionButton
              style={{ marginTop: -6, shadowColor: 'none' }}
              icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
              size="xxsmall"
              onPress={closeModal}
              color="iconn_med_grey"
              circle
            />
          </Container>
        </Container>
        <Container>
          <Container style={{marginVertical:40}} row crossCenter>
          <AirbnbRating
            count={5}
            showRating={false}
            size={48}
            defaultRating={0}
            onFinishRating={ratingCompleted}
            starImage={ICONN_STAR}
            selectedColor={theme.brandColor.iconn_yellow}
          />
          </Container>
        <Button
                    round
                    fontBold
                    fontSize="h4"
                    onPress={postRating}
                    >
                    Publicar
                  </Button>
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

export default ReviewModal;
