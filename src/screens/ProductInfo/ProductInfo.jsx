import React, { useState } from 'react';
import { Accordion, Box, Icon, Tabs, Heading, Text, Column, ScrollView } from 'native-base';

import { EnergyLabel } from './EnergyLabel';
import { floatToChar } from '../../constants/labels';

const nullText = 'No definido';

const InfoSection = (props) => {
  const { labels, rating } = props;
  const labelwater = floatToChar(labels.labelwater).toUpperCase();
  const labelCO2 = floatToChar(labels.labelCO2).toUpperCase();
  return (
    <>
      <Text>{`Consumo de agua: ${(rating.water || 0).toFixed(2)} L/u (${labelwater || nullText})`}</Text>
      <Text>{`Emisión de CO2: ${(rating.CO2 || 0).toFixed(2)} Kg/u (${labelCO2 || nullText})`}</Text>
      <Text>{`Afecta a la deforestación: ${rating.deforestation || nullText}`}</Text>
    </>
  );
}

export const ProductInfo = (props) => {
  const { product: { globalLabels, categoryLabels, ratingData, company, name } } = props;
  const { name: nameCompany, rating: ratingCompany, labels: companyLabels } = company;
  const [typeResult, setTypeResult] = useState(0);

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
                <Column>
                  <InfoSection
                    labels={typeResult === 0 ? globalLabels : categoryLabels}
                    rating={ratingData}
                  />
                </Column>
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
                  <InfoSection labels={companyLabels} rating={ratingCompany} />
                </Column>
              </Accordion.Details>
            </Accordion.Item>
          </Accordion>
        </Box>
      </ScrollView>
    </Box>
  );
};
