import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { CustomText, TextContainer, Container, Touchable, TouchableText, Button, ReviewPercentage } from 'components';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { ICONN_BASKET } from 'assets/images';
import { ImagesCarusel} from 'components/molecules/ImagesCarusel';
import { CardProduct} from 'components/organisms/CardProduct';
import { Rating } from 'components/molecules/Rating';
import { getProductDetailById,getSkuFilesById } from 'services/vtexProduct.services';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import { vtexProductsServices } from 'services';
import { RootState, useAppSelector } from 'rtk';
import { useShoppingCart } from '../../home/hooks/useShoppingCart';
import { setDetailSelected } from 'rtk/slices/cartSlice';

interface Props {
  itemId: string;
   fetchReviewData: () => void;
   ratingCompleted: () => void;
   postRating: () => void;
   showModal?: () => void;
   closeModal?: () => void;
   star1?:number;
   star2?:number;
   star3?:number;
   star4?:number;
   star5?:number;
   totalCount?:number;
   average?:number;
   isReviewed?:boolean;
   prodId?:number;
 }
 
 const ProductDetailScreen: React.FC<Props> = ({itemId, fetchReviewData, showModal, star1, star2, star3, star4, star5, totalCount, average, isReviewed, prodId}) => {
  const { updateShoppingCartProduct } = useShoppingCart();
  const [productPrice, setProductPrice] = useState(0);
  const [productDetail, setProductDetail] = useState(Object);
  const [skusForProductImages, setSkusForProductImages] = useState([]);
  const [complementaryProducts, setComplementaryProducts] = useState([]);  
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [productRating, setProductRating] = useState(Object);
  const [productToUpdate, setProductToUpdate] = useState(Object);
  const { detailSelected, cart } = useAppSelector((state: RootState) => state.cart);
  itemId = detailSelected;

  const fetchData = useCallback(async () => {
    console.log('itemmmm:::'+itemId);
    const imgRoot = "https://oneiconn.vtexassets.com/arquivos/ids/"
    await getSkuFilesById(itemId).then(async responseSku => {
      let skuForImages = [];
      if(responseSku){
        if(responseSku.length>0){
          responseSku.map((sku) => {
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
    }).catch((error) => console.log(error));
    
    await getProductDetailById(itemId).then(async responseProductDetail => {
      setProductDetail(responseProductDetail);
    }).catch((error) => console.log(error));

    await vtexProductsServices.getProductPriceByProductId(itemId).then(async responsePrice => {
      setProductPrice(responsePrice);
    }).catch((error) => console.log(error));

    await vtexProductsServices.getProductRatingByProductId(itemId).then(async responseRating => {
      setProductRating(responseRating);
    }).catch((error) => console.log(error));

    setCartItemQuantity(isProductIdInShoppingCart(itemId));
  }, [cart, detailSelected]);

  const getComplementaryProducts = useCallback(async () => {
    vtexProductsServices.getProductsByCollectionId("143").then(responseCollection => {
      const { Data } = responseCollection;
      let complementaryList = [];
      if (Data) {
        if (Data.length > 0) {
          Data.map((product) => {
           vtexProductsServices.getProductPriceByProductId(product.ProductId).then(async responsePrice => {
              if (responsePrice) {
                complementaryList.push({ productId: product.ProductId, name: product.ProductName, image: { uri: product.SkuImageUrl }, price: responsePrice.basePrice, quantity: isProductIdInShoppingCart(product.ProductId) });
              }
            }).catch((error) => console.log(error));
          })
        }
      }
      setComplementaryProducts(complementaryList);
    }).catch((error) => console.log(error));
  }, [itemId]);

  const isProductIdInShoppingCart = (productId) => {
    const { items } = cart;
    let quantityItem = 0;
    items.map((itm) => {
      if(itm.productId==productId){
        quantityItem = itm.quantity;
      }
    });
    return quantityItem;
  }

  useEffect(() => {
    fetchData();
    setProductToUpdate(itemId);
  }, [cart, complementaryProducts, itemId, productToUpdate, detailSelected]);
  
  useEffect(() => {
    getComplementaryProducts();
  }, []);

  useEffect(() => {
    fetchReviewData();
  }, [itemId]);

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
              <Rating ratingValue={productRating.average}/><TouchableText
                  marginLeft={8}
                  underline
                  textColor={theme.brandColor.iconn_accent_principal}
                  text={productRating.totalCount+" Calificaciones"}
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
            <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
              <Container row style={{ height: 200, width: '100%' }}>
                {
                  complementaryProducts.length > 0 ?
                    complementaryProducts.map((prod, index) => {
                      return (
                        <CardProduct
                          image={prod.image!}
                          name={prod.name!}
                          price={prod.price!}
                          productId={prod.productId}
                          quantity={prod.quantity!}
                          onPressAddCart={() => {
                            complementaryProducts[index].quantity = 1;
                            updateShoppingCartProduct('create', prod.productId);
                          }}
                          onPressAddQuantity={() => {
                            complementaryProducts[index].quantity = complementaryProducts[index].quantity+1;
                            updateShoppingCartProduct('add', prod.productId);
                          }}
                          onPressDeleteCart={() => {
                            complementaryProducts[index].quantity = 0;
                            updateShoppingCartProduct('remove', prod.productId);
                          }}
                          onPressDecreaseQuantity={() => {
                            complementaryProducts[index].quantity = complementaryProducts[index].quantity - 1;
                            updateShoppingCartProduct('substract', prod.productId);
                          }}
                        />
                      )
                    }
                    ) : <></>
                }
              </Container>
            </ScrollView>
        </Container>

          <ReviewPercentage
          average={average}
          reviews={totalCount}
          countUno={((star1/totalCount))}
          countDos={((star2/totalCount))}
          countTres={((star3/totalCount))}
          countFour={((star4/totalCount))}
          countFive={((star5/totalCount))}
          percentUno={((star1/totalCount)*100).toFixed(0)}
          percentDos={((star2/totalCount)*100).toFixed(0)}
          percentTres={((star3/totalCount)*100).toFixed(0)}
          percentCuatro={((star4/totalCount)*100).toFixed(0)}
          percentCinco={((star5/totalCount)*100).toFixed(0)}
          reviewed={isReviewed}
          reviewProduct={showModal}
          />
        </Container>

        <Container style={{marginBottom:16}}>
        {
          cartItemQuantity>0?
        <QuantityProduct
            quantity={cartItemQuantity}
            onPressAddQuantity={() => {
              let currentQuantity = cartItemQuantity+1;
              setCartItemQuantity(currentQuantity);
              updateShoppingCartProduct('add', itemId);
            }}
            onPressDeleteCart={() => {
              updateShoppingCartProduct('remove', itemId);
            }}
            onPressDecreaseQuantity={() => {
              let currentQuantity = cartItemQuantity-1;
              setCartItemQuantity(currentQuantity);
              updateShoppingCartProduct('substract', itemId);
            }}
          />:
                    <Button
                      icon={<Image source={ICONN_BASKET} tintColor="white" resizeMode="cover" style={{ width: 28, height: 28}} />}
                      round
                      fontBold
                      fontSize="h4"
                      onPress={() => {
                        updateShoppingCartProduct('create', itemId);
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
