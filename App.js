import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';

import { Home, BarScan, Product } from './screens';
import { apiGraph } from './services/api';


const BasicStack = createStackNavigator();

export default () => (
  <ApolloProvider client={apiGraph}>
    <NavigationContainer>
      <BasicStack.Navigator>
        <BasicStack.Screen name="Home" component={Home} options={{title: 'Inicio'}}/>
        <BasicStack.Screen name="BarScan" component={BarScan} options={{title: 'Cámara'}}/>
        <BasicStack.Screen name="Product" component={Product} options={{title: 'Información'}}/>
      </BasicStack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);
