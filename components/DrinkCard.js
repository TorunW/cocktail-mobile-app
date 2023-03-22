import { View, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constants';
import { LikeBtn, ReadMoreBtn } from './Button';
import { Title, Complexity, User, Likes, Tags } from './SubInfo';

const DrinkCard = ({ data }) => {
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
        <ImageBackground
          source={{ uri: data.strDrinkThumb }}
          resizeMode='cover'
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
          blurRadius={10}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: data.strDrinkThumb }}
              resizeMode='cover'
              style={{
                width: '75%',
                height: '75%',
                borderRadius: 10,
              }}
            />
          </View>
        </ImageBackground>

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

export default DrinkCard;
