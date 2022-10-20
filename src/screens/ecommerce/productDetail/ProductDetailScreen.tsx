import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, Image, Text } from 'react-native';
import { CustomText, TextContainer, Container, Touchable, TouchableText, Button, ReviewPercentage } from 'components';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { ICONN_BASKET } from 'assets/images';
import { ImagesCarusel } from 'components/molecules/ImagesCarusel';
import { FavoriteButton } from 'components/molecules';
import { CardProduct } from 'components/organisms/CardProduct';
import { Rating } from 'components/molecules/Rating';
import { getProductDetailById, getSkuFilesById } from 'services/vtexProduct.services';
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
  UpdateType,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { useShoppingCart } from '../../home/hooks/useShoppingCart';
import { moderateScale } from 'utils/scaleMetrics';
import AdultAgeVerificationScreen from 'screens/home/adultAgeVerification/AdultAgeVerificationScreen';
import { vtexUserServices } from 'services';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';

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
  const dispatch = useAppDispatch();

  itemId = detailSelected;

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
            const imgsForTest = [
              { isMain: true, label: '', name: '01-coca', skuId: 456, url: 'https://oneiconn.vtexassets.com/arquivos/ids/155405-456-', valueX: 0 },
              { isMain: false, label: '', name: '02-bonafont', skuId: 457, url: 'https://oneiconn.vtexassets.com/arquivos/ids/155406-457-', valueX: 240 },
              { isMain: false, label: '', name: '04-gatorade', skuId: 458, url: 'https://oneiconn.vtexassets.com/arquivos/ids/155407-458-', valueX: 480 },
              { isMain: false, label: '', name: '05-Cafe-Ole', skuId: 459, url: 'https://oneiconn.vtexassets.com/arquivos/ids/155408-459-', valueX: 720 },
              {
                isMain: false,
                label: '',
                name: '06-Chips-Jalapenos',
                skuId: 460,
                url: 'https://oneiconn.vtexassets.com/arquivos/ids/155410-461-',
                valueX: 960
              },
              { isMain: false, label: '', name: '07-cacahuates', skuId: 461, url: 'https://oneiconn.vtexassets.com/arquivos/ids/155411-462-', valueX: 1200 },
              { isMain: false, label: '', name: '09-Palomitas', skuId: 462, url: 'https://oneiconn.vtexassets.com/arquivos/ids/155412-463-', valueX: 1440 },
              { isMain: false, label: '', name: '08-Paketazo', skuId: 462, url: 'https://oneiconn.vtexassets.com/arquivos/ids/155413-464-', valueX: 1680 }
            ];
            setSkusForProductImages(/*imgsForTest*/ skuForImages);
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

  const getComplementaryProducts = async (existingProductsInCart: ExistingProductInCartInterface[]) => {
    vtexProductsServices
      .getProductsByCollectionId('147') 
      .then(responseCollection => {
        const { Data } = responseCollection;
        let complementaryList = [];
        if (Data) {
          if (Data.length) {
            Data.map(product => {
              complementaryList.push({
                productId: product.ProductId,
                name: product.ProductName,
                image: { uri: product.SkuImageUrl },
              });
            })
            refillProductsWithPrice(existingProductsInCart, complementaryList)
          }
        }
      })
      .catch(error => console.log(error));
  };

  async function refillProductsWithPrice(
    existingProductsInCart: ExistingProductInCartInterface[],
    products: ProductInterface[]
  ){
    let productsToRender: ProductInterface[] = [];
    for( const p of products ) {
      const price = await getPriceByProductId(p.productId);
      const raiting = await getRatingByProductId(p.productId)
      if(price && raiting){
        p.oldPrice =  price?.basePrice;
        p.price = price?.basePrice;
        p.ratingValue = raiting.average;
        p.quantity = existingProductsInCart ? existingProductsInCart.find(eP => eP.itemId === p.productId.toString())?.quantity : 0;
        productsToRender.push(p)
      }
    }
    console.log({productsToRender})
    setComplementaryProducts(productsToRender);
  }

  const getPriceByProductId = async (productId: string) => {
    return await dispatch(getProductPriceByProductIdThunk(productId)).unwrap();
  };

  const getRatingByProductId = async (productId: string) => {
    return await dispatch(getProductRatingByProductIdThunk(productId)).unwrap();
  };

  const validateCategoryForAddItem = (itemId: string) => {
    console.log('validate itemId:::' + itemId + 'userId' + user.userId);
    getProductDetailById(itemId).then(productDetail => {
      if (productDetail.DepartmentId == 167) {
        if (user.email) {
          vtexUserServices.getUserByEmail(user.email).then(userResponse => {
            let isAdult = false;
            if (userResponse) {
              const { data } = userResponse;
              if (data) {
                if (data.length > 0) {
                  isAdult = data[0].isAdult;
                  if (isAdult) {
                    updateShoppingCartProduct('create', itemId);
                  } else {
                    onPressOut();
                  }
                }
              }
            }
          });
        }
      } else {
        updateShoppingCartProduct('create', itemId);
      }
    });
  };

  const isProductIdInShoppingCart = productId => {
    const { items } = cart;
    let quantityItem = 0;
    items.map(itm => {
      if (itm.productId == productId) {
        quantityItem = itm.quantity;
      }
    });
    return quantityItem;
  };

  const onPressOut = () => {
    setVisible(!visible);
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
    if (favs.length !== undefined) {
      console.log('FAVSFAVS', favs);
      favs.map(fav => {
        if (itemId == fav.Id) {
          setIsFav(true);
          console.log('IS FAVORITE', itemId, fav.Id);
        } else {
          console.log('NO FAVORITE', itemId, fav.Id);
        }
      });
    }
  };

  useEffect(() => {
    getIsFavorite();
  }, [isFav]);

  const addFavorite1 = (newFav: ItemsFavoritesInterface) => {
    console.log('INICIANDO', favs);
    dispatch(addFav(newFav));
    uploadVtex(favs);
    console.log('TERMINANDO', favs);
  };

  const uploadVtex = async (favs: ItemsFavoritesInterface[]) => {
    const response = await vtexFavoriteServices.patchFavorites(email as string, {
      id: favsId,
      email: email as string,
      ListItemsWrapper: [{ ListItems: favs, IsPublic: true, Name: 'Wishlist' }]
    });
    console.log('Añadiendo a vtex', response, favs);
  };

  const removeFavorite = (oldFav: ItemsFavoritesInterface) => {
    favList.map(product => {
      if (product.Id === oldFav.Id) {
        const newFavList = favList.filter(productf => productf.Id != oldFav.Id);
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
        console.log('REMOVIDO', newFavList);
        console.log('REMOVIDO!', product.Id);
        const response = updateFavorites(tryList, 'update');
        setFavList(newFavList);
        dispatch(setFav(newFavList));
        return newFavList;
      } else {
        console.log('NO HABIA', favList);
        return favList;
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
      console.log('HIGOS', response);
    } else {
      const response = await vtexFavoriteServices.patchFavorites(email as string, updatedList);
      console.log('UVAS', response);
    }
  }, []);

  const changeFavorite = () => {
    if (isFav) {
      const productToRemove: ItemsFavoritesInterface = {
        Id: itemId,
        Name: productDetail.Name
      };
      removeFavorite(productToRemove);
    }
    if (!isFav) {
      const productToAdd: ItemsFavoritesInterface = {
        Id: itemId,
        Name: productDetail.Name
      };
      addFavorite1(productToAdd);
    }
    console.log('ACTUAL FAVS', favs, favsId);
    setIsFav(!isFav);
  };

  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      <Container style={{ flex: 1, marginTop: 20, backgroundColor: theme.brandColor.iconn_background }}>
        <Container backgroundColor="white">
          <Container>
            <Container>
              <ImagesCarusel
                imagesList={skusForProductImages}
                imageSize={240}
                selectecPointColor={theme.brandColor.iconn_dark_grey}
                generalPointsColor={theme.brandColor.iconn_grey}
              ></ImagesCarusel>
            </Container>
          </Container>
          <Container row space="between" style={{ marginTop: 16, width: '100%' }}>
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

          <Container style={{ marginTop: 16 }}>
            <TextContainer fontBold fontSize={theme.fontSize.h2} text={productDetail.Name} />
            <Container row>
              <TextContainer
                marginTop={8}
                marginRight={20}
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
                  text={'$' + (productPrice != undefined && productPrice.basePrice ? productPrice.basePrice : 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
            paddingVertical: 10,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: theme.brandColor.iconn_light_grey,
            backgroundColor: 'white'
          }}
        >
          <Touchable
            marginTop={16}
            onPress={() => {
              setShowAdditionalInfo(!showAdditionalInfo);
            }}
          >
            <Container row space="between" style={{ paddingHorizontal: 16, width: '100%' }}>
              <CustomText text={'INFORMACIÓN ADICIONAL'} fontBold textColor={theme.brandColor.iconn_green_original} />
              <Icon name={showAdditionalInfo ? 'up' : 'down'} size={18} color={theme.brandColor.iconn_green_original} />
            </Container>
          </Touchable>
          {showAdditionalInfo ? (
            <Container style={{ marginTop: 10 }}>
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

        <Container height={342} style={{ marginTop: 16 }} backgroundColor={theme.brandColor.iconn_background}>
          <Container row space="between" style={{ margin: 16 }}>
            <TextContainer text={`¿Un último antojo?`} fontBold typography="h4" />
          </Container>
          <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
            <Container row style={{ height: 200, width: '100%' }}>
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
                      onPressAddCart={() => {
                        updateShoppingCartProduct('create', prod.productId);
                      }}
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
                    />
                  );
                })
              ) : (
                <></>
              )}
            </Container>
          </ScrollView>
        </Container>

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

      <Container style={{ marginBottom: 16 }}>
        {cartItemQuantity > 0 ? (
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
        ) : (
          <Button
            icon={<Image source={ICONN_BASKET} tintColor="white" resizeMode="cover" style={{ width: 28, height: 28 }} />}
            round
            fontBold
            fontSize="h4"
            onPress={() => {
              validateCategoryForAddItem(itemId);
            }}
          >
            Agregar a canasta
          </Button>
        )}
      </Container>
      <AdultAgeVerificationScreen onPressClose={onPressOut} visible={visible} />
    </ScrollView>
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
    justifyContent: 'flex-end'
  },
  buttonAddProduct: {
    borderRadius: moderateScale(10)
  }
});
