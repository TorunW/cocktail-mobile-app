import calculateDrinkComplexity from './calculateComplexity';

export const addComplexityScoreToDrinks = (drinks) => {
  let highestInstructionLength = 0;
  drinks.forEach((drink, index) => {
    if (
      drink.strInstructions !== null &&
      drink.strInstructions.length > highestInstructionLength
    ) {
      highestInstructionLength = drink.strInstructions.length;
    }
  });

  const newDrinks = drinks.map((orgDrink, index) => ({
    ...orgDrink,
    complexity: calculateDrinkComplexity(orgDrink),
  }));

  return newDrinks;
};
