import _mcData from 'minecraft-data';
const mcData = _mcData('1.16.1');
const items = Object.keys(mcData.items).map((k) => {
  return mcData.items[(k as unknown) as number];
});
const recipes = (Object.keys(mcData.recipes).map((k) => {
  return mcData.recipes[(k as unknown) as number];
}) as _mcData.Recipe[]).flat();

export { mcData };

export function getRecipeToCraft(item: number): _mcData.Recipe {
  return recipes.find((v) => {
    return (v.result as CraftingResult).id === item;
  }) as _mcData.Recipe;
}
export function getIngredientsFromShapelessRecipe(
  recipe: _mcData.ShapelessRecipe,
) {
  return recipe.ingredients.map((ingredient) => {
    if (!isNaN(ingredient as number)) {
      return { item: items[ingredient as number], count: 1 };
    }
    if (
      Array.isArray(ingredient) &&
      ingredient.length === 2 &&
      !isNaN(ingredient[0] as number) &&
      !isNaN(ingredient[1] as number)
    ) {
      return {
        item: items[ingredient[0] as number],
        count: ingredient[1] as number,
      };
    }
    //@ts-expect-error
    if (ingredient[0] && !isNaN(ingredient[0] as number)) {
      //@ts-expect-error
      return { item: items[ingredient[0] as number], count: 1 };
    }
  });
}
export function getIngredientsFromShapedRecipe(recipe: _mcData.ShapedRecipe) {
  return recipe.inShape.map((row) =>
    row.map((ingredient) => {
      if (!isNaN(ingredient as number)) {
        return { item: items[ingredient as number], count: 1 };
      }
      if (
        Array.isArray(ingredient) &&
        ingredient.length === 2 &&
        !isNaN(ingredient[0] as number) &&
        !isNaN(ingredient[1] as number)
      ) {
        return {
          item: items[ingredient[0] as number],
          count: ingredient[1] as number,
        };
      }
      //@ts-expect-error
      if (ingredient[0] && !isNaN(ingredient[0] as number)) {
        //@ts-expect-error
        return { item: items[ingredient[0] as number], count: 1 };
      }
      return null;
    }),
  );
}
export function getRawIngredients(
  item: number,
): {
  item: _mcData.Item;
  count: number;
}[] {
  const recipeUntyped = getRecipeToCraft(item);
  if ((recipeUntyped as _mcData.ShapedRecipe).inShape) {
    const recipe = recipeUntyped as _mcData.ShapedRecipe;
    const ingredients = getIngredientsFromShapedRecipe(recipe).flat();
    const dedupedIngredients: ({
      item: _mcData.Item;
      count: number;
    } | null)[] = [];
    for (let i = 0; i < ingredients.length; i++) {
      const recipe = ingredients[i];
      if (!recipe?.item) continue;

      if (dedupedIngredients.find((v) => v?.item.id === recipe.item.id)) {
        (dedupedIngredients.find((v) => v?.item.id === recipe.item.id) as {
          item: _mcData.Item;
          count: number;
        }).count += recipe.count;
      } else {
        dedupedIngredients.push(recipe);
      }
    }
    //@ts-expect-error
    return dedupedIngredients;
  } else {
    const recipe = recipeUntyped as _mcData.ShapelessRecipe;
    const ingredients = getIngredientsFromShapelessRecipe(recipe);
    //@ts-expect-error
    return ingredients;
  }
}

export interface CraftingResult {
  count: number;
  id: number;
}
