import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';

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
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30,
  },
  text: {
    color: 'red',
  },
  boxSectin: {
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  cameraButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  iconButton: {
    color: "#fff",
    fontSize: 40,
  },
});

export const BarScan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [barCode, setBarCode] = useState('');
  const [cameraType, setCameraType] = useState(Constants.Type.back);
  const [scanned, setScanned] = useState(false);
  const [getProduct] = useLazyQuery(GET_PRODUCT, {
    onCompleted: ({ product }) => {
      setScanned(false);
      navigation.push('Product', { product });
    },
    onError: ({ message }) => {
      setScanned(false);
      alert(`Error al buscar el código!\nDetalle: ${message}`);
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
      getProduct({ variables: { id: barCode } });
    } else {
      alert(`Error, no se ingreso un código!`);
    }
  };

  const handleCameraType = () => {
    setCameraType(Constants.Type.back
      ? Constants.Type.front
      : Constants.Type.back);
  }

  if (hasPermission === null) {
    return <Text> Requesting for camera permission </Text>;
  }
  else if (hasPermission === false) {
    return <Text> No access to camera </Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type={cameraType}
      >
        <View style={styles.container}>
          <View
            style={styles.cameraButton}
          >
            <Ionicons
              name="copy-outline"
              style={{ ...styles.iconButton, opacity: 0 }}
            />
          </View>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleSearchBarCode}
          >
            <FontAwesome
              name="camera"
              style={styles.iconButton}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleCameraType}
          >
            <MaterialCommunityIcons
              name="camera-switch"
              style={styles.iconButton}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.container}>
          <Text style={styles.text}>{barCode || 'sin resultados...'}</Text>
          <Button title={'Haga click para buscar'} onPress={handleSearchBarCode} />
        </View> */}
      </BarCodeScanner>
    </View>
  );
}
