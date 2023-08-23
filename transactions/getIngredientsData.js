import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default getIngredientsData = async () => {
  const querySnapshot = await getDocs(collection(db, 'ingredients'));
  const ingredients = querySnapshot.docs.map((doc, index) => ({
    id: doc.id,
    name: doc.data().name,
  }));
  return ingredients;
};
