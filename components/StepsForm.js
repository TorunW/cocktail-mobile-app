import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { COLORS, FONTS, SIZES } from '../constants';
import { useStoreActions } from 'easy-peasy';

const StepsForm = (setIsInstructionsSubmitted) => {
  const setInstructionsToDrink = useStoreActions(
    (actions) => actions.drinks.setInstructionsToDrink
  );

  const { register, control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructions',
  });

  const onSubmit = async (data) => {
    let newInstructionsArr = [];
    data.instructions.forEach((element, index) => {
      const key = `step${index + 1}`;
      const value = element.step;
      const newStepObj = {
        [key]: value,
      };

      newArr.push(newStepObj);
    });

    setInstructionsToDrink(newInstructionsArr);
    setIsInstructionsSubmitted(true);
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: COLORS.secondary,
        paddingVertical: 10,
        gap: 5,
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large }}>
        Add instructions
      </Text>
      <View>
        {fields.map((item, index) => {
          return (
            <View
              key={item.id}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      elevation: 1,
                      width: '70%',
                      borderRadius: 3,
                      paddingLeft: 4,
                      backgroundColor: COLORS.grad3,
                    }}
                    placeholder='Instructions'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    {...register(`instructions.${index}.step`, {
                      required: true,
                    })}
                  />
                )}
                name={`instructions.${index}.step`}
                control={control}
              />
              <Button
                style={{
                  width: '10%',
                }}
                color='red'
                title='-'
                onPress={() => remove(index)}
              />
            </View>
          );
        })}
      </View>
      <View style={{ gap: 5 }}>
        <Button
          title='+ Add another step'
          onPress={() => {
            append({ step: '' });
          }}
        />

        <Button
          title='Reset'
          onPress={() =>
            reset({
              test: [{ step: '' }],
            })
          }
        />
      </View>

      <Button
        title={isLoading === true ? 'is submitting' : 'submit'}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default StepsForm;
