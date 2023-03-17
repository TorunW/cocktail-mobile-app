import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { COLORS, SIZES, SHADOWS, assets, FONTS, SPACING } from '../constants';
import { Heart, ReadMoreBtn } from './Button';
import {
  SubInfo,
  Title,
  Category,
  Complexity,
  User,
  Likes,
  Tags,
} from './SubInfo';

const ImageCard = ({ data }) => {
  const navigation = useNavigation();

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
        <Image
          source={{ uri: data.strDrinkThumb }}
          resizeMode='cover'
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />

        <Heart top={8} right={8} />
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
          title={data.strDrink}
          subTitle={'user'}
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
          <Tags tags={data.strTags} />
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

export default ImageCard;
