export default getIngredientsArr = (data) => {
  const keysArr = Object.keys(data);
  const startIndexIngred = keysArr.findIndex(
    (item) => item === 'strIngredient1'
  );
  const lastIndexIngred = keysArr.findIndex(
    (item) => item === 'strIngredient15'
  );
  const valuesArr = Object.values(data);

  const ingrArr = [];
  valuesArr.filter((item, index) => {
    if (
      index >= startIndexIngred &&
      index <= lastIndexIngred &&
      item !== null
    ) {
      ingrArr.push(item);
    }
  });

  return ingrArr;
};
