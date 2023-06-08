import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default getDrinksData = async () => {
  const querySnapshot = await getDocs(collection(db, 'cocktails'));

  const drinks = await Promise.all(
    querySnapshot.docs.map(async (doc) => ({
      id: doc.id,
      title: doc.data().title,
      image: doc.data().image,
      instructions: doc.data().instructions,
      alcoholic: doc.data().alcoholic,
      complexity: doc.data().complexity,
      ingredients: await Promise.all(
        doc.data().ingredients.map(async (item) => {
          return {
            ingredient: (await getDoc(item.ingredient)).data().name,
            measure: item.measure,
          };
        })
      ),
    }))
  );

  console.log(drinks);
  return drinks;
};
