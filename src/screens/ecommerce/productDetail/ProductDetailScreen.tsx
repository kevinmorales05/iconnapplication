import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, Image, Text } from 'react-native';
import { CustomText, TextContainer, Container, Touchable, TouchableText, Button, ReviewPercentage, CardProductSkeleton } from 'components';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { ICONN_REVERSE_BASKET } from 'assets/images';
import { ImagesCarusel } from 'components/molecules/ImagesCarusel';
import { FavoriteButton } from 'components/molecules';
import { CardProduct } from 'components/organisms/CardProduct';
import { Rating } from 'components/molecules/Rating';
import { getProductSpecification } from 'services/vtexProduct.services';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import {
  addFav,
  ExistingProductInCartInterface,
  getProductsByCollectionIdThunk,
  ItemsFavoritesInterface,
  ProductCacheInterface,
  ProductDeatilCacheInterface,
  ProductInterface,
  ProductResponseInterface,
  ProductsByCollectionInterface,
  RootState,
  setFav,
  setFavId,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { useShoppingCart } from '../../home/hooks/useShoppingCart';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { vtexUserServices } from 'services';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';
import Config from 'react-native-config';
import { logEvent } from 'utils/analytics';
import { homeServices } from 'services/home-services';
import { useLoading } from 'context';

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
}

const ProductDetailScreen: React.FC<Props> = ({ fetchReviewData, showModal, star1, star2, star3, star4, star5, totalCount, average, isReviewed }) => {
  const { updateShoppingCartProduct } = useShoppingCart();
  const [productDetail, setProductDetail] = useState<ProductDeatilCacheInterface>({});
  const [skusForProductImages, setSkusForProductImages] = useState([]);
  const [complementaryProducts, setComplementaryProducts] = useState<ProductInterface[]>([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const { detailSelected, cart } = useAppSelector((state: RootState) => state.cart);
  const [isFav, setIsFav] = useState<boolean>();
  const { favs, favsId, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const dispatch = useAppDispatch();
  const { COMPLEMENTRY_PRODUCTS } = Config;
  const loader = useLoading();

  const itemId = detailSelected;

  const fetchDataProduct = useCallback(async () => {
    loader.show();
    const productInfo: ProductCacheInterface = {
      store: defaultSeller?.Campo ? Number.parseInt(defaultSeller.seller.split('oneiconntienda')[1], 10) : 0
    };
    const response = await homeServices.getProductCacheDetailById(itemId, productInfo);
    if (response.responseCode === 604) {
      const productDeatil: ProductDeatilCacheInterface = {
        Name: response.data.ProductName,
        Title: response.data.Title ? response.data.Title : response.data.ProductName,
        Description: response.data.Description,
        DescriptionShort: response.data.DescriptionShort,
        selling_price: response.data.selling_price,
        promotionType: response.data.promotion ? response.data.promotion.type : undefined,
        maximumUnitPriceDiscount: response.data.promotion ? response.data.promotion.maximum_unit_price_discount : undefined,
        percentualDiscountValue: response.data.promotion ? response.data.promotion.percentualDiscountValue : undefined,
        average: response.data.qualificationAverage,
        totalCount: response.data.totalCount ? response.data.totalCount : 0,
        costDiscountPrice: response.data.promotion ? response.data.promotion.costDiscountPrice : '',
        promotionName: response.data.promotion ? response.data.promotion.name : ''
      };
      // console.log({ response: productDeatil });
      const image = {
        url: response.data.SkuImageUrl,
        isMain: true
      };
      setProductDetail(productDeatil);
      setCartItemQuantity(isProductIdInShoppingCart(itemId));
      setSkusForProductImages([image]);
    }
    loader.hide();
    setIsLoader(false);
  }, [cart, detailSelected]);

  const getComplementaryProducts = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    const productComplementary: ProductsByCollectionInterface = {
      collectionId: Number.parseInt(COMPLEMENTRY_PRODUCTS ? COMPLEMENTRY_PRODUCTS : '0', 10),
      pageSize: 7,
      pageNumber: 0,
      selectedStore: defaultSeller?.Campo ? defaultSeller.seller.split('oneiconntienda')[1] : undefined
    };
    const response = await dispatch(getProductsByCollectionIdThunk(productComplementary)).unwrap();
    if (response.responseCode === 603) {
      const productsArr: ProductInterface[] = response.data.products.map(
        ({ ProductId, ProductName, SkuImageUrl, qualificationAverage, sellingPrice }: ProductResponseInterface) => ({
          productId: ProductId,
          name: ProductName ? ProductName : '',
          image: { uri: SkuImageUrl },
          price: Number.parseFloat(sellingPrice),
          oldPrice: Number.parseFloat(sellingPrice),
          porcentDiscount: 0,
          quantity: 0,
          ratingValue: qualificationAverage
        })
      );
      refillProductsWithPrice(existingProductsInCart, productsArr);
    }
  };

  async function refillProductsWithPrice(existingProductsInCart: ExistingProductInCartInterface[], products: ProductInterface[]) {
    let productsToRender: ProductInterface[] = [];
    for (const p of products) {
      p.quantity = existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0;
      productsToRender.push(p);
    }
    setComplementaryProducts(productsToRender);
  }

  const hideModalForAdult = () => {
    setVisible(false);
  };

  const showModalForAdult = () => {
    setVisible(true);
  };

  const userUpdated = (productId: string) => {
    updateShoppingCartProduct!('create', productId);
    hideModalForAdult();
  };

  const validateCategoryForAddItem = (isAdult: boolean, productId: string) => {
    if (isAdult) {
      logEvent('addProduct', {
        id: user.id,
        description: 'Añadir un producto de la canasta en la colección',
        productId: productId.toString()
      });
      updateShoppingCartProduct!('create', productId);
    } else {
      showModalForAdult();
    }
  };

  const validateAgeForAddItem = (itemId: string) => {
    let isAdultInProductSpecification = false;
    getProductSpecification(itemId).then(producSpecificationResponse => {
      if (producSpecificationResponse.length > 0) {
        const { Value } = producSpecificationResponse[0];
        if (Value.length > 0) {
          isAdultInProductSpecification = Value[0] == 'Sí';
        }
        if (isAdultInProductSpecification) {
          vtexUserServices.getUserByEmail(email!).then(userResponse => {
            if (userResponse && userResponse.data) {
              const { data } = userResponse;
              if (data[0].isAdult === true) {
                updateShoppingCartProduct('create', itemId);
                logEvent('pdAddProductProduct', {
                  id: user.id,
                  description: 'Añadir producto de la canasta en detalle de producto',
                  productId: itemId.toString()
                });
              } else {
                showModalForAdult();
              }
            }
          });
        } else {
          updateShoppingCartProduct('create', itemId);
          logEvent('pdAddProductProduct', {
            id: user.id,
            description: 'Añadir producto de la canasta en detalle de producto',
            productId: itemId.toString()
          });
        }
      } else {
        updateShoppingCartProduct('create', itemId);
        logEvent('pdAddProductProduct', {
          id: user.id,
          description: 'Añadir producto de la canasta en detalle de producto',
          productId: itemId.toString()
        });
      }
    });
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
    if (!isLoader) {
      setIsLoader(true);
      fetchDataProduct();
    }
  }, [cart, itemId, detailSelected]);

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
      const adding: ItemsFavoritesInterface[] = [];
      adding.push(newFav);
      dispatch(setFav(adding));
      uploadVtex(adding);
    } else {
      let copyFavs = favs;
      dispatch(addFav(newFav));
      let copycopy = copyFavs.concat(newFav);
      await uploadVtex(copycopy);
    }
  };

  const uploadVtex = async (favs: ItemsFavoritesInterface[]) => {
    const response = await vtexFavoriteServices.patchFavorites(email as string, {
      id: favsId,
      email: email as string,
      ListItemsWrapper: [{ ListItems: favs, IsPublic: true, Name: 'Wishlist' }]
    });
    if (favsId === '') {
      dispatch(setFavId(response.DocumentId));
    }
  };

  const removeFavorite = (oldFav: ItemsFavoritesInterface) => {
    let copyFavs = favs;
    copyFavs.forEach(product => {
      if (product.Id == oldFav.Id) {
        const newFavList = copyFavs.filter(productf => productf.Id != oldFav.Id);
        uploadVtex(newFavList);
        dispatch(setFav(newFavList));
      }
    });
  };

  const changeFavorite = () => {
    if (isFav) {
      const productToRemove: ItemsFavoritesInterface = {
        Id: itemId,
        Name: productDetail.Name
      };
      removeFavorite(productToRemove);
      setIsFav(!isFav);
      logEvent('pdRemoveFavorite', {
        id: user.id,
        description: 'Remover favorito en detalle de producto',
        productId: itemId.toString()
      });
    }
    if (!isFav) {
      const productToAdd: ItemsFavoritesInterface = {
        Id: itemId,
        Name: productDetail.Name
      };
      addFavorite1(productToAdd);
      setIsFav(!isFav);
      logEvent('pdAddFavorite', {
        id: user.id,
        description: 'Añadir favorito en detalle de producto',
        productId: itemId.toString()
      });
    }
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
            <Container style={{ marginTop: moderateScale(10) }}>
              <ImagesCarusel
                imagesList={skusForProductImages}
                imageSize={240}
                selectecPointColor={theme.brandColor.iconn_dark_grey}
                generalPointsColor={theme.brandColor.iconn_grey}
                //pay attention to this function
                onPressZoom={() =>
                  logEvent('pdOpenImage', {
                    id: user.id,
                    description: 'Abrir imagen de producto',
                    productId: detailSelected.toString()
                  })
                }
              />
            </Container>
            <Container style={{ position: 'absolute', marginTop: moderateScale(5), marginLeft: moderateScale(10) }}>
              {!!productDetail &&
                productDetail.promotionType &&
                (productDetail.promotionType === 'buyAndWin' || productDetail.promotionType === 'forThePriceOf') && (
                  <Container
                    style={{
                      paddingHorizontal: moderateScale(5),
                      height: verticalScale(23),
                      backgroundColor: theme.brandColor.iconn_orange_original,
                      borderRadius: moderateScale(10),
                      justifyContent: 'center'
                    }}
                  >
                    <CustomText textColor={theme.brandColor.iconn_white} fontBold fontSize={moderateScale(12)} text={productDetail.promotionName} />
                  </Container>
                )}
            </Container>
            <Container row space="between" style={{ marginTop: 16, width: '100%', paddingHorizontal: 10 }}>
              <Container row>
                <Rating ratingValue={productDetail.average} />
                <Container style={{ marginTop: -3.5, marginLeft: 2 }}>
                  <TouchableText
                    marginLeft={8}
                    textColor={theme.brandColor.iconn_accent_principal}
                    text={totalCount + ' Calificaciones'}
                    typography="h4"
                    fontBold
                    onPress={() => {}}
                    marginTop={8}
                  />
                </Container>
              </Container>
              {!!productDetail && productDetail.promotionType ? (
                productDetail.promotionType == 'campaign' ||
                productDetail.promotionType == 'regular' ||
                productDetail.promotionType == 'buyAndWin' ||
                productDetail.promotionType == 'forThePriceOf' ? (
                  <></>
                ) : (
                  <Container>
                    <FavoriteButton sizeIcon={moderateScale(24)} isFavorite={isFav as boolean} onPressItem={changeFavorite} />
                  </Container>
                )
              ) : (
                <Container>
                  <FavoriteButton sizeIcon={moderateScale(24)} isFavorite={isFav as boolean} onPressItem={changeFavorite} />
                </Container>
              )}
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
                    !!productDetail && productDetail.promotionType
                      ? (productDetail.promotionType == 'campaign' || productDetail.promotionType == 'regular') &&
                        productDetail.percentualDiscountValue &&
                        productDetail.percentualDiscountValue > 0
                        ? '$' + productDetail.costDiscountPrice
                        : ''
                      : ''
                  }
                />
                {!!productDetail && productDetail.promotionType ? (
                  productDetail.promotionType == 'campaign' || productDetail.promotionType == 'regular' ? (
                    <Container style={{ marginLeft: 15, marginTop: 1 }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          textDecorationLine: 'line-through',
                          color: theme.brandColor.iconn_grey,
                          fontSize: theme.fontSize.h3,
                          marginTop: 11
                        }}
                      >
                        {'$' +
                          Number.parseFloat(productDetail != undefined && productDetail.selling_price ? productDetail.selling_price : '0')
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </Text>
                    </Container>
                  ) : (
                    <TextContainer
                      marginTop={8}
                      fontBold
                      fontSize={theme.fontSize.h1}
                      text={
                        '$' +
                        Number.parseFloat(productDetail.selling_price ? productDetail.selling_price : '0')
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }
                    />
                  )
                ) : (
                  <TextContainer
                    marginTop={8}
                    fontBold
                    fontSize={theme.fontSize.h1}
                    text={
                      '$' +
                      Number.parseFloat(productDetail.selling_price ? productDetail.selling_price : '')
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }
                  />
                )}
              </Container>
              {!!productDetail && productDetail.promotionType ? (
                productDetail.promotionType == 'campaign' || productDetail.promotionType == 'regular' ? (
                  <Container style={styles.containerPorcentDiscount}>
                    <CustomText
                      fontSize={theme.fontSize.h6}
                      textColor={theme.brandColor.iconn_green_original}
                      fontWeight={'bold'}
                      text={
                        'ahorra $' +
                        (!!productDetail && productDetail.promotionType
                          ? productDetail.promotionType == 'campaign' || productDetail.promotionType == 'regular'
                            ? productDetail.costDiscountPrice
                              ? Number.parseFloat(
                                  productDetail.percentualDiscountValue > 0
                                    ? productDetail.costDiscountPrice
                                    : Number.parseFloat(productDetail.selling_price ? productDetail.selling_price : '0', 10) -
                                        (productDetail.maximumUnitPriceDiscount != undefined ? productDetail.maximumUnitPriceDiscount : 0)
                                )
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              : ''
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
                logEvent('pdShowInformation', {
                  id: user.id,
                  description: 'Mostrar detalles del producto',
                  productId: itemId.toString()
                });
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
                  <TextContainer text="Descripción del producto" fontSize={12} textColor={theme.fontColor.paragraph} fontBold />
                  <Text numberOfLines={5} style={{ color: 'black', width: '100%', textAlign: 'justify' }}>
                    {productDetail.Description}
                  </Text>
                </Container>
                <Container style={{ marginTop: 20 }}>
                  <TextContainer text="Especificación del producto" fontSize={12} textColor={theme.fontColor.paragraph} fontBold />
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
            <TextContainer text={'¿Un último antojo?'} fontBold typography="h4" marginHorizontal={16} marginVertical={16} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Container row style={{ width: '100%', marginBottom: 20, paddingLeft: 5, paddingRight: 30 }}>
                {complementaryProducts.length === 0 ? (
                  <>
                    <Container flex row style={{ marginLeft: 8 }}>
                      <CardProductSkeleton />
                      <CardProductSkeleton />
                      <CardProductSkeleton />
                    </Container>
                  </>
                ) : complementaryProducts.length ? (
                  complementaryProducts.map((prod, index) => {
                    return (
                      <CardProduct
                        key={prod.productId + index + 'detail'}
                        image={prod.image!}
                        name={prod.name!}
                        ratingValue={prod.ratingValue!}
                        price={prod.price!}
                        productId={prod.productId}
                        quantity={prod.quantity!}
                        onPressAddCart={validateCategoryForAddItem}
                        onPressAddQuantity={() => {
                          logEvent('plusProduct', {
                            id: user.id,
                            description: 'Sumar uno a un producto en la canasta en la colección',
                            productId: prod.productId.toString()
                          });
                          updateShoppingCartProduct('add', prod.productId);
                        }}
                        onPressDeleteCart={() => {
                          logEvent('removeProduct', {
                            id: user.id,
                            description: 'Sacar un producto de la canasta en la colección de recomendados para ti',
                            productId: prod.productId.toString()
                          });
                          updateShoppingCartProduct('remove', prod.productId);
                        }}
                        onPressDecreaseQuantity={() => {
                          logEvent('minusProduct', {
                            id: user.id,
                            description: 'Restar uno a un producto en la canasta en la colección',
                            productId: prod.productId.toString()
                          });
                          updateShoppingCartProduct('substract', prod.productId);
                        }}
                        onPressOut={hideModalForAdult}
                        onPressAnalytics={async () =>
                          logEvent('openProduct', {
                            id: user.id,
                            description: 'Abrir un producto en una colección',
                            productId: prod.productId.toString()
                          })
                        }
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
        <AdultAgeVerificationScreen onPressClose={hideModalForAdult} visible={visible} productId={itemId} userUpdated={userUpdated} />
      </ScrollView>
      <Container style={{ marginBottom: 20, paddingHorizontal: 16, paddingTop: 10, height: '15%' }}>
        {cartItemQuantity > 0 ? (
          <Container style={{ height: 50, alignItems: 'stretch' }}>
            <QuantityProduct
              quantity={cartItemQuantity}
              onPressAddQuantity={() => {
                let currentQuantity = cartItemQuantity + 1;
                setCartItemQuantity(currentQuantity);
                updateShoppingCartProduct('add', itemId);
                logEvent('pdPlusProductProduct', {
                  id: user.id,
                  description: 'Sumar producto de la canasta en detalle de producto',
                  productId: itemId.toString()
                });
              }}
              onPressDeleteCart={() => {
                updateShoppingCartProduct('remove', itemId);
                logEvent('pdRemoveProductProduct', {
                  id: user.id,
                  description: 'Remover producto de la canasta en detalle de producto',
                  productId: itemId.toString()
                });
              }}
              onPressDecreaseQuantity={() => {
                let currentQuantity = cartItemQuantity - 1;
                setCartItemQuantity(currentQuantity);
                updateShoppingCartProduct('substract', itemId);
                logEvent('pdMinusProductProduct', {
                  id: user.id,
                  description: 'Restar producto de la canasta en detalle de producto',
                  productId: itemId.toString()
                });
              }}
            />
          </Container>
        ) : (
          <Button
            icon={<Image source={ICONN_REVERSE_BASKET} resizeMode="cover" style={{ width: 28, height: 28 }} />}
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
  containerPorcentDiscount: {
    width: moderateScale(84),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain'
  }
});
