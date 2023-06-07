import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container, CustomText, EmptyQRCard, SafeArea, SearchBar, TabTwoElements } from 'components';
import theme from 'components/theme/theme';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { HistoryServices, RootState, TabItem, WalletFav, setFavs, setNumberRecharge, setTagName, useAppDispatch, useAppSelector } from 'rtk';
import CardPayServicesCategories from 'components/organisms/CardPayServicesCategories';
import { OptionsKey, optionFav, servicesCategories } from '../../../common/demoServicesPay';
import { SearchServicesType } from 'navigation/types/HomeStackParams';
import { OptionsModal } from 'components/organisms/OptionsModal';
import { ServiceCardWallet } from 'components/atoms/ServiceCardWallet';
import { ServiceHistoryWallet } from 'components/atoms/ServiceHistoryWallet';

const tabNames: TabItem[] = [
    {
      id: '1',
      name: 'Favoritos'
    },
    {
      id: '2',
      name: 'Historial'
    }
  ];

interface Props {
    navigation: any;
}


const HomeServices: React.FC<Props> = ({navigation}) => {
    const [idSelected, setIdSelected] = useState<string>('1');
    const [ viewAmountModal, setViewAmountModal ] = useState<boolean>(false);
    const [ itemSelect, setItemSelect ] = useState<WalletFav>()
    const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

    const dispatch = useAppDispatch();
    const { favs, history } = useAppSelector((state: RootState) => state.wallet);

    const onPressTab = (tab: TabItem) => {
        if (tab.id) {
        setIdSelected(tab.id);
        }
    };

    const viewCategories = () => {
        navigate('ServicesCategories');
    }

    const goToSearch = () => {
        navigate('SearchScreenService', { type: 'services' });
    }

    const goTo = (type: SearchServicesType, navigateTo: string) => {
        navigate(navigateTo, { type });
    }

    const onPresOption = (key: OptionsKey) => {
        switch(key){
            case 'app': 
                navigate('PayRecharge');
                dispatch(setTagName(itemSelect?.tagName))
                dispatch(setNumberRecharge(itemSelect?.reference))
                break;
            case 'store':
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
                break;
            case 'delete':
                const find: WalletFav[] = favs ? favs.filter((fav)=> itemSelect?.reference != fav.reference) : [];
                dispatch(setFavs(find));
                break;
        }
        setViewAmountModal(false);
    }

    useFocusEffect(()=>{
        dispatch(setTagName(''))
        dispatch(setNumberRecharge(''))
    })

    const selectOption = (item: WalletFav) => {
        setItemSelect(item);
        setViewAmountModal(true);
    }

    const selectHistory = (item: HistoryServices) => {
        navigate('TicketPay', {
            service: item
        })
    }

    return (
        <SafeArea
        childrenContainerStyle={{ paddingHorizontal: 0 }}
        topSafeArea={false}
        bottomSafeArea={false}
        backgroundColor={theme.brandColor.iconn_light_grey}
        barStyle="dark"
        >
            <Container row space="between" width={'100%'} style={{ flexWrap: 'wrap' }}>
                <Container style={styles.containerHeader}>
                    <SearchBar placeHolderText={'Buscar servicio'} isButton onPressSearch={goToSearch} />
                </Container>
                <Container row width={'100%'} style={{ paddingHorizontal: moderateScale(15), alignItems: 'center', justifyContent:'space-between' }}>
                    <CustomText text='Categorías' fontBold fontSize={moderateScale(16)}  />
                    <TouchableOpacity onPress={viewCategories}>
                        <CustomText text='Ver todo' fontBold fontSize={moderateScale(14)} textColor={theme.brandColor.iconn_accent_principal} underline />
                    </TouchableOpacity>
                </Container>
                <Container row width={'100%'} style={{ paddingHorizontal: moderateScale(15), alignItems: 'center', justifyContent:'space-between', marginTop: moderateScale(10) }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <Container row style={{width: moderateScale(1320), flexWrap: 'wrap'}} >
                            {
                                servicesCategories.map((item )=>(<CardPayServicesCategories type={item.type} navigateTo={item.navigateTo} goTo={goTo} name={item.name} icon={item.icon} />))
                            }
                        </Container>
                    </ScrollView>
                </Container>
                <Container width="100%" backgroundColor={theme.brandColor.iconn_white} style={{ paddingTop: 16, paddingBottom: 16, marginTop: moderateScale(32), height: verticalScale(330) }}>
                    <TabTwoElements items={tabNames} onPressItem={onPressTab} idSelected={idSelected} />
                    <ScrollView>
                        {idSelected === '1' ? (
                            favs ? 
                                favs.length ?
                                    favs.map((item, index) => {
                                        return <ServiceCardWallet key={index} item={item} onPressService={selectOption} />;
                                    })
                                :   
                                    <EmptyQRCard  height={verticalScale(240)}/>
                            :   
                                <EmptyQRCard  height={verticalScale(240)}/>
                        ) : 
                        (
                            history ? 
                                history.length ?
                                    history.map((item, index) => {
                                        return <ServiceHistoryWallet key={index} item={item} onPressService={selectHistory} />;
                                    })
                                :   
                                    <EmptyQRCard  height={verticalScale(240)}/>
                            :   
                                <EmptyQRCard  height={verticalScale(240)}/>
                        )}
                    </ScrollView>
                </Container>
            </Container>
            <OptionsModal options={optionFav} visible={viewAmountModal} onPressOption={onPresOption} onPressOut={()=>setViewAmountModal(false)} />
        </SafeArea>
    );
};

export default HomeServices;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(16)
  }
});
