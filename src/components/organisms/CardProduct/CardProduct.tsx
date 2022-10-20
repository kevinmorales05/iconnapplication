import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, Dimensions, Image, ImageSourcePropType } from 'react-native';
import theme from 'components/theme/theme';
import { Button, FavoriteButton } from 'components/molecules';
import { ICONN_REVERSE_BASKET } from 'assets/images';
import { Rating } from 'components/molecules/Rating';
import { PriceWithDiscount } from 'components/molecules/PriceWithDiscount';
import { QuantityProduct } from 'components/molecules/QuantityProduct';
import { Container, CustomText } from 'components/atoms';
import { moderateScale } from 'utils/scaleMetrics';
import { Touchable } from 'components';
import { useNavigation } from '@react-navigation/native';
import { setDetailSelected } from 'rtk/slices/cartSlice';
import { getProductDetailById } from 'services/vtexProduct.services';
import { vtexUserServices } from 'services';
import {
  addFav,
  FavoritesResponseInterface,
  ItemsFavoritesInterface,
  ListItemsWrapperInterface,
  NewFavoritesResponseInterface,
  ProductResponseInterface,
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
interface CardProductProps {
  price: number;
  name: string;
  image: ImageSourcePropType;
  quantity: number;
  productId: string;
  onPressAddCart: () => void;
  onPressDeleteCart: () => void;
  onPressAddQuantity: () => void;
  onPressDecreaseQuantity: () => void;
  oldPrice?: number;
  ratingValue?: number;
  porcentDiscount?: number;
  notNeedMarginLeft?: boolean;
  isFavorite?: boolean;
  onPressOut: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({
  ratingValue,
  price,
  oldPrice,
  porcentDiscount,
  name,
  image,
  quantity,
  productId,
  isFavorite,
  onPressAddCart,
  onPressDeleteCart,
  onPressAddQuantity,
  onPressDecreaseQuantity,
  notNeedMarginLeft,
  onPressOut
}: CardProductProps) => {
  const [categoryId, setCategoryId] = useState(Object);

  const validateCategoryForAddItem = () => {
    getProductDetailById(productId).then(productDetail => {
      if (productDetail.DepartmentId == 167) {
        if (user.email) {
          console.log('user.email: ', user.email);
          vtexUserServices.getUserByEmail(user.email).then(userResponse => {
            let isAdult = false;
            if (userResponse) {
              const { data } = userResponse;
              if (data) {
                if (data.length > 0) {
                  isAdult = data[0].isAdult;
                  if (isAdult) {
                    onPressAddCart();
                  } else {
                    onPressOut();
                  }
                }
              }
            }
          });
        }
      } else {
        onPressAddCart();
      }
    });
  };

  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const [isFav, setIsFav] = useState<boolean>();
  const { favs, favsId, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;
  const [favList, setFavList] = useState<ItemsFavoritesInterface[]>(favs);

  let newFavList: ItemsFavoritesInterface[] = [];

  const getIsFavorite = () => {
    if (favs.length !== undefined) {
      favs.map(fav => {
        if (productId == fav.Id) {
          setIsFav(true);
        }
      });
    }
  };

  useEffect(() => {
    getIsFavorite();
  }, [isFav]);

  /* const addFavorite = (newFav: ItemsFavoritesInterface) => {
    console.log('NFL', typeof favs);
    console.log('FAVS', favs);
    if (favs.length === undefined) {
      console.log('El arreglo de redux esta vacio');
      favs.push(newFav);
      console.log('ARREGLO YA NO UNDEFINED', newFavList);
      dispatch(setFav(favs));
    } else if (favs.length === 0) {
      favs.push(newFav);
      console.log('NO HAY2!', favList);
      dispatch(setFav(favs));
    } else if (favs.length > 0) {
      //favs.push(newFav);
      favs.map(product => {
        if (product.Id === newFav.Id) {
          console.log('YA HAY', product.Id);
          console.log('YA HAY!', newFavList);
          setFavList(favs);
          dispatch(setFav(favs));
        } else {
          console.log('AQUI', typeof newFavList);
          favs.push(newFav);
          console.log('NO HAY!3', favList);
          dispatch(setFav(favs));
        }
        console.log('FANTA', favs);
      });
    }
  };
 */

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
    console.log('Añadiendo a vtex', response.DocumentId, favs);
    if(favsId === '') {
      dispatch(setFavId(response.DocumentId));
    }
  };

  const removeFavorite = (oldFav: ItemsFavoritesInterface) => {
    favs.map(product => {
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
        console.log('REMOVIDO', newFavList);
        console.log('REMOVIDO!', product.Id);
        const response = updateFavorites(tryList, 'update');
        setFavList(newFavList);
        dispatch(setFav(newFavList));
        return newFavList;
      } else {
        console.log('NO HABIA', favs);
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
        Id: productId,
        Name: name
      };
      removeFavorite(productToRemove);
    }
    if (!isFav) {
      const productToAdd: ItemsFavoritesInterface = {
        Id: productId,
        Name: name
      };
      addFavorite1(productToAdd);
    }
    console.log('ACTUAL FAVS', favs, favsId);
    setIsFav(!isFav);
  };

  return (
    <Container style={[styles.container, { marginLeft: moderateScale(notNeedMarginLeft ? 0 : 8) }]}>
      <Container style={styles.subContainer}>
        <ImageBackground style={styles.containerImage} resizeMode={'contain'} source={image}>
          <Container row width={'100%'} space="between">
            {porcentDiscount && (
              <Container flex width={'100%'}>
                <Container style={styles.containerPorcentDiscount}>
                  <CustomText
                    fontSize={theme.fontSize.h6}
                    textColor={theme.brandColor.iconn_green_original}
                    fontWeight={'bold'}
                    text={`-${porcentDiscount}%`}
                  />
                </Container>
              </Container>
            )}
            <Container flex width={'100%'} style={{ justifyContent: 'center', alignItems: 'flex-end', zIndex: 3, position: 'absolute' }}>
              <FavoriteButton sizeIcon={moderateScale(24)} isFavorite={isFav as boolean} onPressItem={changeFavorite} />
            </Container>
          </Container>
        </ImageBackground>
        <Container>
          <Touchable
            onPress={() => {
              dispatch(setDetailSelected(productId));
              console.log('DETAILID', productId);
              navigate('ProductDetail', { productIdentifier: productId });
            }}
          >
            <Container style={styles.containerTitle}>
              <CustomText fontSize={theme.fontSize.h5} text={`${name}`} numberOfLines={3} />
            </Container>
            <Rating ratingValue={ratingValue} />
            <PriceWithDiscount price={price.toFixed(2)} oldPrice={oldPrice} />
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

export default CardProduct;

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
    width: moderateScale(44),
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
