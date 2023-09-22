import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  Pressable,
} from 'react-native';
import Dropdown from 'react-native-input-select';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';

const DrinkForm = ({ setIsDrinkFormSubmitted }) => {
  const setTitle = useStoreActions((actions) => actions.drinks.setTitle);
  const setDescription = useStoreActions(
    (actions) => actions.drinks.setDescription
  );
  const setAlcoholic = useStoreActions(
    (actions) => actions.drinks.setAlcoholic
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      alcoholic: undefined,
      description: '',
    },
  });

  const submitForm = (data) => {
    setAlcoholic(data.alcoholic === 'true' ? true : false);
    setTitle(data.title);
    setDescription(data.description);
    setIsDrinkFormSubmitted(true);
  };
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Create recipe</Text>
      <Text style={styles.infoText}>
        Start with naming the drink/cocktail, give it a short description and
        choose wherever it is containing alcohol or not.
      </Text>
      <Text style={styles.infoText}>
        When you're done click next to go to the next part of the upload, you'll
        be required to add a list of ingredients and measurments, instructions
        and a image.
      </Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder='Title'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='title'
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textArea}
              placeholder='Description'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              numberOfLines={5}
              cursorColor={'black'}
            />
          )}
          name='description'
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              dropdownStyle={styles.dropdown}
              placeholder='Does it contain alcohol?'
              options={[
                { name: 'Alcoholic', value: 'true' },
                { name: 'Non Alcoholic', value: 'false' },
              ]}
              optionLabel={'name'}
              optionValue={'value'}
              selectedValue={value}
              onValueChange={onChange}
              primaryColor={COLORS.black}
            />
          )}
          name='alcoholic'
        />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit(submitForm)}>
        <Text style={styles.font}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    backgroundColor: COLORS.midPink,
    gap: SPACING.xs,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  infoText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font,
    marginBottom: SPACING.xs,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING.s,
    gap: SPACING.xs,
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    padding: SPACING.xs,
    backgroundColor: COLORS.pinkTransparent,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    fontFamily: FONTS.regular,
  },
  dropdown: {
    width: '100%',
    borderRadius: 5,
    padding: SPACING.xs,
    backgroundColor: COLORS.pinkTransparent,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    fontFamily: FONTS.regular,
  },
  textArea: {
    width: '100%',
    borderRadius: 5,
    padding: SPACING.xs,
    backgroundColor: COLORS.pinkTransparent,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    fontFamily: FONTS.regular,
    textAlignVertical: 'top',
  },

  button: {
    minWidth: '50%',
    borderRadius: 5,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    backgroundColor: COLORS.deepPink,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    marginVertical: SPACING.xs,
  },
  font: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },
});

export default DrinkForm;
