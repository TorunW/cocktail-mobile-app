import { View, Image, ImageBackground, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constants';
import { LikeBtn, ReadMoreBtn } from './Button';
import { Title, Complexity, User, Likes, Tags } from './SubInfo';
import { useStoreState, useStoreActions } from 'easy-peasy';

const DrinkCard = ({ data }) => {
  const navigation = useNavigation();

  console.log(data);

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
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/*  <Image
            source={{ uri: data.strDrinkThumb }}
            resizeMode='cover'
            style={{
              width: '75%',
              height: '75%',
              borderRadius: 10,
            }}
          /> */}
        </View>

        <LikeBtn top={8} right={8} />
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
        <User />
        <Complexity complexity={data.complexity} />
      </View>
      <View style={{ width: '100%', padding: SPACING.m }}>
        <Title
          title={data.title}
          subTitle={data.creator}
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
