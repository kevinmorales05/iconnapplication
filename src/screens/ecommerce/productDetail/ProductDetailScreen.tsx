import React, { useEffect, useState } from 'react';
import { ScrollView, Image, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking, View } from 'react-native';
import { Input, CustomText, TextContainer, Container, Touchable, TouchableText, Button } from 'components';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { Background } from '@react-navigation/elements';
import { ICONN_ADDRESS_FIND, ICONN_BASKET } from 'assets/images';
import { Rating } from 'components/molecules/Rating';

const funcion = () =>{
  console.log("test");
}

const ProductDetailScreen = () => {

  return (
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1
      }}>
      <Container style={{flex: 1, marginTop: 20, backgroundColor:theme.brandColor.iconn_background }} >
            <Container backgroundColor="white">

              <Container style={{padding:16, opacity:0.2}} backgroundColor="gray" >
              <TextContainer text='image component'></TextContainer>
              </Container>

              <Container row style={{marginTop:16}}>
              <Rating ratingValue={3.5}/><TouchableText
                  marginLeft={8}
                  underline
                  textColor={theme.brandColor.iconn_accent_principal}
                  text="65 Calificaciones"
                  typography="h4"
                  fontBold
                  onPress={()=>{}}
                  marginTop={8}
                />
              </Container>

              <Container style={{marginTop:16}}>
              <TextContainer fontBold fontSize={theme.fontSize.h2} text='Palomitas Act II para Microondas Mantequilla 90g'/>
              <TextContainer marginTop={8} fontBold fontSize={theme.fontSize.h1} text='$22.50'/>
              <TextContainer marginVertical={16} fontSize={theme.fontSize.h5} text='Descripción breve del producto que puede leerse a primera vista.'/>
              </Container>

            </Container>

        <Touchable marginTop={16}>
          <Container
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              display: 'flex',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: theme.brandColor.iconn_light_grey,
              backgroundColor: "white"
            }}
            row
          >
           <CustomText text={'INFORMACIÓN ADICIONAL'} fontBold textColor={theme.brandColor.iconn_green_original} />
           <Icon name="down" size={18} color={theme.brandColor.iconn_green_original} />

              <Container style={{ flexDirection: 'row', alignItems: 'center' }}>
          </Container>
          </Container>
        </Touchable>

        <Container height={342} style={{ marginTop: 16 }} backgroundColor={theme.brandColor.iconn_background}>
            <Container row space="between" style={{ margin: 16 }}>
              <TextContainer text={`Productos Complementarios`} fontBold typography="h4" />
            </Container>
          </Container>

          <Container height={342} style={{ marginTop: 16 }} backgroundColor={theme.brandColor.iconn_white}>
            <Container style={{ margin: 16 }}>
            <TextContainer text={`Calificaciones de clientes`} fontBold typography="h4" />
            </Container>
          </Container>

        </Container>

        <Container style={{marginBottom:16}}>
                    <Button
                      icon={<Image source={ICONN_BASKET} tintColor="white" resizeMode="cover" style={{ width: 28, height: 28}} />}
                      round
                      fontBold
                      fontSize="h4"
                      onPress={() => console.log("sdhfih")}
                      >
                      Agregar a canasta
                    </Button>
          </Container>
    </ScrollView>
  );
};

export default ProductDetailScreen;
