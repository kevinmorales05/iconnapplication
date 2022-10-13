import { useCallback } from 'react';
import { AuthDataInterface, setId, useAppDispatch } from 'rtk';
import { vtexUserServices } from 'services';

export const useOnboarding = () => {
  const dispatch = useAppDispatch();

  /**
   * Get de user information and populate redux with it.
   */
  const getUser = useCallback(async (email: string) => {
    const { data } = await vtexUserServices.getUserByEmail(email);
    const dataVtex: AuthDataInterface = {
      id: data[0].id
    };
    dispatch(setId({ id: dataVtex.id }));
  }, []);

  return {
    getUser
  };
};
