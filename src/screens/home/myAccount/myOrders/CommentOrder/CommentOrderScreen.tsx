import { Button, Container, InputWithHeight, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onSubmit: (comment: FieldValues) => void;
}

const CommentOrderScreen: React.FC<Props> = ({ onSubmit }) => {
  const insets = useSafeAreaInsets();
  const { control, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={
        Platform.OS === 'android'
          ? { flexGrow: 1, marginBottom: insets.bottom + 16, backgroundColor: theme.brandColor.iconn_white }
          : { flexGrow: 1, backgroundColor: theme.brandColor.iconn_white }
      }
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between" backgroundColor={theme.brandColor.iconn_white}>
        <Container>
          <TextContainer text="2/2" textAlign="center" fontSize={14} marginTop={31.5} />
          <TextContainer text="¿Quieres dejar un comentario adicional?" textAlign="center" fontBold fontSize={16} marginTop={24} />
          <Container style={{ marginHorizontal: 16, marginTop: 24.5 }}>
            <InputWithHeight height={200} multiline control={control} name="comment" placeholder="Escribe tus comentarios aquí (Opcional)" />
          </Container>
        </Container>
        <Button onPress={handleSubmit(submit)} marginLeft={16} marginRight={16} marginBottom={30} round fontBold fontSize="h4">
          Enviar
        </Button>
      </Container>
    </ScrollView>
  );
};
export default CommentOrderScreen;
