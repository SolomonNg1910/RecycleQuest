import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCoins, addXP } from '../store/userSlice';
import { updateQuestProgress } from '../store/questsSlice';
import { RECYCLING_RATES, XP_RATES } from '../utils/constants';

export const useRecycleQuest = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const quests = useSelector((state: RootState) => state.quests.dailyQuests);

  const recordRecycling = (itemType: keyof typeof RECYCLING_RATES, weight: number) => {
    const coinsEarned = Math.floor(weight * RECYCLING_RATES[itemType]);
    const xpEarned = Math.floor(weight * XP_RATES.perKg);

    dispatch(addCoins(coinsEarned));
    dispatch(addXP(xpEarned));

    // Update relevant quests
    const weightQuest = quests.find(q => q.type === 'weight');
    if (weightQuest) {
      dispatch(updateQuestProgress({ 
        questId: weightQuest.id, 
        progress: weightQuest.progress + weight 
      }));
    }

    return { coinsEarned, xpEarned };
  };

  const recordBinScan = () => {
    dispatch(addXP(XP_RATES.binScan));

    // Update scan quest
    const scanQuest = quests.find(q => q.type === 'scan');
    if (scanQuest) {
      dispatch(updateQuestProgress({ 
        questId: scanQuest.id, 
        progress: scanQuest.progress + 1 
      }));
    }
  };

  const getLevelProgress = () => {
    if (!user) return { currentLevel: 1, progress: 0, nextLevelXP: 100 };
    
    const currentLevel = user.level;
    const currentXP = user.xp;
    const xpForCurrentLevel = (currentLevel - 1) * 100;
    const xpForNextLevel = currentLevel * 100;
    const progress = ((currentXP - xpForCurrentLevel) / 100) * 100;

    return {
      currentLevel,
      progress: Math.max(0, Math.min(100, progress)),
      nextLevelXP: xpForNextLevel,
    };
  };

  return {
    user,
    quests,
    recordRecycling,
    recordBinScan,
    getLevelProgress,
  };
};