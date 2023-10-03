export const getComplexity = async (instructions, ingredients) => {
  let instructionScore;
  let ingredientScore;

  if (instructions.length === 1) {
    instructionScore = 1;
  }
  if (instructions.length === 2) {
    instructionScore = 2;
  }
  if (instructions.length === 3) {
    instructionScore = 3;
  }
  if (instructions.length === 4) {
    instructionScore = 4;
  }
  if (instructions.length >= 5) {
    instructionScore = 5;
  }

  if (ingredients.length === 1) {
    ingredientScore = 1;
  }
  if (ingredients.length === 2) {
    ingredientScore = 2;
  }
  if (ingredients.length === 3) {
    ingredientScore = 3;
  }
  if (ingredients.length === 4) {
    ingredientScore = 4;
  }
  if (ingredients.length >= 5) {
    ingredientScore = 5;
  }

  const complexityScore = ingredientScore + instructionScore;
  return complexityScore;
};
