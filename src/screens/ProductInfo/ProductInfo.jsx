import React, { Fragment, useState } from 'react';
import {
  Accordion,
  Box,
  Icon,
  Tabs,
  Heading,
  Text,
  Column,
  ScrollView,
  Row,
  Divider,
  Pressable,
} from 'native-base';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { EnergyLabel } from './EnergyLabel';
import { floatToChar, colors } from '../../constants/labels';

const nullText = 'No definido';

const InfoSection = (props) => {
  const { labels, rating } = props;
  const labelwater = floatToChar(labels.labelwater);
  const labelCO2 = floatToChar(labels.labelCO2);
  return (
    <Column>
      <Row width="100%" justifyContent="space-between">
        <Text>Consumo de agua (<Text bold color={colors[labelwater]}>{labelwater.toUpperCase() || nullText}</Text>):</Text>
        <Text>{`${(rating.water || 0).toFixed(2)} L/u`}</Text>
      </Row>
      <Divider my={2} />
      <Row width="100%" justifyContent="space-between">
        <Text>Emisión de CO2 (<Text bold color={colors[labelCO2]}>{labelCO2.toUpperCase() || nullText}</Text>):</Text>
        <Text>{`${(rating.CO2 || 0).toFixed(2)} Kg/u`}</Text>
      </Row>
      <Divider my={2} />
      <Text>{`Afecta a la deforestación: ${rating.deforestation || nullText}`}</Text>
    </Column>
  );
}

export const ProductInfo = (props) => {
  const { product: {
    globalLabels,
    categoryLabels,
    ratingData,
    company,
    name,
  },
  } = props;
  const {
    name: nameCompany,
    rating: ratingCompany,
    labels: companyLabels,
    certificates,
  } = company;
  const [typeResult, setTypeResult] = useState(0);
  const navigation = useNavigation();

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
                <Icon size={6} as={<AntDesign name="questioncircleo" color="black" />} />
              </Accordion.Summary>
              <Accordion.Details>
                <Column>
                  <Text>La nota de los productos es el resultado de promediar los indices de sus respectivas huellas:</Text>
                  <Divider my={1} />
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
                  <Text>Este producto es de la empresa <Text bold>{nameCompany}</Text>, la cual tiene las siguientes huellas:</Text>
                  <Divider my={1} />
                  <InfoSection labels={companyLabels} rating={ratingCompany} />
                </Column>
              </Accordion.Details>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Summary>
                ¿Están acreditados estos datos?
                {certificates.length ? (
                  <Accordion.Icon />
                ) : (
                  <Icon size={6} as={<Feather name="alert-triangle" />} />
                )}
              </Accordion.Summary>
              <Accordion.Details>
                <Column>
                  {certificates.length ? (
                    <Fragment>
                      <Text>La acreditación es un proceso que esta asociado a
                        la empresa de los productos, en este caso la empresa provee los siguientes certificados:</Text>
                      {certificates.map((certificate, index) => {
                        const { name, fileId } = certificate;
                        return (
                          <Pressable key={fileId} onPress={() => navigation.push('Archivo', { fileId: fileId })}>
                            <Divider my={2} />
                            <Row justifyContent="space-between">
                              <Row justifyContent="flex-start">
                                <Text bold mr={2}>{index + 1}.</Text>
                                <Text>{name}</Text>
                              </Row>
                              <Row space={2} alignItems="baseline">
                                <Text fontSize="xs">Empresa:</Text>
                                <Text>{nameCompany}</Text>
                              </Row>
                            </Row>
                          </Pressable>
                        )
                      })}
                    </Fragment>
                  ) : (
                    <Text>La acreditación es un proceso que esta asociado a
                      la empresa de los productos, desafortunadamente esta
                      empresa <Text bold>no tiene</Text> archivos que acrediten los datos.</Text>
                  )}
                </Column>
              </Accordion.Details>
            </Accordion.Item>
          </Accordion>
        </Box>
      </ScrollView>
    </Box>
  );
};
