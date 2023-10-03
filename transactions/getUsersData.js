import { db } from '../firebaseConfig';
import { collection, getDocs, getDoc } from 'firebase/firestore';

const getUserSavedRecipe = async (savedRecipeRef) => {
  const savedRecipeDoc = await getDoc(savedRecipeRef);
  const id = savedRecipeDoc.id;
  const savedRecipeDocData = savedRecipeDoc.data();
  const title = savedRecipeDocData?.title;
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
      username: doc.data().username,
      email: doc.data().email,
      ratedDrinks: await Promise.all(
        doc.data().ratedDrinks
          ? doc.data().ratedDrinks.map(async (item) => {
              return {
                drink: (await getDoc(item.drink)).id,
                rating: item.rating,
              };
            })
          : []
      ),
      savedRecipe: doc.data().savedRecipe
        ? await Promise.all(
            doc
              .data()
              .savedRecipe.map(async (item) => await getUserSavedRecipe(item))
          )
        : [],
    }))
  );
  return users;
};
