import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuestInterface } from 'rtk/types';

const initialState: GuestInterface = {
  isGuest: false
};

const guestSlice = createSlice({
  name: 'guest',
  initialState: {
    guest: initialState,
  },
  reducers: {
    setGuestInitialState(state) {
        state.guest = { ...initialState };
      },
    setIsGuest(state, action: PayloadAction<GuestInterface>){
      state.guest.isGuest = action.payload.isGuest;
    }
  }
});

export const { setGuestInitialState, setIsGuest } = guestSlice.actions;
export default guestSlice.reducer;