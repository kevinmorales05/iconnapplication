import { ICONN_STAR } from 'assets/images';
import { Button, Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

import styles from './styles';

interface Props {
  onSubmit: (rating: number) => void;
}

const StepTwoScreen: React.FC<Props> = ({ onSubmit }) => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState<number>(0);

  const onPressRating = (ratingValue: number) => {
    setRating(ratingValue);
  };

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: moderateScale(15),
        backgroundColor: theme.brandColor.iconn_white,
        alignItems: 'center'
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextContainer typography="h5" text={'2/4'} marginTop={verticalScale(30)} />
      <TextContainer textAlign="center" fontBold typography="h4" text={'¿Cómo calificarías el servicio brindado?'} marginTop={verticalScale(30)} />
      <Container style={styles.containerStars}>
        <AirbnbRating
          count={5}
          showRating={false}
          size={moderateScale(48)}
          defaultRating={0}
          onFinishRating={onPressRating}
          starImage={ICONN_STAR}
          selectedColor={theme.brandColor.iconn_yellow}
        />
      </Container>
      <Container style={styles.containerButton}>
        <Button length="long" disabled={rating === 0} round onPress={() => onSubmit(rating)} fontSize="h4" fontBold>
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default StepTwoScreen;
