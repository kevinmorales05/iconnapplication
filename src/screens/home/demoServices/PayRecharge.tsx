import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Input, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { Image, ScrollView, StyleSheet, TextInput } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { SEVEN_MINI_LOGO, TELCEL_LOGO } from 'assets/images';
import { useForm } from 'react-hook-form';
import { alphaNumeric, onlyNumericWithSpecificLenght } from 'utils/rules';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialICons from 'react-native-vector-icons/MaterialIcons' 
import { OptionsModal } from 'components/organisms/OptionsModal';
import { rechargeOptions } from '../../../common/demoServicesPay';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HomeStackParams } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootState, setNumberRecharge, setTagName, useAppDispatch, useAppSelector } from 'rtk';

const PayRecharge = () => {
    const [ viewAmountModal, setViewAmountModal ] = useState<boolean>(false)
    const [ amount, setAmount ] = useState<string>('')
    const { amountOfRecharge, tagName, numberRecharge } = useAppSelector((state: RootState) => state.wallet);
    const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const dispatch = useAppDispatch();

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
    const insets = useSafeAreaInsets();

    const numberPhoneRef = useRef<TextInput>(null);
    const tagRef = useRef<TextInput>(null)

    useEffect(()=>{
        if(amountOfRecharge){
            setAmount(amountOfRecharge);
        }
    },[amountOfRecharge])

    useEffect(()=>{
        if(tagName && numberPhoneRef){
            setValue('tag', tagName);
            setValue('numberPhone', numberRecharge);
            trigger('tag');
            trigger('numberPhone');
        }
    },[])

    const isEnable: boolean = !!(isValid && amount);

    const submit = (fields: any)=>{
        console.log({fields})
        dispatch(setTagName(fields.tag));
        dispatch(setNumberRecharge(fields.numberPhone));
        navigate('ConfirmPay')
    }

    return(
        <ScrollView
            bounces={true}
            style={{ flex: 1 }}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: insets.bottom + 16,
                paddingTop: insets.top - 16,
                paddingHorizontal: moderateScale(15),
                backgroundColor: theme.brandColor.iconn_white
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >   
            <Container style={styles.containerCenter}>
                <Image source={TELCEL_LOGO} style={styles.image}/>
            </Container>
            <Container>
                <Input
                    {...register('numberPhone')}
                    ref={numberPhoneRef}
                    control={control}
                    keyboardType="number-pad"
                    placeholder="10 dígitos"
                    maxLength={10}
                    label='Número celular'
                    boldLabel
                    blurOnSubmit={true}
                    rules={onlyNumericWithSpecificLenght(10)}
                    error={errors.numberPhone?.message}
                    onSubmitEditing={() => tagRef.current?.focus()}
                />
            </Container>
            <Container>
                <Input
                    {...register('tag')}
                    ref={tagRef}
                    control={control}
                    keyboardType="default"
                    placeholder="Ej. Casa, Oficina"
                    maxLength={30}
                    label='Alias'
                    boldLabel
                    blurOnSubmit={true}
                    rules={alphaNumeric(5)}
                    error={errors.tag?.message}
                    marginTop={verticalScale(24)}
                    // onSubmitEditing={() => surnameRef.current?.focus()}
                />
            </Container>
            <TouchableOpacity onPress={()=>setViewAmountModal(true)} style={styles.containerAmount}>
                <Container style={{flex: .90}}>
                    <TextContainer text="Monto de recarga" fontBold typography="h6" /> 
                    {
                        amount ?
                            <TextContainer text={`Amigo Sin Límite $${amount}`} marginTop={verticalScale(10)} textColor={theme.fontColor.dark} typography="h5" /> 
                        :
                            <TextContainer text="Selecciona" marginTop={verticalScale(10)} textColor={theme.fontColor.placeholder} typography="h5" /> 
                    }
                </Container>
                <Container style={{flex: .10}}>
                    <MaterialICons name={'arrow-forward-ios'} size={moderateScale(24)}/>
                </Container>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('OptionsPay')} style={styles.containerAmount}>
                <Container style={{flex: .90}}>
                    <TextContainer text="Método de pago" fontBold typography="h6" /> 
                    <Container row style={{marginTop: verticalScale(10), alignItems: 'center'}} >
                        <Image source={SEVEN_MINI_LOGO} resizeMode={'contain'} style={{width: moderateScale(32), height: moderateScale(32)}}/>
                        <TextContainer text="Saldo 7-Eleven" marginLeft={moderateScale(8)} textColor={theme.fontColor.black} typography="h5" /> 
                    </Container>
                </Container>
                <Container style={{flex: .10}}>
                    <MaterialICons name={'arrow-forward-ios'} size={moderateScale(24)}/>
                </Container>
            </TouchableOpacity>
            <Container style={{marginTop: verticalScale(24)}}>
                <Button
                    length="long"
                    fontSize="h5"
                    round
                    fontBold
                    disabled={!isEnable}
                    onPress={handleSubmit(submit)}
                    borderColor={'iconn_green_original'}
                    style={{
                        width: '100%',
                        backgroundColor: theme.brandColor.iconn_green_original,
                        height: verticalScale(48),
                        borderRadius: moderateScale(12)
                    }}
                    >
                    Continuar
                </Button>
            </Container>
            <OptionsModal options={rechargeOptions} visible={viewAmountModal} onPressOut={()=>setViewAmountModal(false)} />
        </ScrollView>
    );
}

export default PayRecharge;

const styles = StyleSheet.create({
    image: {
      width: moderateScale(114),
      height: moderateScale(114),
      marginTop: verticalScale(16)
    },
    containerCenter: {
        width: '100%',
        alignItems: 'center'
    },
    containerAmount: {
        width: '100%',
        height: verticalScale(66),
        padding: moderateScale(10),
        borderWidth: 1,
        borderColor: '#dadadb',
        borderRadius: moderateScale(10),
        marginTop: moderateScale(24),
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerPay: {
        width: '100%',
        height: verticalScale(81),
        padding: moderateScale(10),
        borderWidth: 1,
        borderColor: '#dadadb',
        borderRadius: moderateScale(10),
        marginTop: moderateScale(24),
        flexDirection: 'row',
        alignItems: 'center'
    }
  });
  