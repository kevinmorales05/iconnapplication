import { Container, TextContainer, Button, Input } from 'components';
import { ScanCodeSvg } from 'components/svgComponents/ScanCodeSvg';
import { EvaluateServiceInterface } from 'components/types/StepsWallet';
import React, { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { onlyNumericWithSpecificLenght } from 'utils/rules';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

import styles from './styles';

interface Props {
  onSubmit: (data: FieldValues) => void;
  onPressScan: () => void;
  barcodeProp: string;
}

const StepOneSeven: React.FC<Props> = ({ onSubmit, onPressScan, barcodeProp }) => {
  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue
  } = useForm({
    mode: 'onChange'
  });

  const [validBarcode, setValidBarcode] = useState<boolean>(false);

  useEffect(() => {
    if (barcodeProp) {
      const condition = new RegExp(/^[0-9]*$/);
      const isValidTem = condition.test(barcodeProp);
      setValue('codeScan', barcodeProp);
      setValidBarcode(isValidTem && barcodeProp.length === 35);
    }
  }, [barcodeProp]);

  const codeScan = useRef<TextInput>(null);

  const submit: SubmitHandler<FieldValues> = fields => {
    const dataSend: EvaluateServiceInterface = {
      establishment_id: 2,
      ticket: fields.codeScan
    };
    onSubmit(dataSend);
  };

  return (
    <Container style={styles.container}>
      <Button
        length="long"
        outline
        icon={<ScanCodeSvg size={moderateScale(24)} />}
        round
        onPress={onPressScan}
        fontSize="h4"
        fontBold
        marginTop={verticalScale(20)}
        borderWidth={moderateScale(2.5)}
      >
        Escanear ticket
      </Button>
      <Container style={styles.containerDiv}>
        <Container style={styles.containerStroke} />
        <TextContainer text="O captura" typography={'h5'} />
        <Container style={styles.containerStroke} />
      </Container>
      <Container>
        <TextContainer typography="h6" fontBold text={'Código de barras'} marginTop={moderateScale(25)} />
        <Input
          {...register('codeScan')}
          ref={codeScan}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder="35 dígitos"
          maxLength={35}
          blurOnSubmit={true}
          rules={onlyNumericWithSpecificLenght(35)}
          error={errors.numberAccount?.message}
          onSubmitEditing={() => codeScan.current?.focus()}
        />
      </Container>
      <Button
        length="long"
        disabled={validBarcode ? false : !isValid}
        round
        onPress={handleSubmit(submit)}
        fontSize="h4"
        fontBold
        marginTop={verticalScale(55)}
      >
        Validar
      </Button>
    </Container>
  );
};

export default StepOneSeven;
