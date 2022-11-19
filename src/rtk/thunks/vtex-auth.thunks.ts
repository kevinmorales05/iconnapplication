import { createAsyncThunk } from '@reduxjs/toolkit';
/* import interfaces from types
   import slice */
import { vtexauthServices } from 'services';

export const startAuthenticationThunk = createAsyncThunk('/start/authentication/', async (email: string) => {
  return await vtexauthServices.startAuthentication(email);
});