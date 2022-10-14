import { useCallback } from 'react';
import { AuthDataInterface, setBirthday, setGender, setId, setLastName, setName, setTelephone, useAppDispatch } from 'rtk';
import { vtexUserServices } from 'services';

export const useOnboarding = () => {
  const dispatch = useAppDispatch();

  /**
   * Get de user information and populate redux with it.
   */
  const getUser = useCallback(async (email: string, isLogin?: boolean) => {
    const { data } = await vtexUserServices.getUserByEmail(email);
    const dataVtex: AuthDataInterface = {
      id: data[0].id,
      name: data[0].firstName,
      lastName: data[0].lastName,
      telephone: data[0].homePhone,
      birthday: data[0].birthDate,
      gender: data[0].gender
    };
    dispatch(setId({ id: dataVtex.id }));
    if (isLogin) {
      dispatch(setTelephone({ telephone: dataVtex.telephone }));
      dispatch(setGender({ gender: dataVtex.gender }));
      dispatch(setBirthday({ birthday: dataVtex.birthday }));
      dispatch(setName({ name: dataVtex.name }));
      dispatch(setLastName({ lastName: dataVtex.lastName }));
    }
  }, []);

  return {
    getUser
  };
};
