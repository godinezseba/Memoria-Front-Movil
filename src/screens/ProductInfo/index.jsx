import React from 'react';
import { Box, Heading, VStack } from 'native-base';
import { gql, useQuery } from '@apollo/client';
import {
  ActivityIndicator,
} from 'react-native';

import { ProductInfo } from './ProductInfo';

const GET_PRODUCT = gql`
query GetProduct($id: ID!){
  product(id: $id) {
    id
    name
    category
    ratingData {
      CO2
      water
      deforestation
    }
    company {
      name
    }
    globalLabels {
      label
      labelCO2
      labelwater
    }
    categoryLabels {
      label
      labelCO2
      labelwater
    }
  }
}
`;

export const Product = ({ route }) => {
  const { params } = route || {};
  const { productId = '109fedfb1cbd216feb88d69476cb3a35', searching } = params || {};
  if (!productId && !searching)
    return (
      <Box safeArea>
        <VStack space={2} alignItems="center" width="100%">
          <Heading mt={3}>No deberias estar aquí... </Heading>
        </VStack>
      </Box>
    );
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id: productId } });

  if (error)
    return (
      <Box safeArea>
        <VStack space={2} alignItems="center" width="100%">
          <Heading mt={3}>Error al buscar el producto </Heading>
        </VStack>
      </Box>
    );

  if (loading)
    return (
      <Box safeArea>
        <ActivityIndicator />
      </Box>
    );

  const { product } = data;

  return (
    <ProductInfo product={product} />
  );
};
