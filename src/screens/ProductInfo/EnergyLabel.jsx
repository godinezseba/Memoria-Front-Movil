import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Row, Column, Center, Box } from 'native-base';

import { labels } from '../../constants/colors';

const stylesBase = StyleSheet.create({
  baseTop: {
    borderBottomWidth: 35,
    borderBottomColor: "red",
    borderLeftWidth: 50,
    borderLeftColor: "transparent",
    borderRightWidth: 50,
    borderRightColor: "transparent",
    height: 0,
    width: 0,
    left: 0,
    top: -35,
    position: "absolute",
  },
  baseBottom: {
    backgroundColor: "#fff",
    height: 55,
    width: 100,
    "borderTop": "15px solid red",
    "borderRight": "15px solid red",
    "borderBottom": "15px solid red",
  },
});

const Base = () => {
  return (
    <View style={stylesBase.base}>
      {/* <View style={{ transform: [{ rotate: "90deg" }], }}>
        <View style={stylesBase.baseTop} />
      </View> */}
      <View style={stylesBase.baseBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  classA: {
    position: 'relative',
    display: 'flex',
    height: 16,
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 3,
    lineHeight: 16,
    color: '#fff',
    width: 30,
    backgroundColor: labels['a'],
    borderColor: labels['a'],
  },
  label: {
    width: 200,
    "width": 0,
    "borderTop": "15px solid transparent",
    "borderRight": "15px solid #000",
    "borderBottom": "15px solid transparent",
    borderStyle: "solid",
    color: 'white',
  },
  rectangle: {
    width: 100 * 2,
    height: 100,
    backgroundColor: "red",
  },
  trapezoid: {
    width: 200,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: "red",
    borderRightWidth: 50,
    borderRightColor: "transparent",
    borderStyle: "solid",
  },
});

export const EnergyLabel = (props) => {
  const { label } = props;
  return (
    <Box my={5}>
      <Column alignItems="center" space={3}>
        <Box w="100%">
          <Row space={5} justifyContent="space-around">
            {/* <View style={styles.classA}><Text style={{ color: 'white' }}>A</Text></View> */}
            <Base />
            <Center
              bg="secondary.400"
              size={8}
              rounded="md"
              _text={{
                color: "white",
              }}
              shadow={3}
            >
              Box 2
            </Center>
          </Row>
        </Box>

        {/* <View style={styles.label}><Text style={{ color: 'white' }}>A</Text></View>
        <Base /> */}
        {/* <span style={styles.classA}><Text>A</Text></span>
      <span style={styles.classA}><Text>A</Text></span>
      <span style={styles.classA}><Text>A</Text></span>
      <span style={styles.classA}><Text>A</Text></span>
      <span style={styles.classA}><Text>A</Text></span> */}
      </Column>
    </Box>
  )
}
