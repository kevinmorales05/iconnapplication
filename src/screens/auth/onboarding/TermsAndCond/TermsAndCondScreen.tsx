import { Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionButton, Checkbox, Container } from 'components/atoms';
import { TextContainer, Button } from 'components/molecules';
import { ICONN_DOCUMENT_EDIT } from 'assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { setTermsAndCond, useAppDispatch } from 'rtk';

interface Props {
  onSubmit: () => void;
  goBack: () => void;
}

const TermsAndCondScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();
  const [value, setCheckBoxValue] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTermsAndCond({termsAndConditions: value}));
    return;
  }, [value])

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top
      }}
    >
      <Container>
        <Container flex style={{ marginTop: 32, marginLeft: 16 }}>
          <Image source={ICONN_DOCUMENT_EDIT} style={{ height: 48, width: 48 }} />
        </Container>
        <TextContainer
          text="Términos y Condiciones"
          typography="h2"
          fontBold
          marginLeft={6}
          marginTop={20}
        />
        <TextContainer
          text="Confirmo que:"
          typography="placeholder"
          textColor={theme.fontColor.paragraph}
          marginLeft={6}
          marginTop={20}
        />
        <Container flex style={{ flexDirection: 'row', marginLeft: 6, marginTop: 14 }}>
          <Container style={{ marginTop: 6 }}>
            <Icon name="circle" size={7} color="#dadadb" />
          </Container>
          <TextContainer text="Revisé los " marginLeft={16} />
          <TextContainer
            text="Términos de uso"
            typography="link"
            textColor={theme.fontColor.link}
            underline
            fontBold
          />
        </Container>
        <Container flex style={{ flexDirection: 'row', marginLeft: 6, marginTop: 14 }}>
          <Container style={{ marginTop: 6 }}>
            <Icon name="circle" size={7} color="#dadadb" />
          </Container>
          <TextContainer text="Leí el " marginLeft={16} />
          <TextContainer
            text="Aviso de privacidad"
            typography="link"
            textColor={theme.fontColor.link}
            underline
            fontBold
          />
        </Container>

        <Container flex style={{ flexDirection: 'row', marginLeft: 6, marginTop: 14 }}>
          <Container style={{ marginTop: 6 }}>
            <Icon name="circle" size={7} color="#dadadb" />
          </Container>
          <TextContainer text="Soy mayor de 18 años" marginLeft={16} />
        </Container>
      </Container>
      
      <Container crossCenter center row style={{ backgroundColor: theme.brandColor.iconn_warm_grey, marginTop: 320 }} height={71}>
        <Checkbox size='xxlarge' checked={value} onPress={() => setCheckBoxValue(!value)}>Acepto todo lo anterior</Checkbox>
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
          disabled={!value}
          onPress={onSubmit}
          fontSize="h4"
          fontBold
          size='large'
          style={{ marginTop: 8 }}
          rightIcon={<AntDesign name="arrowright" size={24} color="white" />}
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default TermsAndCondScreen;