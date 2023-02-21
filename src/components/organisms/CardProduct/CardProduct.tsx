import React, { useCallback, useEffect, useState, memo } from 'react';
import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import theme from 'components/theme/theme';
import { Button, FavoriteButton } from 'components/molecules';
import { ICONN_REVERSE_BASKET } from 'assets/images';
import { Rating } from 'components/molecules/Rating';
import { PriceWithDiscount } from 'components/molecules/PriceWithDiscount';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import { Container, CustomText } from 'components/atoms';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { Touchable } from 'components';
import { useNavigation } from '@react-navigation/native';
import { setDetailSelected } from 'rtk/slices/cartSlice';
import { getProductSpecification } from 'services/vtexProduct.services';
import { vtexUserServices } from 'services';
import {
  addFav,
  FavoritesResponseInterface,
  ItemsFavoritesInterface,
  ListItemsWrapperInterface,
  NewFavoritesResponseInterface,
  RootState,
  setFav,
  setFavId,
  UpdateType,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import { vtexFavoriteServices } from 'services/vtex-favorite-services';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import FastImage from 'react-native-fast-image';
interface CardProductProps {
  price: number;
  name: string;
  image: ImageSourcePropType;
  quantity: number;
  productId: string;
  onPressAddCart: (isAdult?: boolean, productId?: string) => void;
  onPressDeleteCart: () => void;
  onPressAddQuantity: () => void;
  onPressDecreaseQuantity: () => void;
  ratingValue?: number;
  notNeedMarginLeft?: boolean;
  isFavorite?: boolean;
  onPressAnalytics?: () => void;
  pressFavfromCategory?: () => void;
  pressNoFavfromCategory?: () => void;
  promotionType?: string;
  percentualDiscountValue?: number;
  promotionName?: string;
  costDiscountPrice?: string;
  index?: number;
  onPressOut: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({
  ratingValue,
  price,
  name,
  image,
  quantity,
  productId,
  onPressAddCart,
  onPressDeleteCart,
  onPressAddQuantity,
  onPressDecreaseQuantity,
  notNeedMarginLeft,
  onPressAnalytics,
  pressFavfromCategory,
  pressNoFavfromCategory,
  promotionType,
  percentualDiscountValue,
  promotionName,
  costDiscountPrice,
  index
}: CardProductProps) => {
  const validateCategoryForAddItem = () => {
    let isAdultInProductSpecification = false;
    getProductSpecification(productId).then(producSpecificationResponse => {
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
                onPressAddCart(true, productId);
              } else {
                onPressAddCart(false, productId);
              }
            }
          });
        } else {
          onPressAddCart(true, productId);
        }
      } else {
        onPressAddCart(true, productId);
      }
    });
  };

  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const [isFav, setIsFav] = useState<boolean>();
  const { favs, favsId, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  const getIsFavorite = () => {
    if (favs) {
      if (favs.length) {
        const favorite = favs.find(fav => productId == fav.Id);
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

  const splitText = text => {
    return text.length > 18 ? text.slice(0, 15) + '..' : text;
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
    favs.forEach(product => {
      if (product.Id == oldFav.Id) {
        const newFavList = favs.filter(productf => productf.Id != oldFav.Id);
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
        updateFavorites(tryList, 'update');
        dispatch(setFav(newFavList));
        return newFavList;
      } else {
        return favs;
      }
    });
  };

  const updateFavorites = useCallback(async (updatedList: FavoritesResponseInterface | NewFavoritesResponseInterface, updateType: UpdateType) => {
    if (updateType === 'new') {
      const listNoId: NewFavoritesResponseInterface = {
        email: email as string,
        ListItemsWrapper: updatedList.ListItemsWrapper
      };
      await vtexFavoriteServices.patchFavorites(email as string, listNoId);
    } else {
      await vtexFavoriteServices.patchFavorites(email as string, updatedList);
    }
  }, []);

  const changeFavorite = () => {
    if (isFav) {
      const productToRemove: ItemsFavoritesInterface = {
        Id: productId,
        Name: name
      };
      removeFavorite(productToRemove);
      if (pressNoFavfromCategory) pressNoFavfromCategory();
    }
    if (!isFav) {
      const productToAdd: ItemsFavoritesInterface = {
        Id: productId,
        Name: name
      };
      addFavorite1(productToAdd);
      if (pressFavfromCategory) pressFavfromCategory();
    }
    setIsFav(!isFav);
  };

  return (
    <Container style={[styles.container, { marginLeft: moderateScale(notNeedMarginLeft ? (index ? (index % 2 > 0 ? 8 : 0) : 0) : 8) }]}>
      <Container style={styles.subContainer}>
        <FastImage style={styles.containerImage} resizeMode={'contain'} source={image} />
        <Container row width={'100%'} space="between" style={{ position: 'absolute' }}>
          <Container flex width={'100%'}>
            {promotionType ? (
              promotionType == 'buyAndWin' || promotionType == 'forThePriceOf' || promotionType == 'campaign' || promotionType == 'regular' ? (
                <Container
                  style={
                    promotionType == 'campaign' || promotionType == 'regular'
                      ? percentualDiscountValue > 0
                        ? styles.containerPorcentDiscount
                        : styles.containerPorcentDiscountCero
                      : styles.containerPromotionName
                  }
                >
                  <CustomText
                    fontSize={theme.fontSize.h6}
                    textColor={theme.brandColor.iconn_green_original}
                    fontWeight={'bold'}
                    numberOfLines={1}
                    text={
                      promotionType
                        ? promotionType == 'buyAndWin' || promotionType == 'forThePriceOf'
                          ? splitText(promotionName)
                          : promotionType == 'campaign' || promotionType == 'regular'
                          ? '-' + percentualDiscountValue + '%'
                          : ''
                        : ''
                    }
                  />
                </Container>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </Container>
          {promotionType ? (
            promotionType == 'campaign' || promotionType == 'regular' || promotionType == 'buyAndWin' || promotionType == 'forThePriceOf' ? (
              <></>
            ) : (
              <Container flex width={'100%'} style={{ justifyContent: 'center', alignItems: 'flex-end', zIndex: 3, position: 'absolute' }}>
                <FavoriteButton sizeIcon={moderateScale(24)} isFavorite={isFav as boolean} onPressItem={changeFavorite} />
              </Container>
            )
          ) : (
            <Container flex width={'100%'} style={{ justifyContent: 'center', alignItems: 'flex-end', zIndex: 3, position: 'absolute' }}>
              <FavoriteButton sizeIcon={moderateScale(24)} isFavorite={isFav as boolean} onPressItem={changeFavorite} />
            </Container>
          )}
        </Container>
        <Container>
          <Touchable
            onPress={async () => {
              dispatch(setDetailSelected(productId));
              navigate('ProductDetail', { productIdentifier: productId });
              if (onPressAnalytics) onPressAnalytics();
            }}
          >
            <Container style={styles.containerTitle}>
              <CustomText fontSize={theme.fontSize.h5} text={`${name}`} numberOfLines={3} />
            </Container>
            <Rating ratingValue={ratingValue} />
            <Container style={styles.containerPrice}>
              <PriceWithDiscount price={price.toFixed(2)} promotionType={promotionType} costDiscountPrice={costDiscountPrice} />
            </Container>
          </Touchable>
        </Container>
      </Container>
      <Container style={styles.containerButton}>
        {quantity ? (
          <QuantityProduct
            quantity={quantity}
            onPressAddQuantity={onPressAddQuantity}
            onPressDeleteCart={onPressDeleteCart}
            onPressDecreaseQuantity={onPressDecreaseQuantity}
          />
        ) : (
          <Button
            color="iconn_green_original"
            round
            size={'xxxsmall'}
            onPress={() => {
              validateCategoryForAddItem();
            }}
            fontSize="h4"
            fontBold
            style={styles.buttonAddProduct}
            icon={<Image style={styles.image} source={ICONN_REVERSE_BASKET} />}
          >
            Agregar
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default memo(CardProduct);

const styles = StyleSheet.create({
  container: {
    width: moderateScale(160),
    height: moderateScale(274),
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
    width: moderateScale(44),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerPromotionName: {
    width: moderateScale(103),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerPorcentDiscountCero: {
    width: moderateScale(0),
    height: moderateScale(0),
    borderRadius: moderateScale(0),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerTitle: {
    width: '100%',
    height: moderateScale(50),
    marginTop: moderateScale(10),
    overflow: 'hidden'
  },
  containerPrice: {
    marginTop: 12
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
    marginTop: moderateScale(70)
  },
  buttonAddProduct: {
    borderRadius: moderateScale(10),
    height: verticalScale(40)
  }
});
