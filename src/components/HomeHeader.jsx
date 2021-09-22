import React, { useState } from 'react';
import { Column, Input, Icon, Center, Row, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const HomeHeader = ({ navigation }) => {
  const [searchName, setSearchName] = useState('');
  return (
    <Center flex={1} px={2}>
      <Column space={8} width="100%">
        <Row w="100%" alignItems="center" justifyContent="space-between">
          <Input
            placeholder="Buscar por nombre..."
            variant="filled"
            width="80%"
            bg="gray.200"
            colorScheme="gray"
            borderRadius={10}
            py={1}
            px={2}
            _web={{
              _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
            }}
            InputLeftElement={<Icon size='sm' ml={2} size={5} color="gray.400" as={<Ionicons name="ios-search" />} />}
            value={searchName}
            onChangeText={setSearchName}
            onEndEditing={() => navigation.push('Busqueda', { searchName })}
            keyboardType="web-search"
          />
          <IconButton
            colorScheme="gray"
            icon={<Icon as={Ionicons} name="camera-outline" color="gray.500" />}
            onPress={() => navigation.push('BarScan')}
          />
        </Row>
      </Column>
    </Center>
  );
}
