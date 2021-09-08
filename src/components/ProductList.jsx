import React from 'react';
import { Box, Column, ScrollView } from 'native-base';

import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../skeletons/ProductCard';
import * as RootNavigation from '../store/navigationContext';

export default function ProductList(props) {
  const { products, loading } = props;
  // products = products.slice(0, 10);

  const handleClickProduct = (product) => {
    RootNavigation.push('Producto', { productId: product.id });
  }

  if (loading) {
    return (
      <Box my={3} mx={0}>
        <Column space={3}>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </Column>
      </Box>
    );
  }

  return (
    <ScrollView>
      <Box my={3} mx={0}>
        <Column space={3}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleClickProduct(product)}
            />
          ))}
        </Column>
      </Box>
    </ScrollView>
  );
}
