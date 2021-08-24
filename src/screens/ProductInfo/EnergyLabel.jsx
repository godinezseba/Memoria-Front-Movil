import React, { useRef, useEffect } from 'react';
import { Row, Column, Box, Fade } from 'native-base';

import { Label, BlackLabel } from '../../components/Labels';
import { numberToChar } from '../../constants/labels';

const letters = ['a', 'b', 'c', 'd', 'e'];

export const EnergyLabel = (props) => {
  let label = props.label || '1';
  label = numberToChar[label];

  const Labels = () => (
    <Box my={5}>
      <Column alignItems="center" space={3}>
        <Box w="100%">
          {letters.map((character) => (
            <Row key={`label-${label}-${character}`} justifyContent="space-between">
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
  );

  // fade effect in the first render
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  });

  if (firstUpdate)
    return (
      <Fade in>
        <Labels />
      </Fade>
    );

  return (
    <Labels />
  );
}
