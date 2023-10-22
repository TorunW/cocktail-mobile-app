import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, SPACING, FONTS, SIZES } from '../constants';
import StepsForm from '../components/StepsForm';
import DrinkForm from '../components/DrinkForm';
import IngredientsForm from '../components/IngredientsForm';
import ImageUploader from '../components/ImageUploader';
import { Image } from 'react-native';
import { Description, Title } from '../components/SubInfo';
import { BrokenImage } from '../assets/icons/Icon';

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
      <View style={styles.pageContainer}>
        <Text style={styles.bigInfoText}>Almost Done!</Text>
        <Text style={styles.infoText}>
          Review your recipe, when you're done either upload or discard.
        </Text>
        <Text style={styles.typeText}>Title:</Text>
        <Title style={styles.text} title={title} />
        <Text style={styles.typeText}>Description:</Text>
        <Description style={styles.text} description={description} />
        {image !== '' ? (
          <Image source={{ uri: image }} height={50} width={30} />
        ) : (
          <BrokenImage color={COLORS.black} size={SIZES.icon} />
        )}

        <Text style={styles.typeText}>Alcoholic:</Text>
        <Text style={styles.text}>
          {alcoholic === true ? 'Contains alcohol' : 'Alcohol free drink'}
        </Text>
        <Text style={styles.typeText}>Ingredients:</Text>
        {submittedFormIngredients.map((item, index) => (
          <View style={styles.row}>
            <Text style={styles.rowtext}>{item.ingredient}</Text>
            <Text style={styles.rowtext}>{item.measure}</Text>
          </View>
        ))}
        <Text style={styles.typeText}>Instructions:</Text>
        {instructionsToDrink.map((item, index) => (
          <View style={styles.row}>
            <Text style={styles.text}>{`Step ${index + 1}`}:</Text>
            <Text style={styles.text}>{item[`step${index + 1}`]}</Text>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Upload recipe</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={resetAllForms}>
            <Text style={styles.buttonText}>Discard</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.midPink,
        flex: 1,
      }}
    >
      <ScrollView>{formDisplay}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xl,
  },
  bigInfoText: {
    fontFamily: FONTS.bold,
    textAlign: 'center',
    fontSize: SIZES.large,
    marginBottom: SPACING.s,
  },
  infoText: {
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
  },
  typeText: { fontFamily: FONTS.semiBold },
  row: { flexDirection: 'row' },
  text: { marginBottom: SPACING.xs },
  buttonContainer: {
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.s,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.deepPink,
    borderRadius: 10,
    width: 300,
    padding: SPACING.xs,
    elevation: 1,
  },
  buttonText: { fontFamily: FONTS.bold },
});
