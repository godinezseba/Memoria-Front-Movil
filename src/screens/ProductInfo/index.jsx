import React from 'react';
import { Heading, Spinner, Center } from 'native-base';
import { gql, useQuery } from '@apollo/client';

import { ProductInfo } from './ProductInfo';
import { saveProduct } from '../../services/historyProducts';

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
      rating {
        CO2
        water
        deforestation
      }
      labels {
        label
        labelCO2
        labelwater
      }
      certificates{
        name
        companyId
        companyType
        fileId
      }
      actions{
        name
        fileId
        description
        companyId
        companyType
      }
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
      <Center flex={1}>
        <Heading mt={3}>No deberias estar aquí... </Heading>
      </Center>
    );
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
    onCompleted: ({ product: { id } }) => saveProduct(id),
  });

  if (error)
    return (
      <Center flex={1}>
        <Heading mt={3}>Error al buscar el producto </Heading>
      </Center>
    );

  if (loading)
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Cargando producto" />
      </Center>
    );

  const { product } = data;

  return (
    <ProductInfo product={product} />
  );
};
