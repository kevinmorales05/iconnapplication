import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLoading } from 'context';
import { HomeStackParams } from 'navigation/types';
import { RootState, useAppSelector } from 'rtk';
import AnimatedLottieView from 'lottie-react-native';
import { moderateScale } from 'utils/scaleMetrics';

const InitialPage: React.FC = () => {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const loader = useLoading();
    const { reset } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

    useEffect(()=>{
        if(user.cp || user.geopoint){
          reset({
            index: 0,
            routes: [{ name: 'Home', params: { paySuccess: false } }]
          });
        }else{
            reset({
                index: 0,
                routes: [{ name: 'PostalCode' }]
            }); 
        }
      }, [])


    return(
        <View style={styles.container}>
          <AnimatedLottieView
              style={{width:moderateScale(250), height:moderateScale(250)}}
              source={require('../../../assets/images/iconn-loader-ecommerce.json')}
              autoPlay
              loop
          />
        </View>
    )
}

export default InitialPage;

const styles = StyleSheet.create({
    container: {
  
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    }
});