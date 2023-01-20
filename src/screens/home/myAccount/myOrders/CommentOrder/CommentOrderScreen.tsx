import { Button, Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { ScrollView, Platform, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { alphabetRule } from 'utils/rules';
import styles from './styles';

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
            <Container style={styles.containerInput}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    placeholder="Escribe tus comentarios aquí (Opcional)"
                    placeholderTextColor={theme.fontColor.placeholder}
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name="comment"
                rules={alphabetRule(true)}
              />
            </Container>
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
