import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, Image, Text, Dimensions } from 'react-native';
import { CustomText, TextContainer, Container, Touchable, TouchableText, Button, ReviewPercentage } from 'components';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { ICONN_BASKET } from 'assets/images';
import { ImagesCarusel } from 'components/molecules/ImagesCarusel';
import { FavoriteButton } from 'components/molecules';
import { CardProduct } from 'components/organisms/CardProduct';
import { Rating } from 'components/molecules/Rating';
import { getProductDetailById, getSkuFilesById, getProductSpecification } from 'services/vtexProduct.services';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import { vtexProductsServices } from 'services';
import {
  addFav,
  ExistingProductInCartInterface,
  FavoritesResponseInterface,
  getProductPriceByProductIdThunk,
  getProductRatingByProductIdThunk,
  ItemsFavoritesInterface,
  ListItemsWrapperInterface,
  NewFavoritesResponseInterface,
  ProductInterface,
  RootState,
  setFav,
  setFavId,
  UpdateType,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { useShoppingCart } from '../../home/hooks/useShoppingCart';
import { moderateScale } from 'utils/scaleMetrics';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { vtexUserServices } from 'services';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';

const CONTAINER_HEIGHT = Dimensions.get('window').height + 70;

interface Props {
  itemId: string;
  fetchReviewData: () => void;
  ratingCompleted: () => void;
  postRating: () => void;
  showModal?: () => void;
  closeModal?: () => void;
  star1?: number;
  star2?: number;
  star3?: number;
  star4?: number;
  star5?: number;
  totalCount?: number;
  average?: number;
  isReviewed?: boolean;
  prodId?: number;
  productPromotions: Map<string, Object>;
}

const ProductDetailScreen: React.FC<Props> = ({
  itemId,
  fetchReviewData,
  showModal,
  star1,
  star2,
  star3,
  star4,
  star5,
  totalCount,
  average,
  isReviewed,
  prodId,
  productPromotions
}) => {
  const { updateShoppingCartProduct } = useShoppingCart();
  const [productPrice, setProductPrice] = useState(0);
  const [productDetail, setProductDetail] = useState(Object);
  const [skusForProductImages, setSkusForProductImages] = useState([]);
  const [complementaryProducts, setComplementaryProducts] = useState<ProductInterface[]>([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [productRating, setProductRating] = useState(Object);
  const [productToUpdate, setProductToUpdate] = useState(Object);
  const [visible, setVisible] = useState<boolean>(false);
  const { detailSelected, cart } = useAppSelector((state: RootState) => state.cart);
  const [isFav, setIsFav] = useState<boolean>();
  const { favs, favsId, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const [favList, setFavList] = useState<ItemsFavoritesInterface[]>(favs);
  const [productId, setProductId] = useState<string>();
  const dispatch = useAppDispatch();

  itemId = detailSelected;

  // TODO: relocate all this urls to .ENV
  const fetchData = useCallback(async () => {
    console.log('itemmmm:::' + itemId);
    const imgRoot = 'https://oneiconn.vtexassets.com/arquivos/ids/';
    await getSkuFilesById(itemId)
      .then(async responseSku => {
        let skuForImages = [];
        if (responseSku) {
          if (responseSku.length > 0) {
            responseSku.map(sku => {
              skuForImages.push({ skuId: sku.Id, name: sku.Name, isMain: sku.IsMain, label: sku.Label, url: imgRoot + sku.ArchiveId + '-' + sku.Id + '-' });
            });
            setSkusForProductImages(skuForImages);
          }
        }
      })
      .catch(error => console.log(error));

    await getProductDetailById(itemId)
      .then(async responseProductDetail => {
        setProductDetail(responseProductDetail);
        console.log('DETAIL', responseProductDetail);
      })
      .catch(error => console.log(error));

    await vtexProductsServices
      .getProductPriceByProductId(itemId)
      .then(async responsePrice => {
        setProductPrice(responsePrice);
      })
      .catch(error => console.log(error));

    await vtexProductsServices
      .getProductRatingByProductId(itemId)
      .then(async responseRating => {
        setProductRating(responseRating);
      })
      .catch(error => console.log(error));

    setCartItemQuantity(isProductIdInShoppingCart(itemId));
  }, [cart, detailSelected]);

  // TODO: change the 147 by .ENV
  const getComplementaryProducts = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    vtexProductsServices
      .getProductsByCollectionId(global.complementry_products)
      .then(responseCollection => {
        const { Data } = responseCollection;
        let complementaryList = [];
        if (Data) {
          if (Data.length) {
            Data.map(product => {
              complementaryList.push({
                productId: product.ProductId,
                name: product.ProductName,
                image: { uri: product.SkuImageUrl }
              });
            });
            refillProductsWithPrice(existingProductsInCart, complementaryList);
          }
        }
      })
      .catch(error => console.log(error));
  };

  async function refillProductsWithPrice(existingProductsInCart: ExistingProductInCartInterface[], products: ProductInterface[]) {
    let productsToRender: ProductInterface[] = [];
    for (const p of products) {
      const price = await getPriceByProductId(p.productId);
      const raiting = await getRatingByProductId(p.productId);
      if (price && raiting) {
        p.oldPrice = price?.basePrice;
        p.price = price?.basePrice;
        p.ratingValue = raiting.average;
        p.quantity = existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0;
        productsToRender.push(p);
      }
    }
    console.log({ productsToRender });
    setComplementaryProducts(productsToRender);
  }

  const getPriceByProductId = async (productId: string) => {
    return await dispatch(getProductPriceByProductIdThunk(productId)).unwrap();
  };

  const getRatingByProductId = async (productId: string) => {
    return await dispatch(getProductRatingByProductIdThunk(productId)).unwrap();
  };

  const hideModalForAdult = () => {
    console.log('hideModalForAdult...');
    setVisible(false);
  };

  const showModalForAdult = () => {
    console.log('showModalForAdult...');
    setVisible(true);
  };

  const userUpdated = (productId: string) => {
    updateShoppingCartProduct!('create', productId);
    hideModalForAdult();
  }

  const validateCategoryForAddItem = (isAdult: boolean, productId: string) => {
    console.log('isAdult...');
    console.log(isAdult);
    console.log('isAdult...');
    console.log('pId', productId);
    if (isAdult) {
      console.log('updateShoppingCartProduct');
      updateShoppingCartProduct!('create', productId);
    } else {
      setProductId(productId);
      showModalForAdult();
    }
  };

  const validateAgeForAddItem = (itemId: string) => {
    console.log('validate itemId:::'+itemId+ 'userId'+user.userId);
    let isAdultInProductSpecification = false
    getProductSpecification(itemId).then(producSpecificationResponse => {
      console.log(producSpecificationResponse);
      if (producSpecificationResponse.length > 0) {
        console.log('tiene mas de uno');
        const { Value } = producSpecificationResponse[0];
        if (Value.length > 0) {
          isAdultInProductSpecification = (Value[0] == 'Sí');
          console.log('value validation: '+(Value[0] == 'Sí'));
        }
        if (isAdultInProductSpecification) {
          console.log('555:::');
          vtexUserServices.getUserByEmail(email!).then(userResponse => {
            console.log('depues de userbyemail');
            if (userResponse && userResponse.data) {
              console.log('en validacion de datos');
              console.log('userResponse', JSON.stringify(userResponse, null, 3));
              const { data } = userResponse;
              if (data[0].isAdult === true) {
                console.log('ya es adulto');
                updateShoppingCartProduct('create', itemId);
              } else {
                console.log('no es adulto');
                showModalForAdult();
              }
            }
          });
        } else {
          console.log('directo a agregar');
          updateShoppingCartProduct('create', itemId);
        }
      }else {
        console.log('directo a agregar');
        updateShoppingCartProduct('create', itemId);
      }
    })
  };

  const isProductIdInShoppingCart = productIde => {
    const { items } = cart;
    let quantityItem = 0;
    items.map(itm => {
      if (itm.productId == productIde) {
        quantityItem = itm.quantity;
      }
    });
    return quantityItem;
  };

  useEffect(() => {
    fetchData();
    setProductToUpdate(itemId);
  }, [cart, complementaryProducts, itemId, productToUpdate, detailSelected]);

  useEffect(() => {
    const existingProducts: ExistingProductInCartInterface[] = getExistingProductsInCart()!;
    getComplementaryProducts(existingProducts);
  }, [itemId, cart]);

  useEffect(() => {
    fetchReviewData();
  }, [itemId]);

  const getExistingProductsInCart = () => {
    const { items } = cart;
    if (items && items.length > 0) {
      const existingProducts: ExistingProductInCartInterface[] = items.map((p: any) => {
        const product: ExistingProductInCartInterface = {
          itemId: p.productId,
          quantity: p.quantity
        };
        return product;
      });
      return existingProducts;
    }
  };

  const getIsFavorite = () => {
    if (favs) {
      if (favs.length) {
        const favorite = favs.find(fav => itemId == fav.Id);
        if (favorite) {
          setIsFav(true);
        } else {
          setIsFav(false);
        }
      } else {
        setIsFav(false);
      }
    }
  };

  useEffect(() => {
    getIsFavorite();
  }, [isFav, favs]);

  const addFavorite1 = async (newFav: ItemsFavoritesInterface) => {
    if (favsId === '') {
      console.log('no hay favsid');
      const adding: ItemsFavoritesInterface[] = [];
      adding.push(newFav);
      dispatch(setFav(adding));
      uploadVtex(adding);
    } else {
      let copyFavs = favs;
      dispatch(addFav(newFav));
      console.log('INICIANDO', copyFavs);
      let copycopy = copyFavs.concat(newFav);
      console.log('ANTES VTEX', copycopy);
      const response = await uploadVtex(copycopy);
      console.log('TERMINANDO', copycopy, response);
    }
  };

  const uploadVtex = async (favs: ItemsFavoritesInterface[]) => {
    const response = await vtexFavoriteServices.patchFavorites(email as string, {
      id: favsId,
      email: email as string,
      ListItemsWrapper: [{ ListItems: favs, IsPublic: true, Name: 'Wishlist' }]
    });
    console.log('Añadiendo a vtex', response, favs);
    if (favsId === '') {
      dispatch(setFavId(response.DocumentId));
    }
  };

  const removeFavorite = (oldFav: ItemsFavoritesInterface) => {
    let copyFavs = favs;
    copyFavs.map(product => {
      if (product.Id == oldFav.Id) {
        const newFavList = copyFavs.filter(productf => productf.Id != oldFav.Id);
        let listItems: ListItemsWrapperInterface = {
          ListItems: newFavList,
          IsPublic: true,
          Name: 'Wishlist'
        };
        let tryList: FavoritesResponseInterface = {
          id: favsId,
          email: email as string,
          ListItemsWrapper: [listItems]
        };
        const response = uploadVtex(newFavList);
        setFavList(newFavList);
        dispatch(setFav(newFavList));
      }
    });
  };

  const updateFavorites = useCallback(async (updatedList: FavoritesResponseInterface | NewFavoritesResponseInterface, updateType: UpdateType) => {
    if (updateType === 'new') {
      const listNoId: NewFavoritesResponseInterface = {
        email: email as string,
        ListItemsWrapper: updatedList.ListItemsWrapper
      };
      const response = await vtexFavoriteServices.patchFavorites(email as string, listNoId);
    } else {
      const response = await vtexFavoriteServices.patchFavorites(email as string, updatedList);
    }
  }, []);

  const changeFavorite = () => {
    if (isFav) {
      const productToRemove: ItemsFavoritesInterface = {
        Id: itemId,
        Name: productDetail.Name
      };
      removeFavorite(productToRemove);
      setIsFav(!isFav);
    }
    if (!isFav) {
      const productToAdd: ItemsFavoritesInterface = {
        Id: itemId,
        Name: productDetail.Name
      };
      addFavorite1(productToAdd);
      setIsFav(!isFav);
    }
    console.log('ACTUAL FAVS', favs, favsId);
  };

  return (
    <>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          width: '100%'
        }}
      >
        <Container style={{ backgroundColor: theme.brandColor.white, width: '100%' }}>
          <Container backgroundColor="white">
            <Container>
              <ImagesCarusel
                imagesList={skusForProductImages}
                imageSize={240}
                selectecPointColor={theme.brandColor.iconn_dark_grey}
                generalPointsColor={theme.brandColor.iconn_grey}
              ></ImagesCarusel>
            </Container>
            <Container row space="between" style={{ marginTop: 16, width: '100%', paddingHorizontal: 10 }}>
              <Container row>
                <Rating ratingValue={productRating.average} />
                <TouchableText
                  marginLeft={8}
                  underline
                  textColor={theme.brandColor.iconn_accent_principal}
                  text={productRating.totalCount + ' Calificaciones'}
                  typography="h4"
                  fontBold
                  onPress={() => {}}
                  marginTop={8}
                />
              </Container>
              <Container>
                <FavoriteButton sizeIcon={moderateScale(24)} isFavorite={isFav as boolean} onPressItem={changeFavorite} />
              </Container>
            </Container>

            <Container style={{ marginTop: 16, paddingHorizontal: 10 }}>
              <TextContainer fontBold fontSize={theme.fontSize.h2} text={productDetail.Name} />
              <Container row>
                <TextContainer
                  marginTop={8}
                  marginRight={0}
                  fontBold
                  fontSize={theme.fontSize.h1}
                  text={
                    productPromotions != undefined && productPromotions.has('' + itemId)
                      ? productPromotions.get('' + itemId).promotionType == 'campaign' || productPromotions.get('' + itemId).promotionType == 'regular'
                        ? '$' +
                          ((productPrice != undefined && productPrice.basePrice ? productPrice.basePrice : 0) -
                            (parseInt(productPrice != undefined && productPrice.basePrice ? productPrice.basePrice : 0) *
                              productPromotions.get('' + itemId).percentualDiscountValue) /
                              100)
                        : ''
                      : ''
                  }
                ></TextContainer>
                {productPromotions != undefined && productPromotions.has('' + itemId) ? (
                  productPromotions.get('' + itemId).promotionType == 'campaign' || productPromotions.get('' + itemId).promotionType == 'regular' ? (
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textDecorationLine: 'line-through',
                        color: theme.brandColor.iconn_grey,
                        fontSize: theme.fontSize.h3,
                        marginTop: 11
                      }}
                    >
                      {'$' + (productPrice != undefined && productPrice.basePrice ? productPrice.basePrice : 0)}
                    </Text>
                  ) : (
                    <TextContainer
                      marginTop={8}
                      fontBold
                      fontSize={theme.fontSize.h1}
                      text={
                        '$' + (productPrice != undefined && productPrice.basePrice ? productPrice.basePrice : 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }
                    />
                  )
                ) : (
                  <TextContainer
                    marginTop={8}
                    fontBold
                    fontSize={theme.fontSize.h1}
                    text={
                      '$' + (productPrice != undefined && productPrice.basePrice ? productPrice.basePrice : 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }
                  />
                )}
              </Container>
              {productPromotions != undefined && productPromotions.has('' + itemId) ? (
                productPromotions.get('' + itemId).promotionType == 'campaign' || productPromotions.get('' + itemId).promotionType == 'regular' ? (
                  <Container style={styles.containerPorcentDiscount}>
                    <CustomText
                      fontSize={theme.fontSize.h6}
                      textColor={theme.brandColor.iconn_green_original}
                      fontWeight={'bold'}
                      text={
                        'ahorra $' +
                        (productPromotions != undefined && productPromotions.has('' + itemId)
                          ? productPromotions.get('' + itemId).promotionType == 'campaign' || productPromotions.get('' + itemId).promotionType == 'regular'
                            ? (parseInt(productPrice != undefined && productPrice.basePrice ? productPrice.basePrice : 0) *
                                productPromotions.get('' + itemId).percentualDiscountValue) /
                              100
                            : ''
                          : '')
                      }
                    />
                  </Container>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
              <TextContainer marginVertical={16} fontSize={theme.fontSize.h5} text={productDetail.DescriptionShort} />
            </Container>
          </Container>

          <Container
            style={{
              paddingTop: 0,
              paddingVertical: 10,
              paddingHorizontal: 5,
              display: 'flex',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: theme.brandColor.iconn_light_grey,
              borderTopWidth: 1,
              borderTopColor: theme.brandColor.iconn_light_grey,
              backgroundColor: 'white'
            }}
          >
            <Touchable
              marginTop={16}
              onPress={() => {
                setShowAdditionalInfo(!showAdditionalInfo);
              }}
            >
              <Container row space="between" style={{ paddingHorizontal: 10 }}>
                <CustomText text={'INFORMACIÓN ADICIONAL'} fontBold textColor={theme.brandColor.iconn_green_original} />
                <Icon name={showAdditionalInfo ? 'up' : 'down'} size={18} color={theme.brandColor.iconn_green_original} />
              </Container>
            </Touchable>
            {showAdditionalInfo ? (
              <Container style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <Container>
                  <TextContainer text="Descripción del producto" fontSize={12} textColor={theme.fontColor.paragraph} fontBold></TextContainer>
                  <Text numberOfLines={5} style={{ color: 'black', width: '100%', textAlign: 'justify' }}>
                    {productDetail.Description}
                  </Text>
                </Container>
                <Container style={{ marginTop: 20 }}>
                  <TextContainer text="Especificación del producto" fontSize={12} textColor={theme.fontColor.paragraph} fontBold></TextContainer>
                  <Text numberOfLines={5} style={{ color: 'black', width: '100%', textAlign: 'justify' }}>
                    {productDetail.Title}
                  </Text>
                </Container>
              </Container>
            ) : (
              <></>
            )}
          </Container>

          <Container style={{ paddingVertical: 10 }} backgroundColor={theme.brandColor.iconn_background}>
            <TextContainer text={`¿Un último antojo?`} fontBold typography="h4" marginHorizontal={16} marginVertical={16} />
            <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
              <Container row style={{ width: '100%', marginBottom: 20, paddingLeft: 5, paddingRight: 30 }}>
                {complementaryProducts.length ? (
                  complementaryProducts.map((prod, index) => {
                    return (
                      <CardProduct
                        image={prod.image!}
                        name={prod.name!}
                        ratingValue={prod.ratingValue!}
                        price={prod.price!}
                        productId={prod.productId}
                        quantity={prod.quantity!}
                        onPressAddCart={
                          validateCategoryForAddItem
                        }
                        onPressAddQuantity={() => {
                          updateShoppingCartProduct('add', prod.productId);
                        }}
                        onPressDeleteCart={() => {
                          updateShoppingCartProduct('remove', prod.productId);
                        }}
                        onPressDecreaseQuantity={() => {
                          updateShoppingCartProduct('substract', prod.productId);
                        }}
                        productPromotions={productPromotions}
                        onPressOut={hideModalForAdult}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </Container>
            </ScrollView>
          </Container>

          <Container style={{ paddingHorizontal: 20 }}>
            <ReviewPercentage
              average={average}
              reviews={totalCount}
              countUno={star1 / totalCount}
              countDos={star2 / totalCount}
              countTres={star3 / totalCount}
              countFour={star4 / totalCount}
              countFive={star5 / totalCount}
              percentUno={((star1 / totalCount) * 100).toFixed(0)}
              percentDos={((star2 / totalCount) * 100).toFixed(0)}
              percentTres={((star3 / totalCount) * 100).toFixed(0)}
              percentCuatro={((star4 / totalCount) * 100).toFixed(0)}
              percentCinco={((star5 / totalCount) * 100).toFixed(0)}
              reviewed={isReviewed}
              reviewProduct={showModal}
            />
          </Container>
        </Container>
        <AdultAgeVerificationScreen onPressClose={hideModalForAdult} visible={visible} productId={itemId} userUpdated={userUpdated}/>
      </ScrollView>
      <Container style={{ marginBottom: 20, paddingHorizontal: 16, paddingTop: 10, height: '15%' }}>
        {cartItemQuantity > 0 ? (
          <Container style={{height: 30}} >
            <QuantityProduct
              quantity={cartItemQuantity}
              onPressAddQuantity={() => {
                let currentQuantity = cartItemQuantity + 1;
                setCartItemQuantity(currentQuantity);
                updateShoppingCartProduct('add', itemId);
              }}
              onPressDeleteCart={() => {
                updateShoppingCartProduct('remove', itemId);
              }}
              onPressDecreaseQuantity={() => {
                let currentQuantity = cartItemQuantity - 1;
                setCartItemQuantity(currentQuantity);
                updateShoppingCartProduct('substract', itemId);
              }}
            />
          </Container>
        ) : (
          <Button
            icon={<Image source={ICONN_BASKET} tintColor="white" resizeMode="cover" style={{ width: 28, height: 28 }} />}
            round
            fontBold
            fontSize="h4"
            onPress={() => {
              validateAgeForAddItem(itemId);
            }}
          >
            Agregar a canasta
          </Button>
        )}
      </Container>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(160),
    minHeight: moderateScale(254),
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: moderateScale(16),
    borderRadius: moderateScale(10),
    padding: moderateScale(8)
  },
  subContainer: {
    flex: 1,
    width: '100%'
  },
  containerImage: {
    width: '100%',
    height: moderateScale(90),
    alignItems: 'flex-end'
  },
  containerPorcentDiscount: {
    width: moderateScale(84),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerTitle: {
    width: '100%',
    minHeight: moderateScale(45),
    marginTop: moderateScale(10)
  },
  containerRating: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(9),
    alignItems: 'center'
  },
  containerPrice: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(15),
    alignItems: 'center'
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain'
  },
  containerButton: {
    flex: 0.25,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: theme.brandColor.iconn_white,
    paddingTop: 10
  },
  buttonAddProduct: {
    borderRadius: moderateScale(10)
  }
});
