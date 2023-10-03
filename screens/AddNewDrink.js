import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigation } from '@react-navigation/native';
import { FocusedStatusBar } from '../components';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, SIZES } from '../constants';
import StepsForm from '../components/StepsForm';
import DrinkForm from '../components/DrinkForm';
import IngredientsForm from '../components/IngredientsForm';
import ImageUploader from '../components/ImageUploader';

export const AddNewDrink = () => {
  const navigation = useNavigation();

  const state = useStoreState((state) => state);
  const { drinks } = state;
  const {
    title,
    description,
    alcoholic,
    ingredientsToDrink: submittedFormIngredients,
    instructionsToDrink,
    image,
    ingredients: existingIngredients,
  } = drinks;

  const action = useStoreActions((actions) => actions);
  const { drinks: drinksAction } = action;
  const {
    setTitle,
    setDescription,
    setAlcoholic,
    setIngredientsToDrink,
    setInstructionsToDrink,
    setImage,
  } = drinksAction;

  const [ingredientRefsWithMeasures, setIngredientRefsWithMeasures] = useState(
    []
  );
  const [isDrinkFormSubmitted, setIsDrinkFormSubmitted] = useState(false);
  const [isIngredientsSubmitted, setIsIngredientsSubmitted] = useState(false);
  const [isInstructionsSubmitted, setIsInstructionsSubmitted] = useState(false);
  const [isImageSubmitted, setIsImageSubmitted] = useState(false);
  const [isDrinkSubmitted, setIsDrinkSubmitted] = useState(false);

  useEffect(() => {
    getIngredientId();
  }, [isIngredientsSubmitted]);

  useEffect(() => {
    if (isDrinkSubmitted === true) {
      navigation.replace('Root');
    }
  }, [isDrinkSubmitted]);

  const getIngredientId = () => {
    if (
      existingIngredients &&
      existingIngredients.length &&
      submittedFormIngredients &&
      submittedFormIngredients.length
    ) {
      const ingredientArr = existingIngredients.filter(
        (existingIngredient) =>
          existingIngredient.name &&
          submittedFormIngredients.some(
            (submittedFormIngredient) =>
              submittedFormIngredient.ingredient &&
              existingIngredient.name.toLowerCase() ===
                submittedFormIngredient.ingredient.toLowerCase().trimEnd()
          )
      );

      const referenceArr = ingredientArr.map((item, index) => {
        const measures = submittedFormIngredients.map((m) => m.measure);
        const ingredientRef = doc(db, 'ingredients', item.id);
        return {
          ingredient: ingredientRef,
          measure: measures[index] ?? '',
        };
      });
      setIngredientRefsWithMeasures(referenceArr);
    }
  };

  const addDrink = async () => {
    const userRef = doc(db, 'users', state.users.currentUser.id);
    const docRef = await addDoc(collection(db, 'cocktails'), {
      title,
      description,
      creator: userRef,
      instructions: instructionsToDrink,
      alcoholic,
      image,
      ingredients: ingredientRefsWithMeasures,
    });
    console.log('Document written with ID: ', docRef.id);
    setIsDrinkSubmitted(true);
  };

  const resetAllForms = () => {
    setIsDrinkFormSubmitted(false);
    setIsIngredientsSubmitted(false);
    setIsInstructionsSubmitted(false);
    setIsImageSubmitted(false);
    setIngredientRefsWithMeasures([]);

    setTitle('');
    setAlcoholic();
    setIngredientsToDrink([]);
    setInstructionsToDrink([]);
    setImage('');
    setDescription('');
  };

  let formDisplay;
  if (
    isDrinkFormSubmitted === false &&
    isInstructionsSubmitted === false &&
    isIngredientsSubmitted === false &&
    isImageSubmitted === false
  ) {
    formDisplay = (
      <DrinkForm setIsDrinkFormSubmitted={setIsDrinkFormSubmitted} />
    );
  } else if (
    isDrinkFormSubmitted === true &&
    isInstructionsSubmitted === false &&
    isIngredientsSubmitted === false &&
    isImageSubmitted === false
  ) {
    formDisplay = (
      <IngredientsForm setIsIngredientsSubmitted={setIsIngredientsSubmitted} />
    );
  } else if (
    isDrinkFormSubmitted === true &&
    isIngredientsSubmitted === true &&
    isInstructionsSubmitted === false &&
    isImageSubmitted === false
  ) {
    formDisplay = (
      <StepsForm setIsInstructionsSubmitted={setIsInstructionsSubmitted} />
    );
  } else if (
    isDrinkFormSubmitted === true &&
    isInstructionsSubmitted === true &&
    isIngredientsSubmitted === true &&
    isImageSubmitted === false
  ) {
    formDisplay = <ImageUploader setIsImageSubmitted={setIsImageSubmitted} />;
  } else if (
    isDrinkFormSubmitted === true &&
    isInstructionsSubmitted === true &&
    isIngredientsSubmitted === true &&
    isImageSubmitted === true
  ) {
    formDisplay = (
      <View>
        <Text>You're done</Text>
        <Pressable onPress={addDrink}>
          <Text>click here to upload the recipe</Text>
        </Pressable>
        <Text onPress={resetAllForms}>Or discard</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.midPink,
      }}
    >
      <FocusedStatusBar background={COLORS.primary} />
      {formDisplay}
    </SafeAreaView>
  );
};
