import { Button, Container, CustomText, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props { 
  addRFC: () => void
}

const TaxDataScreen: React.FC<Props> = ({ addRFC }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 0,
        paddingTop: 0
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex style={{ backgroundColor: theme.brandColor.iconn_background }}>
        <Container backgroundColor={theme.fontColor.white} style={{ marginTop: 24, width: 357, height: 120, borderRadius: 5 }}>
          <TextContainer
            textColor={theme.fontColor.dark}
            typography="h4"
            fontBold
            text={`RAPA880105P32`}
            marginTop={21}
          ></TextContainer>
          <TextContainer
            textColor={theme.fontColor.dark}
            typography="h4"
            fontBold
            text={`Alejandra Ramírez Pedroza`}
            marginTop={8}
          ></TextContainer>
          <Container flex row style={{ marginTop: 17 }}>
            <Icon
              name="checkcircle"
              size={18}
              color={theme.brandColor.iconn_success}
              style={{ marginRight: 5 }}
            />
            <CustomText
              textColor={theme.brandColor.iconn_green_original}
              text={'Predeterminado'}
              typography="h5"
              fontWeight="normal"
            />
            <Icon
              name="right"
              size={20}
              color={theme.fontColor.dark_grey}
              style={{ marginStart: '55%', margin: -60, fontWeight: 'bold' }}
            />
          </Container>
        </Container>
        <Container backgroundColor={theme.fontColor.white} style={{ marginTop: 12, width: 357, height: 80, borderRadius: 5 }}>
          <TextContainer
            textColor={theme.fontColor.dark}
            typography="h3"
            fontBold
            text={`CITI9603266E3`}
            marginTop={21}
          ></TextContainer>
          <TextContainer
            textColor={theme.fontColor.dark}
            typography="h5"
            text={`CITI Value in real time`}
            marginTop={8}
          ></TextContainer>
          <Container flex row style={{ marginTop: 17 }}>
            <Icon
              name="right"
              size={20}
              color={theme.fontColor.dark_grey}
              style={{ marginStart: '90%', margin: -60, fontWeight: 'bold' }}
            />
          </Container>
        </Container>
        <Container backgroundColor={theme.fontColor.white} style={{ marginTop: 12, width: 357, height: 80, borderRadius: 5 }}>
          <TextContainer
            textColor={theme.fontColor.dark}
            typography="h3"
            fontBold
            text={`CITI9603266987`}
            marginTop={21}
          ></TextContainer>
          <TextContainer
            textColor={theme.fontColor.dark}
            typography="h5"
            text={`CORPORACION EN INVESTIGACION…`}
            marginTop={8}
          ></TextContainer>
          <Container flex row style={{ marginTop: 17 }}>
            <Icon
              name="right"
              size={20}
              color={theme.fontColor.dark_grey}
              style={{ marginStart: '90%', margin: -60, fontWeight: 'bold' }}
            />
          </Container>
        </Container>
        <Container style={{ marginTop: 320, marginBottom: 24 }}>
          <Button
            length="long"
            round
            disabled={false}
            onPress={addRFC}
            fontSize="h3"
            fontBold
          >
            + Agregar RFC
          </Button>
        </Container>
      </Container>

    </ScrollView>
  );
};

export default TaxDataScreen;