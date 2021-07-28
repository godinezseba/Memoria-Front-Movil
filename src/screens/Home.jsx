import React, { useState } from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
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

export const Home = ({ navigation }) => {
  const [searchName, setSearchName] = useState('');

  return (
    <ScreenContainer>
      <TextInput
        value={searchName}
        onChangeText={setSearchName}
        style={styles.input}
      />
      <Button title="Buscar" onPress={() => navigation.push("BarScan")} />
    </ScreenContainer>
  );
}
