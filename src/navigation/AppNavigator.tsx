import { useAlert, useLoading } from 'context';
import React, { useEffect } from 'react';
import { RootState, useAppSelector, useAppDispatch } from 'rtk';
import { setAppError, setAppInitialState } from 'rtk/slices/appSlice';
import AuthStack from './stacks/AuthStack';

const AppNavigator: React.FC = () => {

  const { error } = useAppSelector((state: RootState) => state.app);
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const loader = useLoading();

  /**
   * Show global http errors.
   */
  useEffect(() => {
    if (error !== undefined) {
      alert.show({
        title: error
      });
      loader.hide();
      dispatch(setAppError({error:undefined}));
    }
  }, [error]);

  /**
   * Reset the app state
   */
  useEffect(() => {
    dispatch(setAppInitialState({}));
  }, []);


  return (
    <AuthStack />
  );
};

export default AppNavigator;
