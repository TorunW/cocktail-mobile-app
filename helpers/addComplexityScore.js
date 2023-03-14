import calculateDrinkComplexity from './calculateComplexity';

function addComplexityScoreToDrinks(drinks) {
  let highestInstructionLength = 0;
  drinks.forEach((drink, index) => {
    if (
      drink.strInstructions !== null &&
      drink.strInstructions.length > highestInstructionLength
    ) {
      highestInstructionLength = drink.strInstructions.length;
    }
  });

  // MAPPING
  const newDrinks = drinks.map((orgDrink, index) => ({
    ...orgDrink,
    complexity: calculateDrinkComplexity(orgDrink),
  }));

  return newDrinks;
}

export default addComplexityScoreToDrinks;
