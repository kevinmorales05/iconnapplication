import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { ProductSearchItemInterface, SearchItemInterface, searchProductsThunk, useAppDispatch } from 'rtk';
import { Container, CustomText, SafeArea, SearchBar, SearchItem, Touchable } from 'components';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';

const CategoryProductsScreen: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const [results, setResults] = useState<SearchItemInterface[]>([]);
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();

  const onChangeText = async (text: string) => {
    if (text.length > 2) {
      const searchResults = await searchProducts(text);
      if (searchResults.itemsReturned) {
        setResults(searchResults.itemsReturned);
      }
    } else if (search.length > text.length) {
      setResults([]);
    }
    setSearch(text);
  };
  const searchProducts = async (filter: string) => {
    return await dispatch(searchProductsThunk(filter)).unwrap();
  };

  const onPressItem = (item: SearchItemInterface) => {
    let products: ProductSearchItemInterface[] = [];
    results.forEach(result => {
      if (!result.criteria) {
        products = products.concat(result.items);
      }
    });
    navigate('SearchProductsResults', { products: products, textSearch: item.name.replace(/[^a-zA-Z0-9 ]/g, '') });
  };

  const onEndEditing = () => {
    if (results[0]?.name) {
      let products: ProductSearchItemInterface[] = [];
      results.forEach(result => {
        if (!result.criteria) {
          products = products.concat(result.items);
        }
      });
      navigate('SearchProductsResults', { products: products, textSearch: results[0].name.replace(/[^a-zA-Z0-9 ]/g, '') });
    }
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0, paddingTop: theme.paddingHeader }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_white}
      barStyle="dark"
    >
      <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap' }}>
        <Container row style={styles.containerHeader}>
          <Container flex={0.77}>
            <SearchBar onPressSearch={() => {}} onEndWriting={onEndEditing} onChangeTextSearch={onChangeText} />
          </Container>
          <Container middle flex={0.23} style={{ alignItems: 'flex-end' }}>
            <Touchable
              onPress={() => {
                goBack();
              }}
            >
              <CustomText text="Cancelar" fontSize={theme.fontSize.h4} />
            </Touchable>
          </Container>
        </Container>
        <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15), paddingTop: moderateScale(10) }}>
          {results.map(result => {
            if (result.criteria) {
              return <SearchItem name={result.name} onPressItem={onPressItem} result={result} />;
            }
          })}
        </Container>
      </Container>
    </SafeArea>
  );
};

export default CategoryProductsScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(6),
    borderBottomWidth: 1,
    borderBottomColor: theme.brandColor.iconn_med_grey
  }
});
