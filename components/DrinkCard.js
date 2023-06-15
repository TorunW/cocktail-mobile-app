import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constants';
import { SavedRecipeBtn, ReadMoreBtn } from './Button';
import { Title, Complexity, SavedRecipe, Tags } from './SubInfo';
import { handlePressSavedRecipe } from '../helpers/handlePressSavedRecipe';
import { useStoreActions, useStoreState } from 'easy-peasy';

const DrinkCard = ({ data }) => {
  const navigation = useNavigation();
  const state = useStoreState((state) => state);
  const currentUser = state.users.currentUser;
  const action = useStoreActions((actions) => actions);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.savedRecipe !== null) {
      getSavedRecipe();
    }
  }, [currentUser]);

  const itemData = {
    drinkId: data.id,
    drinkName: data.title,
    userId: currentUser.id,
    savedRecipeArr: currentUser.savedRecipe,
  };

  const getSavedRecipe = () => {
    const filteredDrinkId = currentUser.savedRecipe.find(
      (item) => item.id === data.id
    );

    filteredDrinkId && filteredDrinkId.id === data.id
      ? setIsSaved(true)
      : setIsSaved(false);
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 10,
        margin: SPACING.s,
        ...SHADOWS.dark,
      }}
    >
      <View style={{ width: '100%', height: 250 }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: data.image }}
            resizeMode='cover'
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        </View>

        <SavedRecipeBtn
          top={8}
          right={8}
          color={isSaved === true ? COLORS.grad1 : COLORS.black}
          handlePress={() => handlePressSavedRecipe(itemData, action)}
        />
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: SPACING.s,
          marginTop: -SIZES.extraLarge,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <SavedRecipe savedRecipe={data.savedRecipeCount} />

        <Complexity complexity={data.complexity} />
      </View>
      <View style={{ width: '100%', padding: SPACING.m }}>
        <Title
          title={data.title}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
        <View
          style={{
            marginTop: SPACING.s,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Tags tags={'tags'} />
          <ReadMoreBtn
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate('DrinkPage', { data })}
          />
        </View>
      </View>
    </View>
  );
};

export default DrinkCard;
