import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import PopularScreen from './screens/PopularScreen';
import EpisodeScreen from './screens/EpList';
import VideoScreen from './screens/VideoScreen';

const homeName = 'Home';
const searchName = 'Search';
const popName = 'Popular';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === searchName) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (rn === popName) {
            iconName = focused ? 'tv' : 'tv-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          textAlign: 'center',
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 20, height: 70 }
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={searchName} component={SearchScreen} />
      <Tab.Screen name={popName} component={PopularScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainContainer} options={{ headerShown: false }} />
        <Stack.Screen name='Details' component={DetailsScreen} />
        <Stack.Screen name='EpisodeList' component={EpisodeScreen} />
        <Stack.Screen name='VideoScreen' component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
