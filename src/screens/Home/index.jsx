import React from 'react';
import { Tabs, Box, Center } from 'native-base';

import { EfficientView } from './EfficientView';

export const Home = () => {
  return (
    <Box>
      <Tabs isFitted>
        <Tabs.Bar>
          <Tabs.Tab>Más eficientes</Tabs.Tab>
          <Tabs.Tab>Más buscados</Tabs.Tab>
        </Tabs.Bar>
        <Tabs.Views>
          <Tabs.View>
            <EfficientView />
          </Tabs.View>
          <Tabs.View>
            <Center flex={1}>
              Aun no disponible...
            </Center>
          </Tabs.View>
        </Tabs.Views>
      </Tabs>
    </Box>
  );
}
