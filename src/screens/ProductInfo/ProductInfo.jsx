import React, { useState } from 'react';
import { Accordion, Box, Icon, Tabs, Heading, Text, Column, ScrollView } from 'native-base';

import { EnergyLabel } from './EnergyLabel';
import { numberToChar } from '../../constants/labels';

const nullText = 'No definido';

export const ProductInfo = (props) => {
  const { product: { globalLabels, categoryLabels, ratingData, company, name } } = props;
  const { name: nameCompany, rating: ratingCompany, labels: companyLabels } = company;
  const { labelwater, labelCO2 } = companyLabels || {};

  const [typeResult, setTypeResult] = useState(0);

  const InfoSection = () => {
    const labels = typeResult === 0 ? globalLabels : categoryLabels;
    const labelwater = numberToChar[labels.labelwater].toUpperCase();
    const labelCO2 = numberToChar[labels.labelCO2].toUpperCase();
    return (
      <Column>
        <Text>{`Consumo de agua: ${(ratingData.water || 0).toFixed(2)} Kg/u (${labelwater || nullText})`}</Text>
        <Text>{`Emisión de CO2: ${(ratingData.CO2 || 0).toFixed(2)} L/u (${labelCO2 || nullText})`}</Text>
        <Text>{`Afecta a la deforestación: ${ratingData.deforestation || nullText}`}</Text>
      </Column>
    );
  }

  return (
    <Box>
      <Tabs onChange={setTypeResult} index={typeResult} isFitted>
        <Tabs.Bar>
          <Tabs.Tab>Global</Tabs.Tab>
          <Tabs.Tab>Categorico</Tabs.Tab>
        </Tabs.Bar>
      </Tabs>
      <ScrollView>
        <Box m={3}>
          <Heading>
            {name}
          </Heading>
          <EnergyLabel label={typeResult === 0 ? globalLabels.label : categoryLabels.label} />
          <Accordion allowMultiple index={[0]} mb={10}>
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
                ¿Quién desarrolla este producto?
                <Accordion.Icon />
              </Accordion.Summary>
              <Accordion.Details>
                <Column>
                  <Text>Este producto es de la empresa <Text bold>{nameCompany}</Text></Text>
                  <Text>{`Consumo de agua: ${(ratingCompany.water || 0).toFixed(2)} Kg/u (${labelwater || nullText})`}</Text>
                  <Text>{`Emisión de CO2: ${(ratingCompany.CO2 || 0).toFixed(2)} L/u (${labelCO2 || nullText})`}</Text>
                  <Text>{`Afecta a la deforestación: ${ratingCompany.deforestation || nullText}`}</Text>
                </Column>
              </Accordion.Details>
            </Accordion.Item>
          </Accordion>
        </Box>
      </ScrollView>
    </Box>
  );
};
