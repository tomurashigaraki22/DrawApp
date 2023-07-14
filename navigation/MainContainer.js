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
import DiscoverMovie from './screens/DiscoverMovie';
import LinkGen from './screens/linkGen';

const homeName = 'Animiwa';
const searchName = 'Search';
const popName = 'Popular';
const disName = 'Discover Movies';

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
          } else if (rn === disName) {
            iconName = focused ? 'compass' : 'compass-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: 'black',
          height: 60,
        },
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#B3B3B3',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      })}
    >
      {/* Tab.Screen definitions */}
      <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={searchName} component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name={popName} component={PopularScreen} options={{ headerShown: false }} />
      <Tab.Screen name={disName} component={DiscoverMovie} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainContainer} options={{ headerShown: false }} />
        <Stack.Screen name='Details' component={DetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name='EpisodeList' component={EpisodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='VideoScreen' component={VideoScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LinkGen' component={LinkGen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
