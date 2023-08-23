import { db } from '../firebaseConfig';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handlePressSavedRecipe = async (itemData, action) => {
  const drinkId = itemData.drinkId;
  const userRef = doc(db, 'users', itemData.userId);
  const drinkRef = doc(db, 'cocktails', drinkId);

  const currentUsersSavedRecipeArr = itemData.savedRecipeArr;

  const filteredDrinkId =
    currentUsersSavedRecipeArr !== null
      ? currentUsersSavedRecipeArr.find((item) => item.id === drinkId)
      : null;

  const updateAsyncStorage = async () => {
    const storageToken = await AsyncStorage.getItem('@token_key');
    const storageEmail = await AsyncStorage.getItem('@email_key');
    const storageId = await AsyncStorage.getItem('@id_key');
    const newSavedRecipeArr = await AsyncStorage.getItem('@savedRecipe_key');

    action.users.setCurrentUser({
      token: storageToken,
      email: storageEmail,
      id: storageId,
      savedRecipe: JSON.parse(newSavedRecipeArr),
    });
  };

  const addToFirebase = async () => {
    await updateDoc(userRef, {
      savedRecipe: arrayUnion(drinkRef),
    });

    await updateDoc(drinkRef, {
      savedRecipeCount: increment(1),
    });

    const exsistingSavedRecipeArr = JSON.parse(
      await AsyncStorage.getItem('@savedRecipe_key')
    );

    const updateSavedRecipeArr =
      exsistingSavedRecipeArr !== null
        ? [
            ...exsistingSavedRecipeArr,
            { id: itemData.drinkId, title: itemData.drinkName },
          ]
        : [{ id: itemData.drinkId, title: itemData.drinkName }];

    await AsyncStorage.setItem(
      '@savedRecipe_key',
      JSON.stringify(updateSavedRecipeArr)
    );

    updateAsyncStorage();
  };

  const removeFromFirebase = async () => {
    await updateDoc(userRef, {
      savedRecipe: arrayRemove(drinkRef),
    });

    await updateDoc(drinkRef, {
      savedRecipeCount: increment(-1),
    });

    const exsistingSavedRecipeArr = JSON.parse(
      await AsyncStorage.getItem('@savedRecipe_key')
    );
    const updatedSavedRecipeArr = exsistingSavedRecipeArr.filter(
      (item) => item.id != drinkId
    );
    await AsyncStorage.setItem(
      '@savedRecipe_key',
      JSON.stringify(updatedSavedRecipeArr)
    );

    updateAsyncStorage();
  };

  if (filteredDrinkId && filteredDrinkId.id === drinkId) {
    removeFromFirebase();
  } else {
    addToFirebase();
  }
};
