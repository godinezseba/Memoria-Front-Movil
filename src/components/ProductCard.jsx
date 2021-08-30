import React from 'react';
import { Row, Pressable, Center, Text, Column } from 'native-base';

import { colors, floatToChar } from '../constants/labels';

export default function ProductCard(props) {
  const { product, onPress } = props;
  const { globalLabels: { label }, company, categoryLabels } = product;
  const labelChar = floatToChar(label);
  return (
    <Pressable
      onPress={onPress}
      backgroundColor="white"
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
        <Column space={1} py={1}>
          <Row space={5}>
            <Text>
              {product.name}
            </Text>
            <Text fontSize="xs">
              {product.category}
            </Text>
          </Row>
          <Text>
            {company.name}
          </Text>
        </Column>
      </Row>
    </Pressable>
  );
}
