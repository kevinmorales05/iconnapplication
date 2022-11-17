import React, { useEffect, useRef } from 'react';
import { Button, Container, Input, Select, TextContainer } from 'components';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput } from 'react-native';
import { alphabetRule, numericWithSpecificLenght } from 'utils/rules';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BankInterface, BeneficiaryInterface } from 'rtk';
import { InfoSvg } from 'components/svgComponents/InfoSvg';
import theme from 'components/theme/theme';
import styles from './styles';

interface Props {
  onSubmit: (data: FieldValues) => void;
  banks: BankInterface[];
  beneficiary: BeneficiaryInterface;
}

const DepositScreen: React.FC<Props> = ({ onSubmit, banks, beneficiary }) => {
  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const numberAccountRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const tagRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
  };

  useEffect(() => {
    if (beneficiary?.id) {
      setValue('name', beneficiary.name);
      setValue('numberAccount', beneficiary.accountCard);
      setValue('bank', beneficiary.bank);
      setValue('tag', beneficiary.tag);
    }
  }, [beneficiary]);

  return (
    <ScrollView
      bounces={true}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top - 16,
        paddingHorizontal: moderateScale(15)
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextContainer typography="h5" text={'Realiza depósitos en caja más rápido.'} marginTop={0} />
      <Container>
        <TextContainer typography="h6" fontBold text={'Número de tarjeta o cuenta'} marginTop={moderateScale(25)} />
        <Input
          {...register('numberAccount')}
          ref={nameRef}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder=""
          maxLength={18}
          blurOnSubmit={true}
          rules={numericWithSpecificLenght(16)}
          error={errors.numberAccount?.message}
          onSubmitEditing={() => numberAccountRef.current?.focus()}
        />
        <TextContainer typography="h6" fontBold text={'Nombre del beneficiario'} marginTop={moderateScale(25)} />
        <Input
          {...register('name')}
          ref={numberAccountRef}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Nombre que aparece en la tarjeta"
          maxLength={30}
          blurOnSubmit={true}
          rules={alphabetRule(true)}
          error={errors.name?.message}
        />
        <TextContainer typography="h6" fontBold text={'Banco / Entidad'} marginTop={moderateScale(25)} />
        <Select
          name="bank"
          control={control}
          options={banks.map(item => item.name)}
          onSelect={value => {
            setValue('bank', value);
            register('bank');
            trigger('bank');
          }}
          androidMode="dialog"
          placeholder="Seleccionar"
        />
        <TextContainer typography="h6" fontBold text={'Alias'} marginTop={moderateScale(25)} />
        <Input
          {...register('tag')}
          ref={tagRef}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Ej. Mamá, Papá"
          maxLength={30}
          blurOnSubmit={true}
          rules={alphabetRule(true)}
          error={errors.tag?.message}
        />
        <Container style={styles.containerInfo}>
          <InfoSvg size={moderateScale(24)} />
          <Container style={{ marginLeft: moderateScale(10) }}>
            <Text style={{ fontSize: theme.fontSize.h6 }}>
              <Text style={{ fontWeight: 'bold' }}>Importante:</Text> Por seguridad, la información de depósitos bancarios será eliminada cuando salgas de tu
              cuenta.
            </Text>
          </Container>
        </Container>
        <Button length="long" disabled={!isValid} round onPress={handleSubmit(submit)} fontSize="h4" fontBold marginTop={verticalScale(20)}>
          {beneficiary?.id ? 'Guardar' : 'Agregar'}
        </Button>
      </Container>
    </ScrollView>
  );
};
export default DepositScreen;
