import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import questsReducer from './questsSlice';
import leaderboardReducer from './leaderboardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    quests: questsReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;