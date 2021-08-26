import React, { useEffect, useState } from 'react';
import { Spinner, Text, Center } from 'native-base';
import { gql, useLazyQuery } from '@apollo/client';

import { ProductList } from '../components';
import { getProducts } from '../services/historyProducts';

const GET_PRODUCTS = gql`
query GetProducts($ids: [ID]){
  products(filters: {ids: $ids}) {
    id
    name
    category
    globalLabels {
      label
    }
    categoryLabels {
      label
    }
  }
}
`;

export function History() {
  const [loading, setLoading] = useState(true);
  const [getProductsQuery, { data }] = useLazyQuery(GET_PRODUCTS, { onCompleted: () => setLoading(false) });

  useEffect(() => {
    getProducts()
      .then((history) => {
        if (history && history.length !== 0) {
          getProductsQuery({ variables: { ids: history } });
        } else {
          setLoading(false);
        }
      });
  }, []);

  if (loading)
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Cargando productos" />
      </Center>
    );

  const { products } = data || {};
  if (products)
    return (
      <ProductList products={products} />
    );

  return (
    <Center flex={1}>
      <Text>Aun no buscas productos!</Text>
    </Center>
  );
};
