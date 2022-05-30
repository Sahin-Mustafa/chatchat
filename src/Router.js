import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import OnBoardingScreen from './pages/OnBoardingScreen';
import Login from './pages/auth/Login';
import Sign from './pages/auth//Sign';
import Room from './pages/Room';
import RoomMessages from './pages/RoomMessages';

const stack = createNativeStackNavigator();

const Router = () => {
  const [userSession, setUserSession] = React.useState([]);
  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);
  const AuthStack = () => {
    return (
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen name="BoardingPages" component={OnBoardingScreen} />
        <stack.Screen name="LoginPage" component={Login} />
        <stack.Screen name="SignPage" component={Sign} />
      </stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {!userSession ? (
        AuthStack()
      ) : (
        <stack.Navigator screenOptions={{headerShown: false}}>
          <stack.Screen
            name="RoomPage"
            component={Room}
            options={{
              headerShown: true,
              title: 'Rooms',
              headerBackVisible: false,
              headerTitleAlign: 'center',
              headerTitleStyle: {color: 'white'},
              headerStyle: {backgroundColor: '#48416C'},
              headerRight: () => (
                <Icon
                  name="logout"
                  color="white"
                  size={27}
                  onPress={() => auth().signOut()}
                />
              ),
            }}
          />
          <stack.Screen name="MessagePage" component={RoomMessages} />
        </stack.Navigator>
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
