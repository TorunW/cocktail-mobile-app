import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constants';
import { LikeBtn, ReadMoreBtn } from './Button';
import { Title, Complexity, Likes, Tags } from './SubInfo';
import { handlePressLike } from '../helpers/handlePressLike';
import { useStoreActions, useStoreState } from 'easy-peasy';

const DrinkCard = ({ data }) => {
  const navigation = useNavigation();
  const state = useStoreState((state) => state);
  const action = useStoreActions((actions) => actions);

  console.log(state.users.currentUser.likes);
  const itemData = {
    drinkId: data.id,
    drinkName: data.title,
    userId: state.users.currentUser.id,
    likesArr: state.users.currentUser.likes,
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

        <LikeBtn
          top={8}
          right={8}
          //color={color}
          handlePress={() => handlePressLike(itemData, action)}
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
        <Likes />
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
