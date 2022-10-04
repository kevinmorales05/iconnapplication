import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Image, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, CustomText, TextContainer, Container, Touchable, TouchableText, Button } from 'components';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { Background } from '@react-navigation/elements';
import { ICONN_ADDRESS_FIND, ICONN_BASKET } from 'assets/images';
import { ImagesCarusel} from 'components/molecules/ImagesCarusel';
import { Rating } from 'components/molecules/Rating';
import { getProductDetailById,getSkuFilesById, getProductPriceById } from 'services/vtexProduct.services';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import { RootState, useAppSelector } from 'rtk';
import { useShoppingCart } from '../../home/hooks/useShoppingCart';
//import { useShoppingCart } from './hooks/useShoppingCart';

const ProductDetailScreen = (itemId) => {
  const { updateShoppingCartProduct } = useShoppingCart();
  const [productPrice, setProductPrice] = useState(0);
  const [productDetail, setProductDetail] = useState(Object);
  const [skusForProductImages, setSkusForProductImages] = useState([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const fetchData = useCallback(async () => {
    const imgRoot = "https://oneiconn.vtexassets.com/arquivos/ids/"
    console.log('itemId:::',itemId.productIdentifier);
    await getSkuFilesById(itemId.productIdentifier).then(async responseSku => {
      console.log("2222");
      console.log(JSON.stringify(responseSku, null, 4));
      let skuForImages = [];
      if(responseSku){
        if(responseSku.length){
          responseSku.map((sku) => {
            console.log({ skuId: sku.Id, name: sku.Name, isMain: sku.IsMain, label: sku.Label, url: imgRoot+sku.ArchiveId + '-' + sku.Id + '-' + 100});
            skuForImages.push({ skuId: sku.Id, name: sku.Name, isMain: sku.IsMain, label: sku.Label, url: imgRoot+ sku.ArchiveId + '-' + sku.Id + '-'});
          })
          const imgsForTest =
            [
              { isMain: true, label: "", name: "01-coca", skuId: 456, url: "https://oneiconn.vtexassets.com/arquivos/ids/155405-456-", valueX:0},
              { isMain: false, label: "", name: "02-bonafont", skuId: 457, url: "https://oneiconn.vtexassets.com/arquivos/ids/155406-457-", valueX:240},
              { isMain: false, label: "", name: "04-gatorade", skuId: 458, url: "https://oneiconn.vtexassets.com/arquivos/ids/155407-458-", valueX:480},
              { isMain: false, label: "", name: "05-Cafe-Ole", skuId: 459, url: "https://oneiconn.vtexassets.com/arquivos/ids/155408-459-", valueX:720 },
              { isMain: false, label: "", name: "06-Chips-Jalapenos", skuId: 460, url: "https://oneiconn.vtexassets.com/arquivos/ids/155410-461-", valueX:960 },
              { isMain: false, label: "", name: "07-cacahuates", skuId: 461, url: "https://oneiconn.vtexassets.com/arquivos/ids/155411-462-", valueX:1200 },
              { isMain: false, label: "", name: "09-Palomitas", skuId: 462, url: "https://oneiconn.vtexassets.com/arquivos/ids/155412-463-", valueX:1440 },
              { isMain: false, label: "", name: "08-Paketazo", skuId: 462, url: "https://oneiconn.vtexassets.com/arquivos/ids/155413-464-", valueX:1680 }
            ];
          setSkusForProductImages(/*imgsForTest*/skuForImages);
        }
      }
      console.log("2222");
    }).catch((error) => console.log(error));
    
    await getProductDetailById(itemId.productIdentifier).then(async responseProductDetail => {
      console.log("1234567");
      console.log(JSON.stringify(responseProductDetail, null, 4));
      setProductDetail(responseProductDetail);
      console.log("1234567");
    }).catch((error) => console.log(error));

    await getProductPriceById(itemId.productIdentifier).then(async responsePrice => {
      console.log('333333');
      console.log(JSON.stringify(responsePrice, null, 4));
      setProductPrice(responsePrice);
      console.log('333333');
    }).catch((error) => console.log(error));

    const { items } = cart;
    let quantityItem = 0;
    items.map((itm) => {
      console.log('productId: '+itm.productId+' quantity: '+itm.quantity);
      if(itm.productId===itemId.productIdentifier){
        quantityItem = itm.quantity;
        setCartItemQuantity(itm.quantity);
      }
    });
    console.log('quantityItem:::'+cartItemQuantity+' productIdentifier:::'+itemId.productIdentifier);
  }, []);

  useEffect(() => {
    fetchData();
  }, [cart]);

  return (
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1
      }}>
      <Container style={{flex: 1, marginTop: 20, backgroundColor:theme.brandColor.iconn_background }} >
            <Container backgroundColor="white">
              <Container>
            <Container >
              <ImagesCarusel imagesList={skusForProductImages} 
              imageSize={240} 
              selectecPointColor={theme.brandColor.iconn_dark_grey} 
              generalPointsColor={theme.brandColor.iconn_grey}></ImagesCarusel>
            </Container>
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
              <TextContainer fontBold fontSize={theme.fontSize.h2} text={productDetail.Name}/>
              <TextContainer marginTop={8} fontBold fontSize={theme.fontSize.h1} text={'$'+ (productPrice!=undefined && productPrice.basePrice?productPrice.basePrice:0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}/>
              <TextContainer marginVertical={16} fontSize={theme.fontSize.h5} text={productDetail.DescriptionShort}/>
              </Container>

            </Container>

        

          <Container style={{
              paddingVertical: 10,
              display: 'flex',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: theme.brandColor.iconn_light_grey,
              backgroundColor: "white"
            }}
            >
            <Touchable marginTop={16} onPress={() => { setShowAdditionalInfo(!showAdditionalInfo) }}>
              <Container row space='between' style={{ paddingHorizontal: 16,width: '100%' }}>
                <CustomText text={'INFORMACIÓN ADICIONAL'} fontBold textColor={theme.brandColor.iconn_green_original} />
                <Icon name={showAdditionalInfo?"up":"down"} size={18} color={theme.brandColor.iconn_green_original} />
              </Container>
            </Touchable>
            {
              showAdditionalInfo ?
                <Container style={{ marginTop: 10 }}>
                  <Container>
                    <TextContainer text="Descripciòn del producto" fontSize={12} textColor={theme.fontColor.paragraph} fontBold ></TextContainer>
                    <Text numberOfLines={5} style={{ color: 'black', width: '100%', textAlign: 'justify' }}>
                      {productDetail.Description}
                    </Text>
                  </Container>
                  <Container style={{ marginTop: 20 }}>
                    <TextContainer text="Especificaciòn del producto" fontSize={12} textColor={theme.fontColor.paragraph} fontBold ></TextContainer>
                    <Text numberOfLines={5} style={{ color: 'black', width: '100%', textAlign: 'justify' }}>
                      {productDetail.Title}
                    </Text>
                  </Container>
                </Container>

                : <></>
            }
          </Container>
        

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
        {
          true?
        <QuantityProduct
            quantity={cartItemQuantity}
            onPressAddQuantity={() => {
              updateShoppingCartProduct('add', itemId.productIdentifier);
            }}
            onPressDeleteCart={() => {
              updateShoppingCartProduct('remove', itemId.productIdentifier);
            }}
            onPressDecreaseQuantity={() => {
              updateShoppingCartProduct('substract', itemId.productIdentifier);
            }}
          />:
                    <Button
                      icon={<Image source={ICONN_BASKET} tintColor="white" resizeMode="cover" style={{ width: 28, height: 28}} />}
                      round
                      fontBold
                      fontSize="h4"
                      onPress={() => {
                        updateShoppingCartProduct('create', itemId.productIdentifier);
                      }}
                      >
                      Agregar a canasta
                    </Button>
          }
          </Container>
    </ScrollView>
  );
};

export default ProductDetailScreen;
