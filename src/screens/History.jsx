import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ProductCard } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export function History() {
  return (
    <ScreenContainer>
      <Text>Historial</Text>
      <ProductCard />
    </ScreenContainer>
  );
};
