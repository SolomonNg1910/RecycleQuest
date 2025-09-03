import { Quote } from '../types';

export const DAILY_QUOTES: Quote[] = [
  {
    id: '1',
    text: "The Earth does not belong to us; we belong to the Earth.",
    author: "Chief Seattle",
    category: 'motivation'
  },
  {
    id: '2',
    text: "We do not inherit the Earth from our ancestors; we borrow it from our children.",
    author: "Native American Proverb",
    category: 'motivation'
  },
  {
    id: '3',
    text: "Recycling one aluminum can saves enough energy to power a TV for 3 hours.",
    author: "Environmental Fact",
    category: 'fact'
  },
  {
    id: '4',
    text: "It takes 450 years for a plastic bottle to decompose in a landfill.",
    author: "Environmental Fact",
    category: 'fact'
  },
  {
    id: '5',
    text: "Always rinse containers before recycling to avoid contamination.",
    author: "RecycleQuest Tip",
    category: 'tip'
  },
  {
    id: '6',
    text: "Small actions, when multiplied by millions of people, can transform the world.",
    author: "Howard Zinn",
    category: 'motivation'
  },
  {
    id: '7',
    text: "Singapore recycles only 13% of household waste. Let's change that together!",
    author: "NEA Statistics",
    category: 'fact'
  }
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
  return DAILY_QUOTES[randomIndex];
};

export const getQuoteByCategory = (category: 'motivation' | 'fact' | 'tip'): Quote => {
  const categoryQuotes = DAILY_QUOTES.filter(quote => quote.category === category);
  const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
  return categoryQuotes[randomIndex];
};