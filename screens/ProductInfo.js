import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const defaultProduct = { barcode_id: '',  brand: '', category: '', model: '', rating_data: { efficiency: '' }};

export const Product = ({ route }) => {
  const product = route.params.product ? route.params.product : defaultProduct;

  return (
    <View style={styles.container}>
      <Text>Eficiencia: {product.rating_data.efficiency}</Text>
      <Text>Modelo: {product.model}</Text>
      <Text>Marca: {product.brand}</Text>
      <Text>Categoria: {product.category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
