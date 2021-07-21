import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, BarScan, Product } from './screens'

const BasicStack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <BasicStack.Navigator>
      <BasicStack.Screen name="Home" component={Home} options={{title: 'Inicio'}}/>
      <BasicStack.Screen name="BarScan" component={BarScan} options={{title: 'Cámara'}}/>
      <BasicStack.Screen name="Product" component={Product} options={{title: 'Información'}}/>
    </BasicStack.Navigator>
  </NavigationContainer>
);
