import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAddressByPostalCodeThunk, saveUserAddressThunk, updateUserAddressThunk } from '../thunks/vtex-addresses.thunks';
import {
  logoutThunk,
  preSignUpThunk,
  registerThunk,
  signUpUserWithEmailAndPasswordThunk,
  registerWithFirebaseThunk,
  validateOtpThunk,
  validateUserThunk,
  signInWithEmailAndPasswordThunk,
  getUserThunk,
  sendEmailToRecoverPasswordThunk
} from '../thunks/auth.thunks';
import { Address, AddressWithPositionInterface, AuthDataInterface } from '../types';

const initialState: AuthDataInterface = {
  user_id: '',
  email: '',
  name: '',
  lastName: '',
  secondLastName: '',
  pass: '',
  secretKey: '',
  termsAndConditions: false,
  isLogged: false,
  sign_app_modes_id: undefined,
  addresses: [],
  seenCarousel: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialState,
    loading: false
  },
  reducers: {
    setAuthInitialState(state) {
      state.user = { ...initialState };
      state.loading = false;
    },
    setAuthEmail(state, action: PayloadAction<AuthDataInterface>) {
      state.user.email = action.payload.email;
    },
    setSignMode(state, action: PayloadAction<AuthDataInterface>) {
      state.user.sign_app_modes_id = action.payload.sign_app_modes_id;
    },
    setSecretKey(state, action: PayloadAction<AuthDataInterface>) {
      state.user.secretKey = action.payload.secretKey;
    },
    setPassword(state, action: PayloadAction<AuthDataInterface>) {
      state.user.pass = action.payload.pass;
    },
    setFullName(state, action: PayloadAction<AuthDataInterface>) {
      state.user.name = action.payload.name;
      state.user.lastName = action.payload.lastName;
    },
    setPhoto(state, action: PayloadAction<AuthDataInterface>) {
      state.user.photo = action.payload.photo;
    },
    setEmailVerified(state, action: PayloadAction<AuthDataInterface>) {
      state.user.emailVerified = action.payload.emailVerified;
    },
    setTelephone(state, action: PayloadAction<AuthDataInterface>) {
      state.user.telephone = action.payload.telephone;
    },
    setBirthday(state, action: PayloadAction<AuthDataInterface>) {
      state.user.birthday = action.payload.birthday;
    },
    setGender(state, action: PayloadAction<AuthDataInterface>) {
      state.user.gender = action.payload.gender;
    },
    setTermsAndCond(state, action: PayloadAction<AuthDataInterface>) {
      state.user.termsAndConditions = action.payload.termsAndConditions;
    },
    setUserId(state, action: PayloadAction<AuthDataInterface>) {
      // TODO (IMPORTANT!!!): REVERT THIS HARDCODED USER ID:
      // state.user.user_id = 'da5550d6-2a38-11ed-835d-129d14bde747';
      state.user.user_id = action.payload.user_id;
    },
    setIsLogged(state, action: PayloadAction<AuthDataInterface>) {
      state.user.isLogged = action.payload.isLogged;
    },
    setAddressesList(state, action: PayloadAction<Address[]>) {
      state.user.addresses = action.payload;
    },
    addAddressToList(state, action: PayloadAction<Address>) {
      state.user.addresses.push(action.payload);
    },
    deleteAddressFromList(state, action: PayloadAction<number>) {
      state.user.addresses.splice(action.payload, 1);
    },
    replaceAddressFromList(state, action: PayloadAction<AddressWithPositionInterface>) {
      state.user.addresses.splice(action.payload.position, 1, action.payload.address);
    },
    setAddressDefault(state, action: PayloadAction<number>) {
      state.user.addresses.map(x => (x.isDefault = false));
      state.user.addresses[action.payload].isDefault = true;
    },
    setSeenCarousel(state, action: PayloadAction<boolean>) {
      state.user.seenCarousel = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(preSignUpThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(preSignUpThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(preSignUpThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(validateOtpThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(validateOtpThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(validateOtpThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(registerThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(registerThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(registerThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(logoutThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(logoutThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(logoutThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(signUpUserWithEmailAndPasswordThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(signUpUserWithEmailAndPasswordThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(signUpUserWithEmailAndPasswordThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(validateUserThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(validateUserThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(validateUserThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(registerWithFirebaseThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(registerWithFirebaseThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(registerWithFirebaseThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(signInWithEmailAndPasswordThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(signInWithEmailAndPasswordThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(signInWithEmailAndPasswordThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getUserThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getUserThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getUserThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(sendEmailToRecoverPasswordThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(sendEmailToRecoverPasswordThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(sendEmailToRecoverPasswordThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getAddressByPostalCodeThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAddressByPostalCodeThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getAddressByPostalCodeThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(saveUserAddressThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(saveUserAddressThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(saveUserAddressThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateUserAddressThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateUserAddressThunk.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateUserAddressThunk.rejected, state => {
      state.loading = false;
    });
  }
});
// TODO: validate if it is possible to reduce extra reducers.
export const {
  setAuthInitialState,
  setAuthEmail,
  setSignMode,
  setSecretKey,
  setPassword,
  setFullName,
  setPhoto,
  setEmailVerified,
  setTelephone,
  setBirthday,
  setGender,
  setTermsAndCond,
  setUserId,
  setIsLogged,
  setAddressesList,
  addAddressToList,
  deleteAddressFromList,
  replaceAddressFromList,
  setAddressDefault,
  setSeenCarousel
} = authSlice.actions;
export default authSlice.reducer;
