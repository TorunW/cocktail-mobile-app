import { useStoreActions } from 'easy-peasy';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default getDrinksData = async () => {
  const querySnapshot = await getDocs(collection(db, 'cocktails'));
  return querySnapshot.docs.map((doc, index) => ({
    id: doc.id,
    title: doc.data().title,
    image: doc.data().image,
    instructions: doc.data().instructions,
    alcoholic: doc.data().alcoholic,
    complexity: doc.data().complexity,
    ingr: doc.data().ingr,
  }));
};
