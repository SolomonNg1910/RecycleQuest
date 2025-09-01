/**
 * Redux store configuration with RTK Query
 */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import slice reducers
import authSlice from './slices/authSlice';
// import userSlice from './slices/userSlice';
// import questSlice from './slices/questSlice';
// import socialSlice from './slices/socialSlice';
// import rewardSlice from './slices/rewardSlice';

// Import API services (will be created in subsequent tasks)
// import { authApi } from '../services/authApi';
// import { userApi } from '../services/userApi';
// import { questApi } from '../services/questApi';
// import { socialApi } from '../services/socialApi';
// import { rewardApi } from '../services/rewardApi';

export const store = configureStore({
  reducer: {
    // Slice reducers
    auth: authSlice,
    // user: userSlice,
    // quests: questSlice,
    // social: socialSlice,
    // rewards: rewardSlice,
    
    // API reducers
    // [authApi.reducerPath]: authApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [questApi.reducerPath]: questApi.reducer,
    // [socialApi.reducerPath]: socialApi.reducer,
    // [rewardApi.reducerPath]: rewardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
    // Add API middleware (will be uncommented when APIs are created)
    // .concat(authApi.middleware)
    // .concat(userApi.middleware)
    // .concat(questApi.middleware)
    // .concat(socialApi.middleware)
    // .concat(rewardApi.middleware)
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;