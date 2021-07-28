import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloProvider } from '@apollo/client';

import { Home, BarScan, Product } from './screens';
import History from './screens/History';
import { apiGraph } from './services/api';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={{title: 'Inicio'}}/>
      <HomeStack.Screen name="Product" component={Product} options={{title: 'Información'}}/>
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeStackScreen}/>
      <Tab.Screen name="Historial" component={History}/>
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

export default () => (
  <ApolloProvider client={apiGraph}>
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={TabScreen}/>
        <RootStack.Screen name="BarScan" component={BarScan}/>
      </RootStack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);
