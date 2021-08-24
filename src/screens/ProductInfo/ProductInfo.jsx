import React, { useState } from 'react';
import { Accordion, Box, Icon, Tabs, Heading } from 'native-base';

import { EnergyLabel } from './EnergyLabel';

export const ProductInfo = (props) => {
  const { product, product: { globalLabels, categoryLabels } } = props;
  const [typeResult, setTypeResult] = useState(0);

  return (
    <Box safeArea>
      <Tabs onChange={setTypeResult} index={typeResult} isFitted>
        <Tabs.Bar>
          <Tabs.Tab>Global</Tabs.Tab>
          <Tabs.Tab>Categorico</Tabs.Tab>
        </Tabs.Bar>
      </Tabs>
      <Box m={3}>
        <Heading>
          {product.name}
        </Heading>
        <EnergyLabel label={typeResult === 0 ? globalLabels.label : categoryLabels.label} />
        <Box>
          <Accordion allowMultiple>
            <Accordion.Item>
              <Accordion.Summary>
                ¿Cómo se obtuvo este resultado?
                <Icon name="snowflake" type="MaterialCommunityIcons" />
              </Accordion.Summary>
              <Accordion.Details>
                {typeResult === 0 ? 'Valores globales' : 'Valores en su categoria'}
              </Accordion.Details>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Summary>
                Sobre la empresa...
                <Accordion.Icon />
              </Accordion.Summary>
              <Accordion.Details>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </Accordion.Details>
            </Accordion.Item>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};