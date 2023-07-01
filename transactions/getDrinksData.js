import { db } from '../firebaseConfig';
import { collection, getDocs, getDoc } from 'firebase/firestore';

export default getDrinksData = async () => {
  const querySnapshot = await getDocs(collection(db, 'cocktails'));

  const getRatings = async (drinkId) => {
    console.log(drinkId);
    let ratings;
    const ratingDrinksQuery = await getDocs(
      collection(db, `cocktails/${drinkId}/totalPoints`)
    );

    ratingDrinksQuery.forEach((doc) => {
      ratings = {
        one: doc.data().one,
        two: doc.data().two,
        three: doc.data().three,
        four: doc.data().four,
        five: doc.data().five,
      };
    });

    return ratings;
  };
  const drinks = await Promise.all(
    querySnapshot.docs.map(async (doc) => ({
      id: doc.id,
      title: doc.data().title,
      image: doc.data().image,
      instructions: doc.data().instructions,
      alcoholic: doc.data().alcoholic,
      complexity: doc.data().complexity,
      savedRecipeCount: doc.data().savedRecipeCount,
      totalVoters: doc.data().totalVoters,
      totalPoints: await getRatings(doc.id),
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
  return drinks;
};
