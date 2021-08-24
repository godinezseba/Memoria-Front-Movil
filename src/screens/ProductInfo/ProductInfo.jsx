import React, { useState } from 'react';
import { Accordion, Box, Icon, Tabs, Heading, Text, Column } from 'native-base';

import { EnergyLabel } from './EnergyLabel';
import { numberToChar } from '../../constants/labels';

export const ProductInfo = (props) => {
  const { product, product: { globalLabels, categoryLabels, ratingData } } = props;
  const [typeResult, setTypeResult] = useState(0);

  const InfoSection = () => {
    const labels = typeResult === 0 ? globalLabels : categoryLabels;
    const labelwater = numberToChar[labels.labelwater].toUpperCase();
    const labelCO2 = numberToChar[labels.labelCO2].toUpperCase();
    return (
      <Column>
        <Text>{`Consumo de agua: ${ratingData.water.toFixed(2)} Kg/u (${labelwater})`}</Text>
        <Text>{`Emisión de CO2: ${ratingData.CO2.toFixed(2)} L/u (${labelCO2})`}</Text>
        <Text>{`Afecta a la deforestación: ${ratingData.deforestation}`}</Text>
      </Column>
    );
  }

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
        <Accordion allowMultiple index={[0]}>
          <Accordion.Item>
            <Accordion.Summary>
              ¿Cómo se obtuvo este resultado?
              <Icon name="snowflake" type="MaterialCommunityIcons" />
            </Accordion.Summary>
            <Accordion.Details>
              <InfoSection />
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
  );
};
