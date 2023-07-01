import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebaseConfig';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore';
import { updateCurrentUser } from 'firebase/auth';

export const onPressRateDrink = async ({
  rating,
  setRating,
  initalStarCount,
  setInitalStarCount,
  currentUser,
  setCurrentUser,
  itemData,
  setIsRatingLoading,
}) => {
  const drinkId = itemData.drinkId;
  const userId = itemData.userId;
  const userRef = doc(db, 'users', userId);
  const drinkRef = doc(db, 'cocktails', drinkId);
  const ratingRef = doc(db, 'cocktails', drinkId, 'totalPoints', 'ratings');
  const storageEmail = await AsyncStorage.getItem('@email_key');
  const storageId = await AsyncStorage.getItem('@id_key');
  const storageSavedRecipe = JSON.parse(
    await AsyncStorage.getItem('@savedRecipe_key')
  );
  const storageToken = await AsyncStorage.getItem('@token_key');
  const newDrinkObj = { drink: drinkId, rating: rating };
  const isDrinkRated = currentUser.ratedDrinks?.some(
    (item, index) => item.drink === drinkId
  );

  if (isDrinkRated) {
    await updateDoc(userRef, {
      ratedDrinks: arrayRemove({ drink: drinkRef, rating: initalStarCount }),
    });
  }

  await updateDoc(userRef, {
    ratedDrinks: arrayUnion({ drink: drinkRef, rating: rating }),
  });

  let addRating;
  switch (rating) {
    case 5:
      addRating = { 5: increment(1) };
      break;
    case 4:
      addRating = { 4: increment(1) };
      break;
    case 3:
      addRating = { 3: increment(1) };
      break;
    case 2:
      addRating = { 2: increment(1) };
      break;
    case 1:
      addRating = { 1: increment(1) };
      break;
  }

  await updateDoc(ratingRef, addRating);

  const updatedArr = currentUser.ratedDrinks.filter(
    (item) => item.drink !== drinkId
  );
  const newArr =
    updatedArr.length !== 0 ? [...updatedArr, newDrinkObj] : [newDrinkObj];

  await AsyncStorage.setItem('@ratedDrinks_key', JSON.stringify(newArr));

  const storageRatedDrinks = JSON.parse(
    await AsyncStorage.getItem('@ratedDrinks_key')
  );
  setCurrentUser({
    email: storageEmail,
    id: storageId,
    ratedDrinks: storageRatedDrinks,
    savedRecipe: storageSavedRecipe,
    token: storageToken,
  });
  setRating(rating);
  setInitalStarCount(rating);
  setIsRatingLoading(false);
};
