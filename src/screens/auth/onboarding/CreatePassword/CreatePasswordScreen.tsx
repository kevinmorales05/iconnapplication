import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Image, TextInput, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer, Button, Container } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { passwordRule } from 'utils/rules';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Touchable} from '../../../../components/atoms/Touchable'
import { ICONN_EYE } from 'assets/images';

interface Props {
  onSubmit: (email: string) => void;
  goBack: () => void;
}

const CreatePasswordScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();
 const [text, setText] = useState("") // password value


 /*
 0 -- empty value
 1 -- correct validation
 2 -- incorrect validation
 
 */
//items
const [val1Item, setVal1Item] = useState('circle')
const [val2Item, setVal2Item] = useState('circle')
const [val3Item, setVal3Item] = useState('circle')
const [val4Item, setVal4Item] = useState('circle')
const [val5Item, setVal5Item] = useState('circle')
//colors
const [val1Color, setVal1Color] = useState(theme.brandColor.iconn_med_grey)
const [val2Color, setVal2Color] = useState(theme.brandColor.iconn_med_grey)
const [val3Color, setVal3Color] = useState(theme.brandColor.iconn_med_grey)
const [val4Color, setVal4Color] = useState(theme.brandColor.iconn_med_grey)
const [val5Color, setVal5Color] = useState(theme.brandColor.iconn_med_grey)
//see password
const [secureMode, setSecureMode] = useState(false)

//password validation
const [passValid, setPassValid] = useState(true)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register
  } = useForm({
    mode: 'onChange'
  });

  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(text);
  };

  const validatePassword = (value: string) => {
    setText(value)
    console.log("------------------------")
    if(value === ""){
      setVal1Item("circle")
      setVal1Color(theme.brandColor.iconn_med_grey)
      setVal2Item("circle")
      setVal2Color(theme.brandColor.iconn_med_grey)
      setVal3Item("circle")
      setVal3Color(theme.brandColor.iconn_med_grey)
      setVal4Item("circle")
      setVal4Color(theme.brandColor.iconn_med_grey)
      setVal5Item("circle")
      setVal5Color(theme.brandColor.iconn_med_grey)
      setPassValid(true)
    }
    if (value.match(/\s/)) {
      // return `No se admiten espacios`;
      console.log("no se admiten espacios vacios")
      setPassValid(false)
    } 
    if (value.length < 8) {
      // return `Minimo 8 caracteres`;
      console.log("Minimo 8 caracteres")
      setVal1Item("times-circle")
      setVal1Color(theme.brandColor.iconn_error)
      setPassValid(true)
    } 
    else {
      console.log("*****tiene mas de 8 caracteres")
      setVal1Item("check-circle")
      setVal1Color(theme.brandColor.iconn_success)
    }
    
     if(!value.match(/[A-Z]/)){
      // return `Al menos una mayúscula`;
      console.log("no hay una mayuscula")
      setVal2Item("times-circle")
      setVal2Color(theme.brandColor.iconn_error)
      setPassValid(true)
      
    } 

    else {
      setVal2Item("check-circle")
      setVal2Color(theme.brandColor.iconn_success)
      console.log("*****tiene mayuscula")
      setPassValid(true)
    }

    if (!value.match(/[a-z]/)) {
      // return `Al menos una minúscula`;
      console.log("al menos una minuscula")
      setVal3Item("times-circle")
      setVal3Color(theme.brandColor.iconn_error)
      setPassValid(true)
    }
    else {
      setVal3Item("check-circle")
      setVal3Color(theme.brandColor.iconn_success)
      console.log("*****tiene minuscula")
    }

    if (!value.match(/\d/)) {
      // return `Al menos una número`;
      console.log("al menos un digito")
      setVal4Item("times-circle")
      setVal4Color(theme.brandColor.iconn_error)
      setPassValid(true)
      
    }
    else {
      setVal4Item("check-circle")
      setVal4Color(theme.brandColor.iconn_success)
      console.log("*****tiene un digito")
    }

    if (!value.match(/\W/)) {
      // return `Al menos un caracter especial`;
      console.log("Al menos un caracter especial")
      setVal5Item("times-circle")
      setVal5Color(theme.brandColor.iconn_error)
      setPassValid(true)
    }  else {
      setVal5Item("check-circle")
      setVal5Color(theme.brandColor.iconn_success)
      console.log("*****tiene un caracter especial")
    }
    console.log("------------------------")
    if(!(value.length < 8) && (value.match(/[A-Z]/)) && value.match(/[a-z]/) && value.match(/\d/) && value.match(/\W/)  ){
      console.log("cumple todo")
      setPassValid(false)
    }

  }
  const setMode = () => {
    if(secureMode === false){
      setSecureMode(true);
    }
    else {
      setSecureMode(false)
    }
   
    


  }
  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextContainer
        typography="h2"
        fontBold
        text={`Crea tu contraseña`}
        fontSize={24}
        marginTop={57}
      ></TextContainer>
      <TextContainer
        typography="h2"
        text={`Recuerda no compartirla.`}
        marginTop={9}
        fontSize={17}
        
      ></TextContainer>
      <View style={{backgroundColor:'white', borderColor:'#dadadb', borderWidth:1,padding:2, borderRadius:8, marginTop:20,  flexDirection:'row', height:60, justifyContent:'space-between' }}>
      <TextInput 
       style={{backgroundColor:'white' }}
       onChangeText={ text => validatePassword(text)}
       placeholder="Ingresa tu contraseña"
       value={text}
       secureTextEntry={secureMode}
      />
      
<Touchable testID={`5-hide-password`} onPress={()=> setMode()}  opacityEffect>
              <Image source={ICONN_EYE} style={styles.passwordImageStyle}  />
            </Touchable>
      </View>
      
      
    
    <Container>
    
<Container>
        <Container flex row style={{marginTop:34}}>          
          <FontAwesome name={val1Item} size={18} color={val1Color} />
          <TextContainer text='Mínimo 8 caracteres' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={val2Item} size={18} color={val2Color} />
          <TextContainer text='Contiene una letra mayúscula' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={val3Item} size={18} color={val3Color} />
          <TextContainer text='Contiene una letra minúscula' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={val4Item} size={18} color={val4Color} />
          <TextContainer text='Contiene un número' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={val5Item} size={18} color={val5Color} />
          <TextContainer text='Contiene un caracter especial' typography='h5' marginLeft={10}/>
        </Container>
      </Container>


          
    </Container>  

      <Container flex row crossAlignment="end" space="between">
        <ActionButton
          size="large"
          onPress={goBack}
          color="iconn_med_grey"
          icon={
            <AntDesign
              name="arrowleft"
              size={24}
              color={theme.fontColor.dark}
            />
          }
        />

        <Button
          length="short"
          round
          disabled={passValid}
          onPress={handleSubmit(submit)}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          rightIcon={<AntDesign name="arrowright" size={24} color="white" />}
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default CreatePasswordScreen;


const styles = StyleSheet.create({
  inputStyle: {
    fontSize: theme.fontSize.paragraph,
    paddingHorizontal: 12,
    color: theme.fontColor.dark
  },
  inputContainerStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.fontColor.medgrey
  },
  passwordImageStyle: {
    width: 20,
    height: 16,
    marginRight: 15,
    marginVertical: 15
  },
  errorImageStyle: {
    width: 10,
    height: 14,
    marginRight: 15,
    marginVertical: 15
  },
  prefixImageStyle: {
    width: 16,
    height: 16,
    marginLeft: 15,
    marginVertical: 15
  }
});
