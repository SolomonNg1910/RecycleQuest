import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyQuest } from '../types';

interface QuestsState {
  dailyQuests: DailyQuest[];
  quoteOfTheDay: {
    text: string;
    author: string;
  };
}

const initialState: QuestsState = {
  dailyQuests: [
    {
      id: '1',
      title: 'Bin Run',
      description: 'Scan 3 recycling bins today',
      target: 3,
      progress: 0,
      reward: 50,
      completed: false,
      type: 'scan',
    },
    {
      id: '2',
      title: 'Green Weight',
      description: 'Recycle 2kg of materials',
      target: 2,
      progress: 0,
      reward: 100,
      completed: false,
      type: 'weight',
    },
  ],
  quoteOfTheDay: {
    text: "The Earth does not belong to us; we belong to the Earth.",
    author: "Chief Seattle"
  },
};

const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    updateQuestProgress: (state, action: PayloadAction<{ questId: string; progress: number }>) => {
      const quest = state.dailyQuests.find(q => q.id === action.payload.questId);
      if (quest) {
        quest.progress = Math.min(action.payload.progress, quest.target);
        quest.completed = quest.progress >= quest.target;
      }
    },
    completeQuest: (state, action: PayloadAction<string>) => {
      const quest = state.dailyQuests.find(q => q.id === action.payload);
      if (quest) {
        quest.completed = true;
        quest.progress = quest.target;
      }
    },
    resetDailyQuests: (state) => {
      state.dailyQuests.forEach(quest => {
        quest.progress = 0;
        quest.completed = false;
      });
    },
  },
});

export const { updateQuestProgress, completeQuest, resetDailyQuests } = questsSlice.actions;
export default questsSlice.reducer;