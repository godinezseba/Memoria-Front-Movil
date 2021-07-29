import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeHeader } from '../components/HomeHeader';
import { Home, BarScan, Product, History } from '../screens';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={props => ({
        headerTitle: () => <HomeHeader {...props} />,
      })}
    >
      <HomeStack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabScreen() {
  return (
    <Tab.Navigator initialRouteName="Inicio">
      <Tab.Screen
        name="Inicio"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barcode-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Historial"
        component={History}
        options={{
          tabBarLabel: 'Historial',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator >
  );
}

const RootStack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none" initialRouteName="Main">
        <RootStack.Screen name="Main" component={TabScreen} />
        <RootStack.Screen name="Product" component={Product} />
        <RootStack.Screen name="BarScan" component={BarScan} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
