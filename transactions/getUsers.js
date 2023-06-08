import { db } from '../firebaseConfig';
import { collection, getDocs, getDoc } from 'firebase/firestore';

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = querySnapshot.docs.map(async (doc, index) => ({
    id: doc.id,
    email: doc.data().email,
    likes: doc
      .data()
      .likes?.map(async (item) => (await getDoc(item)).data()?.title),
  }));
  return users;
};
