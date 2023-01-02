import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//estado inicial del modulos
const initialStateModules: any = [];

// creo slice de modules
const helpCenterSlice = createSlice({
  name: 'helpCenter',
  initialState: {
    helpCenterModules: initialStateModules,
    dateHelpSync: undefined
  },
  reducers: {
    setModulesInitialState(state) {
      state.helpCenterModules = { ...initialStateModules };
      state.dateHelpSync = undefined;
    },
    setModules(state, action: PayloadAction<any>) {
      state.helpCenterModules = action.payload;
    },
    setDateHelpSync(state, action: PayloadAction<Date>) {
      state.dateHelpSync = action.payload;
    }
  }
});

export const { setModulesInitialState, setModules, setDateHelpSync } = helpCenterSlice.actions;
export default helpCenterSlice.reducer;
