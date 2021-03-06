import {mcData, getRawIngredients} from "./util.js";
import Fuse from "../../_snowpack/pkg/fusejs.js";
export const fuse = new Fuse(Object.values(mcData.items), {
  keys: ["displayName"]
});
export const search = (query) => {
  return getRawIngredients(fuse.search(query)[0].item.id);
};
