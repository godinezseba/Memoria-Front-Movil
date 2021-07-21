import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import { useLazyQuery, gql } from '@apollo/client';

const GET_PRODUCT = gql`
query GetProduct($id: String!){
  product(id: $id) {
    id
    name
  }
}
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
  }
});

export const  BarScan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [barCode, setBarCode] = useState('');
  const [scanned, setScanned] = useState(false);
  const [getProduct] = useLazyQuery(GET_PRODUCT, {
    onCompleted: ({product}) => {
      setScanned(false);
      navigation.push('Product', { product });
    },
    onError: ({ message }) => {
      setScanned(false);
      alert(`Error al buscar el código!\nDetalle: ${message}\n${Constants.manifest.extra.API_URL}`);
    }
  });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setBarCode(data);
  };

  const handleSearchBarCode = () => {
    if (barCode !== '') {
      setScanned(true);
      getProduct({variables: { id: barCode }});
    } else {
      alert(`Error, no se ingreso un código!`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
  <BarCodeScanner
    onBarCodeScanned={handleBarCodeScanned}
    style={StyleSheet.absoluteFillObject}
  >
    <View style={styles.container}>
      <Text style={styles.text}>{barCode || 'sin resultados...'}</Text>
      <Button title={'Haga click para buscar'} onPress={handleSearchBarCode} />
    </View>
  </BarCodeScanner>
  );
}
