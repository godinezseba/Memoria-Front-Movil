import React from 'react';
import { Text, Spinner, Center } from 'native-base';
import { gql, useQuery } from '@apollo/client';

import { ProductInfo } from './ProductInfo';
import { ProductList } from '../../components';
import { saveProduct } from '../../services/historyProducts';

const GET_PRODUCT_BY_BARCODE = gql`
query GetProducts($filters: ProductsFilters){
  products(filters: $filters) {
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
  const { productId, searching } = params || {};
  const isFromId = Boolean(productId);
  if (!isFromId && !searching)
    return (
      <Center flex={1}>
        <Text mt={3}>No deberias estar aquí... </Text>
      </Center>
    );
  const variables = isFromId ? { id: productId } : { filters: searching };
  const { loading, error, data } = useQuery(
    isFromId ? GET_PRODUCT : GET_PRODUCT_BY_BARCODE,
    {
      variables,
      onCompleted: (result) => {
        if (isFromId) {
          const { product: { id } } = result;
          saveProduct(id);
        }
        const { products } = result;
        if (products.length === 1) {
          const { id } = products[0];
          saveProduct(id);
        }
      },
    });

  if (error)
    return (
      <Center flex={1}>
        <Text mt={3}>Error al buscar el producto </Text>
      </Center>
    );

  if (loading)
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Cargando producto" />
      </Center>
    );

  if (isFromId) {
    const { product } = data;

    return (
      <ProductInfo product={product} />
    );
  }
  const { products } = data;
  if (products.length === 1) {
    return (
      <ProductInfo product={products[0]} />
    );
  }
  return (
    <ProductList products={products} />
  );
};
