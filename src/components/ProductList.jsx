import React from 'react';
import { Box, Column, ScrollView } from 'native-base';

import * as RootNavigation from '../store/navigationContext';
import ProductCard from './ProductCard';

export default function ProductList(props) {
  let { products } = props;
  products = products.slice(0, 10);

  const handleClickProduct = (product) => {
    RootNavigation.push('Producto', { productId: product.id });
  }

  return (
    <ScrollView>
      <Box m={3}>
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
