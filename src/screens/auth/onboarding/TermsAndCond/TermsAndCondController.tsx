import React, { useEffect } from 'react';
import TermsAndCondScreen from './TermsAndCondScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { registerThunk } from 'rtk/thunks/auth.thunks';
import { useAlert, useLoading } from 'context';

const TermsAndCondController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const onSubmit = async () => {
    loader.show();
    const { payload } = await dispatch(registerThunk(user));
    if (!payload.errors) {
      console.log('proceso de registro finalizado: ', payload);
      navigate('HomeStack')
    } else {
      alert.show({
        title: payload.errors[0]
      });
    }
  };

  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor="white"
      barStyle="dark"
      css={styles.backgroundImage}
    >
      <TermsAndCondScreen goBack={goBack} onSubmit={onSubmit}/>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0
  }
});


export default TermsAndCondController;
