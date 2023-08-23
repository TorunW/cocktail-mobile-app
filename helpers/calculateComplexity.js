export const calculateDrinkComplexity = (drink) => {
  const objectKeys = Object.keys(drink);
  const objectValues = Object.values(drink);

  const firstIndex = objectKeys.indexOf('strIngredient1');
  const lastIndex = objectKeys.indexOf('strIngredient15');

  const filteredIngredientArr = objectValues.filter(
    (ingredient, index) =>
      index > firstIndex && index < lastIndex && ingredient !== null
  );

  let ingredientScore;
  if (filteredIngredientArr.length <= 2) {
    ingredientScore = 1;
  } else if (
    filteredIngredientArr.length > 2 &&
    filteredIngredientArr.length < 5
  ) {
    ingredientScore = 2;
  } else if (filteredIngredientArr.length === 5) {
    ingredientScore = 3;
  }

  const instructionsLength = drink.strInstructions.length;
  let instructionScore;
  if (instructionsLength <= 150) {
    instructionScore = 1;
  } else if (instructionsLength > 150 && instructionsLength <= 300) {
    instructionScore = 2;
  } else if (instructionsLength > 300) {
    instructionScore = 3;
  }

  let score = ingredientScore + instructionScore / 2;

  let complexity;
  if (score <= 1.5) {
    complexity = 'easy';
  } else if (score > 1.5 && score <= 2.5) {
    complexity = 'middle';
  } else if (complexity > 2.5) {
    complexity = 'hard';
  }

  return complexity;
};
