import React from 'react';
import { Tabs, Box } from 'native-base';

export const Home = () => {
  return (
    <Box>
      <Tabs isFitted>
        <Tabs.Bar>
          <Tabs.Tab>Más eficientes</Tabs.Tab>
          <Tabs.Tab>Más buscados</Tabs.Tab>
        </Tabs.Bar>
        <Tabs.Views>
          <Tabs.View>One</Tabs.View>
          <Tabs.View>Two</Tabs.View>
        </Tabs.Views>
      </Tabs>
    </Box>
  );
}
