import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handlePressLike = async (itemData, action) => {
  const drinkId = itemData.drinkId;
  const userRef = doc(db, 'users', itemData.userId);
  const drinkRef = doc(db, 'cocktails', drinkId);
  const currentUsersLikesArr = itemData.likesArr;

  const filteredDrinkId = currentUsersLikesArr.find(
    (item) => item.id === drinkId
  );

  const addToFirebase = async () => {
    await updateDoc(userRef, {
      likes: arrayUnion(drinkRef),
    });

    const exsistingLikesArr = JSON.parse(
      await AsyncStorage.getItem('@likes_key')
    );
    const updateLikesArr = [
      ...exsistingLikesArr,
      { id: itemData.drinkId, title: itemData.drinkName },
    ];
    await AsyncStorage.setItem('@likes_key', JSON.stringify(updateLikesArr));

    const storageToken = await AsyncStorage.getItem('@token_key');
    const storageEmail = await AsyncStorage.getItem('@email_key');
    const storageId = await AsyncStorage.getItem('@id_key');
    const newLikesArr = await AsyncStorage.getItem('@likes_key');

    action.users.setCurrentUser({
      token: storageToken,
      email: storageEmail,
      id: storageId,
      likes: JSON.parse(newLikesArr),
    });
  };

  const removeFromFirebase = async () => {
    await updateDoc(userRef, {
      likes: arrayRemove(drinkRef),
    });

    const exsistingLikesArr = JSON.parse(
      await AsyncStorage.getItem('@likes_key')
    );
    const updatedLikesArr = exsistingLikesArr.filter(
      (item) => item.id != drinkId
    );
    await AsyncStorage.setItem('@likes_key', JSON.stringify(updatedLikesArr));

    const storageToken = await AsyncStorage.getItem('@token_key');
    const storageEmail = await AsyncStorage.getItem('@email_key');
    const storageId = await AsyncStorage.getItem('@id_key');
    const newLikesArr = await AsyncStorage.getItem('@likes_key');

    action.users.setCurrentUser({
      token: storageToken,
      email: storageEmail,
      id: storageId,
      likes: JSON.parse(newLikesArr),
    });
  };

  if (filteredDrinkId && filteredDrinkId.id === drinkId) {
    removeFromFirebase();
  } else {
    addToFirebase();
  }
};
