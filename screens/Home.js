import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  Button,
  TextInput,
} from 'react-native';
import { COLORS } from '../constants';
import {
  DrinkCard,
  HomeHeader,
  FocusedStatusBar,
  StaticHeader,
} from '../components';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigationState } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('lemonSqueezy.db');

/* const db = SQLite.openDatabase(
  {
    name: 'lemonSqueezy.db',
    location: 'default',
  },
  () => {},
  (error) => {
    console.log(error);
  }
); */

export const Home = ({ navigation }) => {
  const navState = useNavigationState((state) => state);
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const cocktailList = state.cocktails.cocktailList;
  const term = state.cocktails.term;

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);

  // console.log(users);
  // console.log(db);

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)',
        []
      );
    });
  };

  const getData = () => {
    console.log('GET DATA');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users',
        null,
        (txObj, resultSet) => setUsers(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  };

  const addUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (name,email) VALUES (?,?)',
        [userName, userEmail],
        (txObj, resultSet) => {
          console.log('foruth');
          let existingNames = [...users];
          existingNames.push({
            id: resultSet.insertId,
            name: userName,
            email: userEmail,
          });
          setUsers(existingNames);
          setUserName('');
          setUserEmail('');
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  useEffect(() => {
    getCocktailList();
  }, [term]);

  const getCocktailList = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        const list = data.drinks;
        action.cocktails.setCocktailList(list);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePress = () => {
    navigation.toggleDrawer();
    action.menu.openMenu();
  };

  useEffect(() => {
    if (navState.history.find((item, index) => item.status === 'open')) {
      action.menu.openMenu();
    } else {
      action.menu.closeMenu();
    }
  }, [navState]);

  const showUsers = () => {
    return users.map((user, index) => {
      return (
        <View
          key={index}
          style={{
            width: '100%',
            minHeight: 50,
            backgroundColor: COLORS.grad1,
          }}
        >
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>{user.id}</Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <StaticHeader handlePress={handlePress} />
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 150,
            width: '100%',
            padding: 20,
          }}
        >
          <TextInput
            value={userName}
            placeholder='name'
            onChangeText={setUserName}
          />
          <TextInput
            value={userEmail}
            placeholder='email'
            onChangeText={setUserEmail}
          />
          <Button title='Add user' onPress={addUser} />
          {showUsers()}
        </View>

        <View style={{ zIndex: 0 }}>
          <FlatList
            data={cocktailList}
            renderItem={({ item }) => <DrinkCard data={item} />}
            keyExtractor={(item) => item.idDrink}
            ListHeaderComponent={<HomeHeader />}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
          <View />
        </View>
      </View>
    </SafeAreaView>
  );
};
