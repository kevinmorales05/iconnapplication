import React, { useEffect, useState } from 'react';
import { Container, SafeArea, CardHorizontal, SearchBar, CustomText, BasketCounter } from 'components';
import { ScrollView, StyleSheet } from 'react-native';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { getCategoryItemsThunk, useAppDispatch } from 'rtk';
import { CategoryInterface } from 'rtk/types/category.types';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const CategoriesController: React.FC = ({ navigation, route }: any) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    if (!navigation || !route) return;

    // Get stack parent by id
    const homeStack = navigation.getParent('HomeStack');

    if (homeStack) {
      // Make sure the route name is "CategoriesScreen" before turn header off
      if (route.name === 'CategoriesScreen') {
        homeStack.setOptions({
          headerShown: false
        });
      }
    }
    // Turn header back on when unmount
    return homeStack
      ? () => {
          homeStack.setOptions({
            headerShown: true
          });
        }
      : undefined;
  }, [navigation, route]);

  useEffect(() => {
    if (!categories?.length) {
      categoriesEffect();
    }
  }, [categories]);

  // TODO: relocate this url to .ENV
  const categoriesEffect = async () => {
    const categoriesRequest = await getCategoryItems();
    if (categoriesRequest.responseCode === 603) {
      categoriesRequest.data.forEach((c: CategoryInterface) => {
        // TODO: link para traer las imagenes
        c.image = `https://oneiconn.vtexassets.com/arquivos/${c.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ /g, '_')}.png`;
      });
      const categoriesToRender = categoriesRequest.data.filter((c: CategoryInterface) => c.id !== 187 && c.id !== 184 && c.id !== 178 && c.id !== 152);
      setCategories(categoriesToRender);
    }
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
      childrenContainerStyle={{ paddingHorizontal: moderateScale(0), paddingTop: theme.paddingHeader }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <Container>
        <Container row style={styles.containerHeaderBar}>
          <Container style={{ justifyContent: 'center' }} flex={0.12} />
          <Container flex={0.67} style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: moderateScale(50) }}>
            <CustomText text="Categorías" fontBold fontSize={theme.fontSize.h3} />
          </Container>
          <Container width={'100%'} flex={0.23} style={{ paddingLeft: moderateScale(10), height: moderateScale(25), justifyContent: 'center' }}>
            <BasketCounter />
          </Container>
        </Container>
        <Container style={styles.containerHeader}>
          <SearchBar isButton onPressSearch={onPressSearch} onChangeTextSearch={() => {}} />
        </Container>
        <Container style={{ height: verticalScale(520), backgroundColor: theme.brandColor.iconn_light_grey }}>
          <ScrollView contentContainerStyle={{ paddingBottom: moderateScale(50) }}>
            <Container space="between" row style={{ flexWrap: 'wrap', paddingHorizontal: moderateScale(10) }}>
              {categories?.length
                ? categories.map(category => {
                    return (
                      <CardHorizontal
                        key={category.id + ''}
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
          </ScrollView>
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
  containerHeaderBar: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(11),
    borderBottomWidth: 1,
    borderBottomColor: theme.brandColor.iconn_med_grey
  }
});
