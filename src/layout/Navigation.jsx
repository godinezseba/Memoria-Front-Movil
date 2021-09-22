import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { HomeHeader } from '../components/HomeHeader';
import { Home, BarScan, Product, History, File, NameSearch } from '../screens';
import { navigationRef } from '../store/navigationContext';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={props => ({
        headerTitle: () => <HomeHeader {...props} />,
      })}
    >
      <HomeStack.Screen name="HomeView" component={Home} options={{ title: 'Inicio' }} />
      <HomeStack.Screen name="Producto" component={Product} />
      <HomeStack.Screen name="Archivo" component={File} />
      <HomeStack.Screen name="Busqueda" component={NameSearch} />
      <HomeStack.Screen name="BarScan" component={BarScan} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const HistoryStack = createStackNavigator();
function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator
      initialRouteName="Historial"
    >
      <HistoryStack.Screen name="Producto" component={Product} />
      <HistoryStack.Screen name="Archivo" component={File} />
      <HistoryStack.Screen name="Historial" component={History} />
    </HistoryStack.Navigator>
  );
}

// Add other screen that dont show the tabs
const getTabBarVisibility = (route) => !(getFocusedRouteNameFromRoute(route) === 'BarScan');

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator initialRouteName="Inicio">
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={({ route }) => ({
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barcode-outline" size={size} color={color} />
            ),
            tabBarVisible: getTabBarVisibility(route),
          })}
        />
        <Tab.Screen
          name="HistoryTab"
          component={HistoryStackScreen}
          options={{
            tabBarLabel: 'Historial',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator >
    </NavigationContainer>
  );
}
