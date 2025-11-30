import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LevelSelectionScreen from '../screens/LevelSelectionScreen';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0066FF',
        tabBarInactiveTintColor: '#777',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color }) => {
          let iconName = '';

          if (route.name === 'HomeTab') iconName = 'home-outline';
          else if (route.name === 'ProfileTab') iconName = 'person-circle-outline';
          else if (route.name === 'HistoryTab') iconName = 'time-outline';
          else if (route.name === 'SettingsTab') iconName = 'settings-outline';

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} options={{ title: 'Historial' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Config' }} />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  });

  return unsubscribe;
}, [initializing]);


  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
