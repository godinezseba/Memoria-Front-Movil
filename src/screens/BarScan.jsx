import React, { useState, useEffect } from 'react';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 30,
  },
  boxSection: {
    width: '100%',
  },
  text: {
    color: 'red',
  },
  buttonsSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cameraButton: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  iconButton: {
    color: '#fff',
    fontSize: 40,
  },
});

const numberToType = (number) => {
  return Object.keys(Constants.BarCodeType).find(key => Constants.BarCodeType[key] === number);
}

export const BarScan = (props) => {
  const { navigation } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [barCode, setBarCode] = useState({});
  const [cameraType, setCameraType] = useState(Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (data) => {
    setBarCode(data);
  };

  const handleSearchBarCode = () => {
    if (!(Object.keys(barCode).length === 0 && barCode.constructor === Object)) {
      const { type, data } = barCode;
      console.log(barCode);
      navigation.push('Producto', { searching: { barCode: data, barCodeType: numberToType(type) } });
    }
  };

  const handleCameraType = () => {
    setCameraType(cameraType === Constants.Type.back
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
    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black' }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type={cameraType}
      >
        <View style={styles.container}>
          <View style={styles.boxSection}>
            <Text style={styles.text}>{barCode.data || 'sin resultados...'}</Text>
          </View>
          <View style={styles.buttonsSection}>
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
        </View>
      </BarCodeScanner>
    </View>
  );
}
