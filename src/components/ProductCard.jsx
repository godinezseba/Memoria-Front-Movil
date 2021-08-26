import React from 'react';
import { Row, Pressable, Center, Text, Column } from 'native-base';

import { colors, floatToChar } from '../constants/labels';

export default function ProductCard(props) {
  const { product, onPress } = props;
  const { globalLabels: { label } } = product;
  const labelChar = floatToChar(label);
  return (
    <Pressable
      border={1}
      borderRadius="md"
      p={1}
      onPress={onPress}
    >
      <Row space={2}>
        <Center height={20} width={20} bgColor={colors[labelChar]}>
          <Text
            fontSize="6xl"
            color="white"
            textTransform="uppercase"
          >
            {labelChar}
          </Text>
        </Center>
        <Column>
          <Text>
            {product.name}
          </Text>
          <Text fontSize="xs">
            {product.category}
          </Text>
        </Column>
      </Row>
    </Pressable>
  );
}
