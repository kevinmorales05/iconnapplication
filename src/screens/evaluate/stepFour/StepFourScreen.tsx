import { ICONN_STAR } from 'assets/images';
import { Button, Container, Input, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { alphabetRule } from 'utils/rules';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

import styles from './styles';

interface Props {
  onSubmit: (score_app: number, comments: string) => void;
}

const StepFourScreen: React.FC<Props> = ({ onSubmit }) => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState<number>(0);

  const onPressRating = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const {
    control,
    formState: { errors },
    register,
    getValues
  } = useForm({
    mode: 'onChange'
  });

  const commentsRef = useRef<TextInput>(null);

  const submit = () => {
    const commentsTem = getValues('comments');
    onSubmit(rating, !!commentsTem ? commentsTem : '');
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
      <TextContainer typography="h5" text={'4/4'} marginTop={verticalScale(30)} />
      <TextContainer textAlign="center" fontBold typography="h4" text={'En general, ¿qué tan satisfecho estás con tu compra?'} marginTop={verticalScale(30)} />
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
      <Container style={styles.containerStroke} />
      <Container style={styles.containerInput}>
        <TextContainer typography="h6" fontBold text={'¿Quieres dejar un comentario adicional?'} marginTop={moderateScale(0)} />
        <Input
          {...register('comments')}
          ref={commentsRef}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Escribe tus comentarios aquí"
          maxLength={130}
          blurOnSubmit={true}
          rules={alphabetRule(true)}
          error={errors.station?.message}
          heightValue={verticalScale(110)}
          multiline={true}
        />
      </Container>
      <Container style={styles.containerButton}>
        <Button length="long" disabled={rating === 0} round onPress={submit} fontSize="h4" fontBold>
          Enviar
        </Button>
      </Container>
    </ScrollView>
  );
};

export default StepFourScreen;
