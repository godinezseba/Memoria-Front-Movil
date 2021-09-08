import React from 'react';
import { Box, Column, Skeleton, Row, Text, Divider } from 'native-base';

export const ProductCardSkeleton = () => (
  <Box
    backgroundColor="white"
  >
    <Row space={2}>
      <Skeleton variant="rect" height={20} width={20} />
      <Column space={1} py={1}>
        <Row space={5} alignItems="baseline">
          <Skeleton variant="rect" height={4} width={20} />
          <Skeleton variant="rect" height={4} width={20} />
        </Row>
        <Divider />
        <Row space={2} alignItems="baseline">
          <Text fontSize="xs">
            Empresa
          </Text>
          <Skeleton variant="rect" height={4} width={20} />
        </Row>
      </Column>
    </Row>
  </Box>
)
