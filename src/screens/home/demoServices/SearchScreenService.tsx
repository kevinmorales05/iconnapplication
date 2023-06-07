import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, CustomText, SafeArea, SearchBar, Touchable } from 'components';
import theme from 'components/theme/theme';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import AlphabetList from 'react-native-flatlist-alphabet';
import { LisetSearchType, rechargeCompanyList, serviceSearchCompanyList, servicesList } from '../../../common/demoServicesPay';

interface Props {
  navigation: any
}

const SearchProductResultsScreen: React.FC<Props> = ({navigation}) => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const route = useRoute<RouteProp<HomeStackParams, 'SearchScreenService'>>();
  const { type } = route.params;

  const [ items, setItems ] = useState<LisetSearchType[]>([]);

  useEffect(()=>{
    fillItems();
  },[type])

  const fillItems = () => {
    switch(type){
      case 'services':
        setItems(servicesList);
      break;
      case 'recharge': 
        setItems(rechargeCompanyList);
      break;
      case 'others': 
        setItems(serviceSearchCompanyList);
      break;
    }
  }

  const renderSectionHeader = (section: any) => {
    return(
      <View style={{width: '100%', backgroundColor: 'white', paddingVertical: moderateScale(10)}}>
        <CustomText text={section.title} fontSize={15} fontBold />
      </View>
    )
  }

  const nav = (item: any) => {
    if(item.navigateTo){
      navigate(item.navigateTo)
    } else if(item.isReset){
      navigation.dispatch(
        CommonActions.reset({
          index: 2,
          routes: [
            {
                name: 'Home',
                params: { screen: 'MyAccountScreen' }
            },
            {
              name: 'WalletStack',
            }
          ]
        })
    );
    }
  }

  const filter = (text: string) => {
    if(text.length > 3){
      const found = items.filter((item) => item.value.toLowerCase().includes(text.toLocaleLowerCase()));
      setItems(found);
    } else {
      fillItems();
    }
  };

  const renderItem = (item: any) => {
    return(
      <TouchableOpacity onPress={()=> nav(item)} style={{width: '100%', backgroundColor: 'white', paddingVertical: moderateScale(10), flexDirection: 'row', alignItems: 'center'}}>
        <Image resizeMode='contain' source={item.image} style={{width: moderateScale(64), height: moderateScale(64), borderRadius: moderateScale(10), marginRight: moderateScale(16)}} />
        <CustomText text={item.value} fontSize={15} fontBold />
      </TouchableOpacity>
    )
  }

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
            <SearchBar onPressSearch={()=>{}} onEndWriting={()=>{}} onChangeTextSearch={(text) => filter(text)} placeHolderText='Buscar servicio' />
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
          {
            items.length ?
              <AlphabetList
                data={items}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                getItemHeight={()=> 50}
                sectionHeaderHeight={20}
                indexLetterColor={'black'}
                style={{paddingBottom: verticalScale(80)}}
              />
            :
              null
          }
        </Container>
      </Container>
    </SafeArea>
  );
};

export default SearchProductResultsScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(6),
    borderBottomWidth: 1,
    borderBottomColor: theme.brandColor.iconn_med_grey
  }
});
