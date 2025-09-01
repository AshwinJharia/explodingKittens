import { uuid } from 'uuidv4';
import { CARD_TYPES } from '../constants/gameConstants';

const CARD_TYPES_ARRAY = [
  CARD_TYPES.CAT,
  CARD_TYPES.DEFUSE,
  CARD_TYPES.SHUFFLE,
  CARD_TYPES.ATTACK,
  CARD_TYPES.EXPLODING_KITTEN,
];

export const generateDeck = () => {
  return Array.from({ length: 5 }, () => ({
    id: uuid(),
    type: CARD_TYPES_ARRAY[Math.floor(Math.random() * CARD_TYPES_ARRAY.length)],
  }));
};

export const shuffleDeck = (deck) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};