import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, Center } from 'native-base';
import { gql, useLazyQuery } from '@apollo/client';

import { ProductCard } from '../components';
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

export function History(props) {
  const { navigation } = props;
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

  const handleClickProduct = (product) => {
    console.log(product)
    navigation.push('Producto', { productId: product.id })
  }

  if (loading)
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Cargando productos" />
      </Center>
    );

  const { products } = data || {};
  if (products)
    return (
      <Box m={3}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => handleClickProduct(product)}
          />
        ))}
      </Box>
    );

  return (
    <Center flex={1}>
      <Text>Aun no buscas productos!</Text>
    </Center>
  );
};
