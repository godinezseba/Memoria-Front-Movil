import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Navigation from './src/layout/Navigation';
import { apiGraph } from './src/services/api';

export default () => (
  <ApolloProvider client={apiGraph}>
    <Navigation />
  </ApolloProvider>
);
