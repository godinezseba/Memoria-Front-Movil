import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants/labels';

const labelsWith = {
  'a': 50,
  'b': 73,
  'c': 95,
  'd': 113,
  'e': 140,
};

const styleLabel = (character) => StyleSheet.create({
  label: {
    backgroundColor: 'transparent',
  },
  labelText: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  labelSquare: {
    width: labelsWith[character],
    height: 26,
    backgroundColor: colors[character],
  },
  labelTriangle: {
    position: 'absolute',
    left: labelsWith[character],
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderLeftWidth: 26,
    borderLeftColor: colors[character],
    borderBottomWidth: 13,
    borderBottomColor: 'transparent',
  },
});

const styleBlackLabel = StyleSheet.create({
  labelText: {
    fontSize: 30,
  },
  labelSquare: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
  },
  labelTriangle: {
    position: 'absolute',
    left: -30,
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 15,
    borderRightWidth: 30,
    borderRightColor: 'black',
    borderBottomWidth: 15,
    borderBottomColor: 'transparent',
  },
});

const styleText = StyleSheet.compose(styleLabel().labelText, styleBlackLabel.labelText);

export const Label = (props) => {
  const character = props.character || 'a';
  return (
    <View style={styleLabel(character).label}>
      <View style={styleLabel(character).labelSquare}>
        <Text style={styleLabel().labelText}>{character}
        </Text>
      </View>
      <View style={styleLabel(character).labelTriangle} />
    </View>
  );
};

export const BlackLabel = (props) => {
  const character = props.character || 'a';
  return (
    <View style={styleLabel().label}>
      <View style={styleBlackLabel.labelSquare}>
        <Text style={styleText}>{character}
        </Text>
      </View>
      <View style={styleBlackLabel.labelTriangle} />
    </View>
  );
};
