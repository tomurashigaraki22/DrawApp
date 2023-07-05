import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

const homeName = 'Home';
const searchName = 'Search';

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
      <NavigationContainer>
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
  
              }   
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: {
                textAlign: 'center', // Add this line to center-align the header text
            },
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 20, height: 70}
            
          })}
          >
  
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={searchName} component={SearchScreen} />
  
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  export default MainContainer;
