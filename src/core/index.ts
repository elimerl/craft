import { mcData, getRawIngredients } from './util';
import type _mcData from 'minecraft-data';
import Fuse from 'fuse.js';
export const fuse = new Fuse(Object.values(mcData.items), {
  keys: ['displayName'],
});
export const search = (query: string) => {
  try {
    return getRawIngredients(fuse.search(query)[0].item.id);
  } catch (error) {
    return [];
  }
};
