import { useAlert } from 'context';
import { useCallback } from 'react';
import { AuthDataInterface, setBirthday, setGender, setId, setLastName, setName, setTelephone, useAppDispatch } from 'rtk';
import { authServices, vtexUserServices } from 'services';

interface props {
  user: string;
  userId: string;
  userType: string;
}

export const useOnboarding = () => {
  const dispatch = useAppDispatch();
  const alert = useAlert();

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

  /**
   * Get de user information and populate redux with it.
   */
   const getUserSocial = useCallback(async (user: props) => {
    const { data } = await vtexUserServices.getUserByEmail(user.user);
    if(data.length){
      const dataVtex: AuthDataInterface = {
        id: data[0].id,
        name: data[0].firstName,
        lastName: data[0].lastName,
        telephone: data[0].homePhone,
        birthday: data[0].birthDate,
        gender: data[0].gender
      };
      dispatch(setId({ id: dataVtex.id }));
      dispatch(setTelephone({ telephone: dataVtex.telephone }));
      dispatch(setGender({ gender: dataVtex.gender }));
      dispatch(setBirthday({ birthday: dataVtex.birthday }));
      dispatch(setName({ name: dataVtex.name }));
      dispatch(setLastName({ lastName: dataVtex.lastName }));
    }else{
      const userNew: AuthDataInterface = {
        email: user.user,
        firstName: '',
        lastName: '',
        homePhone: '',
        userId: user.userId
      };
      console.log({userNew})
      const response = await authServices.newUser(userNew);
      if (response) {
        console.log({newUser: response})
        getUser(user.user, true)
      }else{
        alert.show(
          {
            title: 'Lo sentimos',
            message: 'No pudimos crear tu cuenta en este momento. Por favor, intenta más tarde.',
            acceptTitle: 'Entendido',
            async onAccept() {
              alert.hide();
            }
          },
          'error'
        );
      }
    }
  }, []);

  return {
    getUser,
    getUserSocial
  };
};
