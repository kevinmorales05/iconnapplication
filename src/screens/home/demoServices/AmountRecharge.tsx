import React from 'react';
import { Container, SafeArea} from 'components';
import theme from 'components/theme/theme';

import { LisetSearchType, packageRecharge } from '../../../common/demoServicesPay';
import { moderateScale } from 'utils/scaleMetrics';
import CardAmountRecharge from 'components/organisms/CardAmountRecharge';
import { ScrollView } from 'react-native-gesture-handler';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { setAmountOfRecharge, useAppDispatch } from 'rtk';

const AmountRecharge: React.FC = () => {

  const dispatch = useAppDispatch();
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const selectOption = (item: LisetSearchType) => {
    dispatch(setAmountOfRecharge(item.key));
    if(item.navigateTo)
      goBack()
  }

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_light_grey}
      barStyle="dark"
    >
      <ScrollView>
        <Container width={'100%'} style={{ paddingHorizontal: moderateScale(15), paddingTop: moderateScale(10) }}>
          {
            packageRecharge.length ?
              packageRecharge.map((item)=>(
                <TouchableOpacity onPress={()=>selectOption(item)}>
                  <CardAmountRecharge subTitle={item.subTitle} text={item.value} image={item.image} amount={item.key} />
                </TouchableOpacity>
              ))
            :
              null
          }
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

export default AmountRecharge;
