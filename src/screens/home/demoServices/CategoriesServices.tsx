import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, SafeArea, SearchBar } from 'components';
import theme from 'components/theme/theme';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import CardPayServicesCategories from 'components/organisms/CardPayServicesCategories';
import { ServicesCategories, servicesCategories } from '../../../common/demoServicesPay';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';


const HomeServices: React.FC = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const [items, setItems] = useState<ServicesCategories[]>(servicesCategories)

    const goToSearch = () => {
        navigate('SearchScreenService'); 
    }

    const filter = (text: string) => {
        if(text.length > 3){
          const found = items.filter((item) => item.name.toLowerCase().includes(text.toLocaleLowerCase()));
          setItems(found);
        } else {
          setItems(servicesCategories)
        }
    };

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
                    <SearchBar placeHolderText={'Buscar servicio'} onEndWriting={()=>{}} onChangeTextSearch={(text)=>filter(text)} onPressSearch={goToSearch} />
                </Container>
                <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15)}}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Container row style={{width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: verticalScale(150)}} >
                            {
                                items.map((item )=>(<CardPayServicesCategories isVertical name={item.name} icon={item.icon} />))
                            }
                        </Container>
                    </ScrollView>
                </Container>
            </Container>
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
