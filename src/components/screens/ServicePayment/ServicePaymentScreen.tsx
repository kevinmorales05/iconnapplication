import React, { useEffect, useRef, useState } from 'react';
import { Button, TextContainer } from '../../molecules';
import { Container, Input, Touchable } from '../../atoms';
import { CrudType } from '../../types/crud-type';
import { FieldValues, useForm } from 'react-hook-form';
import { Image, Keyboard, Platform, ScrollView, TextInput } from 'react-native';
import { numericWithSpecificLenght, openField } from 'utils/rules';
import { ServiceInterface, ServicePaymentInterface } from 'rtk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from 'components/theme/theme';

interface Props {
  mode: CrudType;
  onPressQuestionButton: () => void;
  onSubmit: (service: FieldValues) => void;
  service?: ServiceInterface;
  servicePayment: ServicePaymentInterface;
}

const ServicePaymentScreen: React.FC<Props> = ({ mode, onPressQuestionButton, onSubmit, service, servicePayment }) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const resetForm = () => {
      reset({
        contractNumber: '',
        alias: ''
      });
      if (contractNumberRef.current) contractNumberRef.current.focus();
    };

    const populateForUpdate = () => {
      setValue('contractNumber', service!.reference);
      setValue('alias', service!.label);
      trigger('contractNumber');
      trigger('alias');
    };

    if (mode === 'create') {
      resetForm();
    } else if (mode === 'update') {
      populateForUpdate();
    }
  }, [mode]);

  // Use this to enable/disable submit button. If user has not changed contractNumber on update operation, submit button should be disabled.
  const [contractNumberChanged, setContractNumberChanged] = useState(false);

  const contractNumberRef = useRef<TextInput>(null);
  const aliasRef = useRef<TextInput>(null);

  useEffect(() => {
    if (contractNumberRef.current) {
      contractNumberRef.current.focus();
    }
  }, []);

  /**
   * Get current contractNumber on user typing.
   * @param newContractNumber string
   */
  const validateChangesOnContractNumber = (newContractNumber: string) => {
    if (mode === 'update' && newContractNumber !== service!.reference) setContractNumberChanged(true);
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Container flex>
          <TextContainer typography="paragraph" text={'Es importante tener la información de tu recibo a\nla mano.'} marginTop={24} numberOfLines={2} />

          <Container center crossCenter style={{ marginTop: 40 }}>
            <Image source={{ uri: servicePayment.imageURL }} style={{ width: 160, height: 80, resizeMode: 'cover' }} />
          </Container>

          <Container row center style={{ marginTop: 48 }}>
            <TextContainer typography="label" text="Número de contrato o servicio." fontBold />
            <Touchable onPress={onPressQuestionButton} marginLeft={8}>
              <MaterialIcons name="help" size={24} color={theme.brandColor.iconn_green_original} style={{ alignSelf: 'center' }} />
            </Touchable>
          </Container>

          <Input
            {...register('contractNumber')}
            name="contractNumber"
            control={control}
            autoCorrect={false}
            keyboardType="default"
            placeholder={`${servicePayment.minLength} dígitos`}
            blurOnSubmit={true}
            ref={contractNumberRef}
            maxLength={servicePayment.maxLength}
            numeric
            onSubmitEditing={() => aliasRef.current?.focus()}
            rules={numericWithSpecificLenght(servicePayment.minLength)}
            error={errors.contractNumber?.message ? 'Número de caracteres incorrecto' : errors.contractNumber?.message}
            onChangeText={contractNumberValue => validateChangesOnContractNumber(contractNumberValue)}
          />
          <Input
            {...register('alias')}
            name="alias"
            control={control}
            autoCorrect={false}
            keyboardType="default"
            placeholder="Ej. Casa, Oficina"
            blurOnSubmit={true}
            marginTop={24}
            ref={aliasRef}
            label="Alias"
            boldLabel
            maxLength={30}
            rules={openField(3)}
            error={errors.alias?.message}
            onSubmitEditing={Keyboard.dismiss}
          />
        </Container>
      </Container>
      <Container>
        <Button disabled={!isValid && !contractNumberChanged} round fontBold fontSize="h4" onPress={handleSubmit(onSubmit)}>
          {mode === 'create' ? 'Agregar' : mode === 'update' ? 'Guardar' : 'No mode'}
        </Button>
      </Container>
    </ScrollView>
  );
};

export default ServicePaymentScreen;
