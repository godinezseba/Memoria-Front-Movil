import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, BarScan, Product, History } from '../screens';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeStackScreen} />
      <Tab.Screen name="Historial" component={History} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={TabScreen} />
        <RootStack.Screen name="Product" component={Product} />
        <RootStack.Screen name="BarScan" component={BarScan} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
