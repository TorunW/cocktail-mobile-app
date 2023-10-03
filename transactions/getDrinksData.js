import { db } from '../firebaseConfig';
import { collection, getDocs, getDoc } from 'firebase/firestore';

export default getDrinksData = async () => {
  const querySnapshot = await getDocs(collection(db, 'cocktails'));

  const getRatings = async (drinkId) => {
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

  const getAverageRating = async (drinkId) => {
    let totalPoints = await getRatings(drinkId);
    const calcTotalVotes =
      totalPoints !== undefined
        ? totalPoints.one +
          totalPoints.two +
          totalPoints.three +
          totalPoints.four +
          totalPoints.five
        : 0;

    let calcAverage;
    if (totalPoints !== undefined) {
      const calcTotal =
        totalPoints.one * 1 +
        totalPoints.two * 2 +
        totalPoints.three * 3 +
        totalPoints.four * 4 +
        totalPoints.five * 5;
      calcAverage = calcTotal / calcTotalVotes;
    }

    calcAverage !== undefined ? calcAverage : (calcAverage = 0);
    return calcAverage;
  };

  const drinks = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const creator = (await getDoc(await doc.data().creator)).data().username;
      return {
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        image: doc.data().image,
        instructions: doc.data().instructions,
        alcoholic: doc.data().alcoholic,
        savedRecipeCount: doc.data().savedRecipeCount,
        totalPoints: await getRatings(doc.id),
        averageRating: await getAverageRating(doc.id),
        creator,
        ingredients: await Promise.all(
          doc.data().ingredients.map(async (item) => {
            return {
              id: item.ingredient._key.path.segments[6],
              ingredient: (await getDoc(item.ingredient)).data().name,
              measure: item.measure,
            };
          })
        ),
      };
    })
  );
  return drinks;
};
