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

const style = StyleSheet.create({
  label: {
    backgroundColor: 'transparent',
  },
  labelText: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
  labelSquare: {
    justifyContent: 'center',
  },
  labelTriangle: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
})

const styleLabel = (character) => StyleSheet.create({
  labelText: {
    fontSize: 26,
  },
  labelSquare: {
    width: labelsWith[character],
    height: 26,
    backgroundColor: colors[character],
    paddingLeft: 5,
  },
  labelTriangle: {
    left: labelsWith[character],
    borderTopWidth: 13,
    borderLeftWidth: 13,
    borderLeftColor: colors[character],
    borderBottomWidth: 13,
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
    alignItems: 'center',
  },
  labelTriangle: {
    left: -15,
    borderTopWidth: 15,
    borderRightWidth: 15,
    borderRightColor: 'black',
    borderBottomWidth: 15,
  },
});

export const Label = (props) => {
  const character = props.character || 'a';
  const styleSquare = StyleSheet.compose(style.labelSquare, styleLabel(character).labelSquare);
  const styleText = StyleSheet.compose(style.labelText, styleLabel().labelText);
  const styleTriangle = StyleSheet.compose(style.labelTriangle, styleLabel(character).labelTriangle);

  return (
    <View style={style.label}>
      <View style={styleSquare}>
        <Text style={styleText}>
          {character}
        </Text>
      </View>
      <View style={styleTriangle} />
    </View>
  );
};

export const BlackLabel = (props) => {
  const character = props.character || 'a';
  const styleSquare = StyleSheet.compose(style.labelSquare, styleBlackLabel.labelSquare);
  const styleText = StyleSheet.compose(style.labelText, styleBlackLabel.labelText);
  const styleTriangle = StyleSheet.compose(style.labelTriangle, styleBlackLabel.labelTriangle);

  return (
    <View style={style.label}>
      <View style={styleSquare}>
        <Text style={styleText}>{character}
        </Text>
      </View>
      <View style={styleTriangle} />
    </View>
  );
};
