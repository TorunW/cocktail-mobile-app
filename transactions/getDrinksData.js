import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default getDrinksData = async () => {
  const querySnapshot = await getDocs(collection(db, 'cocktails'));

  /*   const docRef = doc(db, 'ingredients', 'ref');
  const docSnap = await getDoc(docRef); */

  const drinks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    image: doc.data().image,
    instructions: doc.data().instructions,
    alcoholic: doc.data().alcoholic,
    complexity: doc.data().complexity,
    ingredients: doc.data().ingredients.map(async (item) => {
      return {
        ingredient: (await getDoc(item.ingredient)).data().name,
        measure: item.measure,
      };
    }),
  }));
  return drinks;
};
