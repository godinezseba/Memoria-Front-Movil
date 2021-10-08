import React, { useEffect, useState } from 'react';
import { Text, Center } from 'native-base';
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
    company {
      name
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

  const { products = [] } = data || {};
  if (products)
    return (
      <ProductList products={products} loading={loading} />
    );

  return (
    <Center flex={1}>
      <Text maxW={300}>Aún no buscas productos!</Text>
    </Center>
  );
};
