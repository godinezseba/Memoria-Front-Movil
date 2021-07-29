import React, { useState } from 'react';
import { Accordion, Center, Box, Icon, Tabs } from 'native-base';

const defaultProduct = {
  barcode_id: '',
  name: 'example',
  brand: '',
  category: '',
  model: '',
  rating_data: {
    efficiency: '',
  },
};

export const Product = ({ route }) => {
  const [typeResult, setTypeResult] = useState(0);
  const product = route.params?.product ? route.params.product : defaultProduct;

  return (
    <Center flex={1}>
      <Tabs onChange={setTypeResult} index={typeResult} align="center">
        <Tabs.Bar>
          <Tabs.Tab>Global</Tabs.Tab>
          <Tabs.Tab>Categorico</Tabs.Tab>
        </Tabs.Bar>
      </Tabs>
      <Box>
        {product.name}
      </Box>
      <Box m={3}>
        <Accordion index={[0, 1]}>
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
    </Center>
  );
};
