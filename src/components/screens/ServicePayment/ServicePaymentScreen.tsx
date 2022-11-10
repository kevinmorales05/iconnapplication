import React from 'react';
// import React, { useEffect, useRef, useState } from 'react';
// import { Image, Keyboard, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { CustomModal, Container, Input, Select, CustomText, ActionButton, Touchable } from '../../atoms';
// import { Button, TextContainer } from '../../molecules';
// import { ICONN_ADDRESS_FIND } from 'assets/images';
// import { FieldValues, useForm } from 'react-hook-form';
// import {
//   numericWithSpecificLenght,
//   openField,
//   alphaNumericWithSpacesAndDot,
//   alphaNumericWithoutSpaces,
//   NRalphaNumericWithSpacesAndDot,
//   openFieldNotRequire
// } from 'utils/rules';
// import { Address, PostalCodeInfo } from 'rtk';
// import { CrudType } from '../../types/crud-type';
// import theme from 'components/theme/theme';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// interface Props {
//   visible: boolean;
//   postalCodeInfo: PostalCodeInfo;
//   address: Address;
//   mode: CrudType;
//   title: string;
//   onPressFindPostalCodeInfo: (postalCode: string) => void;
//   onSubmit: (address: FieldValues) => void;
//   onPressClose: () => void;
//   postalCodeError: string;
//   setPostalCodeError: (err: string) => void;
// }

// const ServicePaymentScreen: React.FC<Props> = ({
//   visible,
//   postalCodeInfo,
//   address,
//   mode,
//   title,
//   onPressFindPostalCodeInfo,
//   onSubmit,
//   onPressClose,
//   postalCodeError,
//   setPostalCodeError
// }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid },
//     register,
//     reset,
//     setValue,
//     trigger,
//     getValues
//   } = useForm({
//     mode: 'onChange'
//   });

//   const insets = useSafeAreaInsets();

//   const resetForm = () => {
//     reset({
//       postalCode: '',
//       state: '',
//       city: '',
//       neighborhood: '',
//       street: '',
//       reference: '',
//       tag: ''
//     });
//     if (postalCodeRef.current) postalCodeRef.current.focus();
//   };

//   const populateForUpdate = () => {
//     setValue('postalCode', address.postalCode);
//     setValue('neighborhood', address.neighborhood);
//     setValue('street', address.street);
//     setValue('reference', address.reference);
//     setValue('tag', address.addressName);
//     trigger('postalCode');
//     trigger('neighborhood');
//     trigger('street');
//     trigger('reference');
//     trigger('tag');
//   };

//   useEffect(() => {
//     if (mode === 'create') {
//       resetForm();
//     } else if (mode === 'update') {
//       populateForUpdate();
//     }
//   }, [mode]);

//   const [postalCodeChanged, setPostalCodeChanged] = useState(false);

//   useEffect(() => {
//     setValue('state', postalCodeInfo?.state);
//     setValue('city', postalCodeInfo?.city);
//     trigger('state');
//     trigger('city');

//     if (mode === 'update') {
//       if (postalCodeInfo.neighborhood && postalCodeInfo.postalCode !== address.postalCode) {
//         setValue('neighborhood', postalCodeInfo?.neighborhood.split('::')[0]);
//         trigger('neighborhood');
//       }
//       setPostalCodeChanged(false);
//     }
//   }, [postalCodeInfo]);

//   const postalCodeRef = useRef<TextInput>(null);
//   const streetRef = useRef<TextInput>(null);
//   const referenceRef = useRef<TextInput>(null);
//   const tagRef = useRef<TextInput>(null);

//   useEffect(() => {
//     if (postalCodeRef.current) {
//       postalCodeRef.current.focus();
//     }
//   }, []);

//   const validateChangesOnPostalCode = (newPostalCode: string) => {
//     setPostalCodeError('');
//     if (mode === 'update' && newPostalCode !== address.postalCode) setPostalCodeChanged(true);
//   };

//   const { closeContainer } = styles;

//   return (
//     <Container flex useKeyboard>
//       <Container style={{ marginTop: insets.top }} crossCenter>
//         <CustomText text="Agregar Ticket" typography="h3" fontBold textAlign="center" />
//         <Container style={closeContainer}>
//           <Touchable onPress={goBack} rounded>
//             <AntDesign name="close" size={24} color="black" />
//           </Touchable>
//         </Container>
//       </Container>
//       <ScrollView
//         bounces={false}
//         contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       >
//         <Container flex>
//           <Container>
//             <Container
//               row
//               style={Platform.OS === 'android' ? { justifyContent: 'space-between' } : { alignItems: 'flex-end', justifyContent: 'space-between' }}
//             >
//               <Container style={{ width: '48%' }}>
//                 <Input
//                   {...register('postalCode')}
//                   name="postalCode"
//                   control={control}
//                   autoCorrect={false}
//                   keyboardType="numeric"
//                   placeholder={`Código Postal`}
//                   blurOnSubmit={true}
//                   ref={postalCodeRef}
//                   label="Código Postal"
//                   boldLabel
//                   maxLength={5}
//                   numeric
//                   onSubmitEditing={Keyboard.dismiss}
//                   rules={numericWithSpecificLenght(5)}
//                   error={errors.postalCode?.message || postalCodeError}
//                   onChangeText={postalCodeValue => validateChangesOnPostalCode(postalCodeValue)}
//                 />
//               </Container>
//               <Container style={Platform.OS === 'android' ? { width: '48%', position: 'relative', top: 32 } : { width: '48%' }}>
//                 <Button
//                   icon={<Image source={ICONN_ADDRESS_FIND} resizeMode="cover" style={{ width: 28, height: 28, tintColor: 'white' }} />}
//                   round
//                   size={'large'}
//                   fontBold
//                   fontSize="h4"
//                   onPress={() => onPressFindPostalCodeInfo(getValues('postalCode'))}
//                   color="iconn_green_original"
//                   disabled={!!errors.postalCode?.message || getValues('postalCode')?.length === 0 || (mode === 'update' && postalCodeChanged === false)}
//                   style={errors.postalCode?.message || postalCodeError ? { marginBottom: 8 } : {}}
//                 >
//                   Validar
//                 </Button>
//               </Container>
//             </Container>

//             <Input
//               {...register('state')}
//               name="state"
//               control={control}
//               autoCorrect={false}
//               keyboardType="default"
//               placeholder={`Ej. Estado de México`}
//               blurOnSubmit={true}
//               marginTop={21}
//               label="Estado / Provincia / Región"
//               boldLabel
//               maxLength={120}
//               rules={openField(3)}
//               error={errors.state?.message}
//               editable={false}
//             />

//             <Input
//               {...register('city')}
//               name="city"
//               control={control}
//               autoCorrect={false}
//               keyboardType="default"
//               placeholder={`Ej. Toluca`}
//               blurOnSubmit={true}
//               marginTop={21}
//               label="Municipio, Ciudad o Delegación"
//               boldLabel
//               maxLength={120}
//               rules={openField(3)}
//               error={errors.city?.message}
//               editable={false}
//             />

//             <TextContainer typography="h6" fontBold text={`Colonia`} marginTop={21} />
//             <Select
//               name="neighborhood"
//               control={control}
//               rules={openField(3)}
//               options={postalCodeInfo ? postalCodeInfo.neighborhood?.split('::') : []}
//               onSelect={value => setValue('neighborhood', value)}
//               androidMode="dialog"
//               placeholder={`Selección`}
//               label="Selección"
//               error={errors.neighborhood?.message}
//               disabled={false}
//             />

//             <Input
//               {...register('street')}
//               name="street"
//               control={control}
//               autoCorrect={false}
//               keyboardType="default"
//               placeholder={`Ej. Blvrd Acapulco #4056`}
//               blurOnSubmit={true}
//               marginTop={21}
//               ref={streetRef}
//               label="Calle y número exterior"
//               boldLabel
//               maxLength={50}
//               onSubmitEditing={() => referenceRef.current?.focus()}
//               rules={openField(3)}
//               error={errors.street?.message}
//             />

//             <Input
//               {...register('reference')}
//               name="reference"
//               control={control}
//               autoCorrect={false}
//               keyboardType="default"
//               placeholder={`Ej. Pasando la 2da glorieta, casa blanca.`}
//               blurOnSubmit={true}
//               marginTop={21}
//               ref={referenceRef}
//               label="Instrucción adicional o referencia"
//               boldLabel
//               maxLength={50}
//               onSubmitEditing={() => tagRef.current?.focus()}
//               rules={openFieldNotRequire(3)}
//               error={errors.reference?.message}
//             />

//             <Input
//               {...register('tag')}
//               name="tag"
//               control={control}
//               autoCorrect={false}
//               keyboardType="default"
//               placeholder={`Ej. Casa`}
//               blurOnSubmit={true}
//               marginTop={21}
//               ref={tagRef}
//               label="Etiqueta"
//               boldLabel
//               maxLength={20}
//               rules={openField(3)}
//               error={errors.tag?.message}
//             />
//           </Container>
//           <Container>
//             <Button
//               disabled={!isValid || (mode === 'update' && postalCodeChanged === true && postalCodeInfo.neighborhood !== '')}
//               marginTop={16}
//               round
//               fontBold
//               fontSize="h4"
//               onPress={handleSubmit(onSubmit)}
//             >
//               Guardar
//             </Button>
//           </Container>
//         </Container>
//       </ScrollView>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   closeContainer: {
//     position: 'absolute',
//     right: 0
//   }
// });

// export default ServicePaymentScreen;

const ServicePaymentScreen: React.FC<any> = () => null;
export default ServicePaymentScreen;
