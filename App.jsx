import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NativeBaseProvider } from 'native-base';

import Navigation from './src/layout/Navigation';
import { apiGraph } from './src/services/api';

export default () => (
  <NativeBaseProvider>
    <ApolloProvider client={apiGraph}>
      <Navigation />
    </ApolloProvider>
  </NativeBaseProvider>
);
