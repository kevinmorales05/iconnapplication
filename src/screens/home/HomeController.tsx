import { ICONN_COFFEE } from 'assets/images';
import { Container, CustomModal, SafeArea, TextContainer } from 'components';
import React, { Component, useState } from 'react'
import { Dimensions, Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from 'components/theme/theme';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { RootState, useAppSelector } from 'rtk';
import HomeScreen from './HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';


const CONTAINER_HEIGHT = (Dimensions.get('window').height)/6-20;
const CONTAINER_HEIGHTMOD = (Dimensions.get('window').height)/5 + 10;

interface Props {
  carouselItems?: ItemProps;
}
interface ItemProps {
  image:ImageSourcePropType;
  text: string;
}
interface State {
  activeIndex: number;
  carouselItems: ItemProps[];
}

const HomeController: React.FC = () => {
	const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [modVisibility, setModVisibility] = useState(true)

	const logOut = () => {
		navigate('ContinueWith');
	}

  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor="transparent"
      barStyle="light"
    >
      <HomeScreen
				name={user.name}        
        onPressLogOut={logOut}
      />     
      <CustomModal visible={modVisibility}>
      <Container center style={styles.modalBackground}>
        <Pressable style={{alignSelf: 'flex-end'}} onPress={()=> setModVisibility(false)}>
          <Container circle style={styles.iconContainer}>
            <Icon
              name="window-close"
              size={20}/>
          </Container>
        </Pressable>
        <TextContainer
          text="¡Hola Alejandra!"
          typography='h3'
          fontBold={true}
          textAlign='center'
          marginTop={4}/>
        <Container style={{backgroundColor: theme.brandColor.iconn_warm_grey, alignSelf:'stretch', borderRadius: 16}}>
          <Pressable onPress={()=> setModVisibility(false)}>
            <TextContainer
              text="Omitir"
              typography='link'
              fontBold={true}
              textAlign='center'
              textColor={theme.fontColor.link}
              underline={true}
              marginTop={27}
              marginBottom={30}
            />   
          </Pressable>
        </Container>
      </Container>
    </CustomModal> 
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  modalBackground: {
    justifyContent: 'space-evenly',
    backgroundColor:"white", 
    flex: 1, 
    height: CONTAINER_HEIGHT, 
    marginVertical: CONTAINER_HEIGHT, 
    marginHorizontal: 40,
    borderRadius: 16, 
    paddingTop: 10
},
iconContainer:{
    backgroundColor: theme.brandColor.iconn_warm_grey, 
    alignSelf:'flex-end',
    marginTop: 12,
    marginRight: 12,
    padding: 8
}
});

export default HomeController;
