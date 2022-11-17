import { Button, Container, Input, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React, { useEffect, useRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Image, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RechargeSupplier } from 'rtk';
import { alphabetRule, mobilePhoneRule } from 'utils/rules';

interface Props {
  onPressAmount: () => void;
  supplier: RechargeSupplier;
  onSubmit: (data: FieldValues) => void;
  amount?: number;
  fields: any;
}

const RechargeEditSceen: React.FC<Props> = ({ onPressAmount, supplier, onSubmit, amount, fields }) => {
  const insets = useSafeAreaInsets();
  const paramSupplier = supplier;

  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit,
    trigger,
    setValue
  } = useForm({
    mode: 'onChange'
  });
  const phoneRef = useRef<TextInput>(null);
  const aliasRef = useRef<TextInput>(null);
  useEffect(() => {
    const populateForUpdate = () => {
      setValue('telephone', fields!.telephone);
      setValue('alias', fields!.alias);
      trigger('telephone');
      trigger('alias');
    };
    populateForUpdate();
  }, []);

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        marginLeft: insets.left,
        backgroundColor: theme.brandColor.iconn_white,
        width: '100%'
      }}
    >
      <Container center>
        <Image source={{ uri: paramSupplier.imageURL }} style={styles.image} />
      </Container>
      <Container style={{ marginHorizontal: 16, marginBottom: 24 }}>
        <Input
          name="telephone"
          ref={phoneRef}
          control={control}
          keyboardType="number-pad"
          error={errors.telephone?.message}
          label="Número celular"
          boldLabel
          placeholder="10 dígitos"
          rules={mobilePhoneRule(true)}
          onFocus={() => {
            register('telephone', mobilePhoneRule(true));
            trigger('telephone');
          }}
        />
      </Container>
      <Touchable onPress={onPressAmount}>
        <Container row style={styles.amountContainer}>
          <Container>
            <TextContainer text="Monto Recarga" fontBold fontSize={12} marginBottom={10} />
            <TextContainer
              text={amount === undefined ? 'Selecciona' : '$' + (amount?.toString() as string)}
              fontSize={14}
              textColor={theme.fontColor.placeholder}
            />
          </Container>
          <Container style={{ position: 'absolute', right: 10, top: 20 }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} />
          </Container>
        </Container>
      </Touchable>

      <Container style={{ marginHorizontal: 16, marginBottom: 103, marginTop: 16 }}>
        <Input name="alias" control={control} ref={aliasRef} label="Alias" boldLabel placeholder="Ej. Casa, Oficina" rules={alphabetRule(true)} />
      </Container>
      <Container style={{ marginHorizontal: 16, marginBottom: 32 }}>
        <Button disabled={!isValid || amount === undefined} fontBold fontSize="h4" round onPress={handleSubmit(submit)}>
          Guardar
        </Button>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 48,
    width: 140,
    marginTop: 39.5,
    marginBottom: 48
  },
  amountContainer: {
    borderRadius: 8,
    borderColor: theme.brandColor.iconn_med_grey,
    borderWidth: 1,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 12
  }
});

export default RechargeEditSceen;
