import { FlatList } from 'react-native';

export default getIngredientsArr = (data) => {
  const keysArr = Object.keys(data);

  const startIndexMeasure = keysArr.findIndex((item) => item === 'strMeasure1');
  const lastIndexMeasure = keysArr.findIndex((item) => item === 'strMeasure15');
  const valuesArr = Object.values(data);

  const measArr = [];
  valuesArr.filter((item, index) => {
    if (
      index >= startIndexMeasure &&
      index <= lastIndexMeasure &&
      item !== null
    ) {
      measArr.push(item);
    }
  });

  return measArr;
};
