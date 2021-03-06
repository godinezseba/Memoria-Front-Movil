import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner, Text, Center } from 'native-base';

import { ProductList } from '../../components';

const GET_PRODUCTS = gql`
query {
  products( sort: { field: "globalLabels.label", order: 1 }) {
    id
    name
    category
    globalLabels {
      label
    }
    company {
      name
    }
  }
}
`;

export function EfficientView() {
  const { loading, data, error } = useQuery(GET_PRODUCTS);

  if (error)
    return (
      <Center flex={1}>
        <Text>Ocurrio algo inesperado...</Text>
      </Center>
    )

  const { products = [] } = data || {};
  return (
    <ProductList products={products.slice(0, 20)} loading={loading} />
  );
}
