import React from 'react';
import { Row, Column, Box } from 'native-base';

import { Label, BlackLabel } from '../../components/Labels';
import { numberToChar } from '../../constants/labels';

const letters = ['a', 'b', 'c', 'd', 'e'];

export const EnergyLabel = (props) => {
  let label = props.label || '1';
  label = numberToChar[label];

  return (
    <Box my={5}>
      <Column alignItems="center" space={3}>
        <Box w="100%">
          {letters.map((character) => (
            <Row key={`label-${label}-${character}`} space={5} justifyContent="space-between">
              <Label character={character} />
              {label === character ? (
                <BlackLabel character={character} />
              ) : (
                <Box w={30} h={30} />
              )}
            </Row>
          ))}
        </Box>
      </Column>
    </Box>
  )
}
