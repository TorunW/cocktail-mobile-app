import { useStoreState } from 'easy-peasy';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const handlePressLike = async (itemData) => {
  const userRef = doc(db, 'users', itemData.userId);
  const drinkRef = doc(db, 'ingredients', itemData.drinkId);

  await updateDoc(userRef, {
    likes: arrayUnion(drinkRef),
  });

  //if the ref exsitst then remove instead of add
  //add a toggle state for appereance of the button
};
