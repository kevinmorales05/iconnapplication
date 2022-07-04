import { Container, CustomModal, SafeArea, TextContainer } from 'components';
import React, { useState } from 'react'
import { Dimensions, ImageSourcePropType, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from 'components/theme/theme';
import { RootState, useAppSelector, useAppDispatch } from 'rtk';
import HomeScreen from './HomeScreen';
import { logoutThunk } from 'rtk/thunks/auth.thunks';

const CONTAINER_HEIGHT = (Dimensions.get('window').height)/6-20;
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
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [modVisibility, setModVisibility] = useState(true)
  const dispatch = useAppDispatch();

	const logOut = async () => await dispatch(logoutThunk());

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
