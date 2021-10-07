import React, { useState, useEffect } from 'react';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';

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
    <BarCodeScanner
      onBarCodeScanned={handleBarCodeScanned}
      style={[StyleSheet.absoluteFill, styles.container]}
      type={cameraType}
    >
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused}>
          <Text style={styles.text}>{barCode.data || 'sin resultados...'}</Text>
        </View>
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom}>
        <View style={styles.layerBottomUp} />
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
  );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  text: {
    color: 'red',
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
  layerBottomUp: {
    flex: 2,
  },
  buttonsSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
