import { db } from '../firebaseConfig';
import { collection, getDocs, getDoc } from 'firebase/firestore';

const getUserLikes = async (likeRef) => {
  const likeDoc = await getDoc(likeRef);
  const id = likeDoc.id;
  const likeDocData = likeDoc.data();
  const title = likeDocData.title;
  return {
    id,
    title,
  };
};

export const getUsersData = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = await Promise.all(
    querySnapshot.docs.map(async (doc, index) => ({
      id: doc.id,
      email: doc.data().email,
      likes: doc.data().likes
        ? await Promise.all(
            doc.data().likes.map(async (like) => await getUserLikes(like))
          )
        : [],
    }))
  );

  return users;
};
