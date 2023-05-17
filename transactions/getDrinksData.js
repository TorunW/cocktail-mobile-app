import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default getDrinksData = async () => {
  const querySnapshot = await getDocs(collection(db, 'ingredients'));
  const drinks = querySnapshot.docs.map((doc, index) => ({
    id: doc.id,
    title: doc.data().title,
    image: doc.data().image,
    instructions: doc.data().instructions,
    alcoholic: doc.data().alcoholic,
    complexity: doc.data().complexity,
    ingredients: doc.data().ingredients.map((item) => ({
      ingredient: item.ingredient,
      measure: item.measure,
    })),
  }));
  return drinks;
};
