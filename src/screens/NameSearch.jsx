import React from 'react';
import { Heading, Spinner, Center } from 'native-base';
import { gql, useQuery } from '@apollo/client';
import { ProductList } from '../components';

const GET_BY_NAME = gql`
query GetByName($filters: ProductsFilters!){
  products(filters: $filters) {
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

export const NameSearch = ({ route }) => {
  const { params } = route || {};
  const { searchName } = params || {};
  const { loading, error, data } = useQuery(GET_BY_NAME, { variables: { filters: { searchName } } });

  const { products = [] } = data || {};
  if (products)
    return (
      <ProductList products={products} loading={loading} />
    );
};
