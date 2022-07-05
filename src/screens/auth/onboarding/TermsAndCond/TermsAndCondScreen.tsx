import { Image, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox, Container } from 'components/atoms';
import { TextContainer, Button } from 'components/molecules';
import { ICONN_DOCUMENT_EDIT } from 'assets/images';
import { RootState, setTermsAndCond, useAppDispatch, useAppSelector } from 'rtk';

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
      style={{ flex: 1, flexDirection: 'column' }}
      contentContainerStyle={{
        justifyContent: 'space-between',
        flexGrow: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        width: '100%'
      }}
    >
      <Container>
        <Container flex style={{ marginTop: 32, marginLeft: 16 }}>
        <Image source={ICONN_DOCUMENT_EDIT}  style={{height: 48, width:48}}/>
        </Container>
        <TextContainer
          text="Términos y Condiciones"
          typography="h2"
          fontBold={true}
          marginLeft={16}
          marginTop={20}
        />
        <TextContainer
          text="Confirmo que:"
          typography="placeholder"
          textColor={theme.fontColor.paragraph}
          marginLeft={16}
          marginTop={20}
        />
        <Container
          flex
          style={{ flexDirection: 'row', marginLeft: 16, marginTop: 14 }}
        >
          <Container style={{ marginTop: 6 }}>
            <Icon name="circle" size={6} color="#dadadb" />
          </Container>
          <TextContainer text="Revisé los " marginLeft={16} />
          <TextContainer
            text="Términos de uso"
            typography="link"
            textColor={theme.fontColor.link}
            underline={true}
            fontBold={true}
          />
        </Container>
        <Container
          flex
          style={{ flexDirection: 'row', marginLeft: 16, marginTop: 14 }}
        >
          <Container style={{ marginTop: 6 }}>
            <Icon name="circle" size={6} color="#dadadb" />
          </Container>
          <TextContainer text="Leí el " marginLeft={16} />
          <TextContainer
            text="Aviso de privacidad"
            typography="link"
            textColor={theme.fontColor.link}
            underline={true}
            fontBold={true}
          />
        </Container>
        <Container
          flex
          style={{ flexDirection: 'row', marginLeft: 16, marginTop: 14 }}
        >
          <Container style={{ marginTop: 6 }}>
            <Icon name="circle" size={6} color="#dadadb" />
          </Container>
          <TextContainer text="Soy mayor de 18 años" marginLeft={16} />
        </Container>
      </Container>
      <Container crossCenter center row style={{ backgroundColor: theme.brandColor.iconn_warm_grey }} height={71}>
        <Checkbox checked={value} onPress={() => setCheckBoxValue(!value)}>Acepto todo lo anterior</Checkbox>
      </Container>
      <Container
        row
        style={{ marginBottom: 24, justifyContent: 'space-around' }}
      >
        <Button
          icon={<Icon name="arrow-left" size={24} />}
          leftIconStyle={styles.iconIconButton}
          onPress={goBack}
          color={'iconn_light_grey'}
          round={true}
          textStyle={styles.iconButton}
        >
          {' '}
          {}
        </Button>
        <Button
          disabled={!value}
          round
          onPress={onSubmit}
          rightIcon={
            <Icon
              name="arrow-right"
              size={24}
              color={theme.brandColor.iconn_white}
            />
          }
          textStyle={styles.textIconButton}
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textIconButton: {
    marginRight: 8,
    fontSize: theme.fontSize.h4
  },
  iconButton: {
    marginLeft: 0
  },
  iconIconButton: {
    marginLeft: 20
  }
});

export default TermsAndCondScreen;
