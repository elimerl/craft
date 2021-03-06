import _mcData from "../../_snowpack/pkg/minecraft-data.js";
const mcData = _mcData("1.16.1");
const items = Object.keys(mcData.items).map((k) => {
  return mcData.items[k];
});
const recipes = Object.keys(mcData.recipes).map((k) => {
  return mcData.recipes[k];
}).flat();
export {mcData};
export function getRecipeToCraft(item) {
  return recipes.find((v) => {
    return v.result.id === item;
  });
}
export function getIngredientsFromShapelessRecipe(recipe) {
  return recipe.ingredients.map((ingredient) => {
    if (!isNaN(ingredient)) {
      return {item: items[ingredient], count: 1};
    }
    if (Array.isArray(ingredient) && ingredient.length === 2 && !isNaN(ingredient[0]) && !isNaN(ingredient[1])) {
      return {
        item: items[ingredient[0]],
        count: ingredient[1]
      };
    }
    if (ingredient[0] && !isNaN(ingredient[0])) {
      return {item: items[ingredient[0]], count: 1};
    }
  });
}
export function getIngredientsFromShapedRecipe(recipe) {
  return recipe.inShape.map((row) => row.map((ingredient) => {
    if (!isNaN(ingredient)) {
      return {item: items[ingredient], count: 1};
    }
    if (Array.isArray(ingredient) && ingredient.length === 2 && !isNaN(ingredient[0]) && !isNaN(ingredient[1])) {
      return {
        item: items[ingredient[0]],
        count: ingredient[1]
      };
    }
    if (ingredient[0] && !isNaN(ingredient[0])) {
      return {item: items[ingredient[0]], count: 1};
    }
    return null;
  }));
}
export function getRawIngredients(item) {
  const recipeUntyped = getRecipeToCraft(item);
  if (recipeUntyped.inShape) {
    const recipe = recipeUntyped;
    const ingredients = getIngredientsFromShapedRecipe(recipe).flat();
    const dedupedIngredients = [];
    for (let i = 0; i < ingredients.length; i++) {
      const recipe2 = ingredients[i];
      if (!recipe2?.item)
        continue;
      if (dedupedIngredients.find((v) => v?.item.id === recipe2.item.id)) {
        dedupedIngredients.find((v) => v?.item.id === recipe2.item.id).count += recipe2.count;
      } else {
        dedupedIngredients.push(recipe2);
      }
    }
    return dedupedIngredients;
  } else {
    const recipe = recipeUntyped;
    const ingredients = getIngredientsFromShapelessRecipe(recipe);
    return ingredients;
  }
}
