import React from 'react';

import * as RootNavigation from '../store/navigationContext';

export default function ProductList(props) {
  const { products } = props;

  const handleClickProduct = (product) => {
    RootNavigation.push('Producto', { productId: product.id });
  }

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
}
