import React, { useEffect, useState } from 'react';
import { Container, SafeArea, CardHorizontal, SearchBar } from 'components';
import { StyleSheet } from 'react-native';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { getCategoryItemsThunk, useAppDispatch } from 'rtk';
import { CategoryInterface } from 'rtk/types/category.types';
import { moderateScale } from 'utils/scaleMetrics';

const CategoriesController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categories?.length) {
      console.log('entre useEffect');
      categoriesEffect();
    }
  }, [categories]);

  const categoriesEffect = async () => {
    const categoriesRequest = await getCategoryItems();
    categoriesRequest.forEach((c: CategoryInterface) => {
      c.image = `https://oneiconn.vtexassets.com/arquivos/${c.name.replace(/ /g, '_')}.png`;
    });
    console.log({ categoriesRequest });
    setCategories(categoriesRequest);
  };
  const getCategoryItems = async () => {
    return await dispatch(getCategoryItemsThunk()).unwrap();
  };

  const onPressCategory = (category: CategoryInterface) => {
    navigate('CategoryProducts', { category: category, categories: categories });
  };

  const onPressSearch = () => {
    navigate('SearchProducts');
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: moderateScale(0) }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <Container>
        <Container style={styles.containerHeader}>
          <SearchBar isButton onPressSearch={onPressSearch} onChangeTextSearch={() => {}} />
        </Container>
        <Container space="between" row style={{ flexWrap: 'wrap', paddingHorizontal: moderateScale(10) }}>
          {categories?.length
            ? categories.map(category => {
                return (
                  <CardHorizontal
                    text={category.name}
                    image={{ uri: category.image }}
                    onPress={() => {
                      onPressCategory(category);
                    }}
                  />
                );
              })
            : null}
        </Container>
      </Container>
    </SafeArea>
  );
};

export default CategoriesController;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(7),
    backgroundColor: theme.brandColor.iconn_white
  },
  containerButton: {
    width: moderateScale(40),
    height: moderateScale(36),
    borderRadius: moderateScale(5),
    borderColor: theme.brandColor.iconn_med_grey,
    borderWidth: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(20)
  }
});
