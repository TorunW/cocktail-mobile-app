import { useStoreActions } from 'easy-peasy';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const action = useStoreActions((actions) => actions);

export const getDrinks = async () => {
  const querySnapshot = await getDocs(collection(db, 'cocktails'));
  const ingSnapshort = await getDocs(collection(db, 'ingredients'));
  const ingredients = ingSnapshort.docs.map((doc, index) => ({
    id: doc.id,
    name: doc.data().name,
  }));
  action.cocktails.setIngredients(ingredients);
  const drinks = querySnapshot.docs.map((doc, index) => {
    return {
      id: doc.id,
      title: doc.data().title,
      image: doc.data().image,
      instructions: doc.data().instructions,
      alcoholic: doc.data().alcoholic,
      creator: doc.data().creator,
      complexity: doc.data().complexity,
      ingr: doc.data().ingr,
    };
  });

  action.cocktails.setCocktailList(drinks);
};
