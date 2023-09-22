import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigation } from '@react-navigation/native';
import { FocusedStatusBar } from '../components';
import { Pressable, SafeAreaView } from 'react-native';
import { COLORS, SPACING, FONTS, SIZES } from '../constants';
import StepsForm from '../components/StepsForm';
import DrinkForm from '../components/DrinkForm';
import IngredientsForm from '../components/IngredientsForm';
import ImageUploader from '../components/ImageUploader';

export const AddNewDrink = () => {
  const navigation = useNavigation();

  const state = useStoreState((state) => state);
  const title = useStoreState((state) => state.drinks.title);
  const alcoholic = useStoreState((state) => state.drinks.alcoholic);
  const submittedFormIngredients = state.drinks.ingredientsToDrink;
  const instructionsToDrink = state.drinks.instructionsToDrink;
  const image = state.drinks.image;
  const existingIngredients = state.drinks.ingredients;

  const action = useStoreActions((actions) => actions);
  const setTitle = action.drinks.setTitle;
  const setAlcoholic = action.drinks.setAlcoholic;
  const setIngredientsToDrink = action.drinks.setIngredientsToDrink;
  const setInstructionsToDrink = action.drinks.setInstructionsToDrink;
  const setImage = action.drinks.setImage;

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
    const ingredientArr = existingIngredients.filter((existingIngredient) =>
      submittedFormIngredients.some(
        (submittedFormIngredient) =>
          existingIngredient.name.toLowerCase() ===
          submittedFormIngredient.ingredient.toLowerCase()
      )
    );

    const referenceArr = ingredientArr.map((item, index) => {
      let measure = submittedFormIngredients.map((m) => m.measure);
      const ingredientRef = doc(db, 'ingredients', item.id);
      return {
        ingredient: ingredientRef,
        measure: measure === '' ? '' : measure[index],
      };
    });
    setIngredientRefsWithMeasures(referenceArr);
  };

  const addDrink = async () => {
    const docRef = await addDoc(collection(db, 'cocktails'), {
      title: title,
      instructions: instructionsToDrink,
      alcoholic: alcoholic,
      image: image,
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
    isInstructionsSubmitted === true &&
    isIngredientsSubmitted === false &&
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
