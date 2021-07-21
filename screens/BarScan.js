import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const  BarScan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [barCode, setBarCode] = useState('');
  // const [product, setProduct] = useState('');
  const [scanned, setScanned] = useState(false);

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
      fetch(`http://192.168.1.96:8080/v1/product/${barCode}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setScanned(false);
          // alert(`Se encontro la información del código ${barCode}`);
          // setProduct(responseJson.model);
          navigation.push('Product', {product: responseJson})
        })
        .catch((error) => {
          console.log(error);
          setScanned(false);
          alert(`Error al buscar el código!`);
        })
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
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.text}>{barCode}</Text>
      <Button title={'Haga click para buscar'} onPress={handleSearchBarCode} />
    </View>
  );
}

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
