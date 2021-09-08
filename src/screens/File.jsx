import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Heading, Spinner, Center } from 'native-base';
import { gql, useQuery } from '@apollo/client';
import PDFReader from 'rn-pdf-reader-js';

const GET_FILE = gql`
query GetFile($id: ID!){
  file(id: $id) {
    id
    file
  }
}
`;

export const File = ({ route }) => {
  const { params } = route || {};
  const { fileId = '6137daa924a062970799a05f' } = params || {};
  if (!fileId)
    return (
      <Center flex={1}>
        <Heading mt={3}>No deberias estar aquí... </Heading>
      </Center>
    );
  const { loading, error, data } = useQuery(GET_FILE, { variables: { id: fileId } });

  if (error)
    return (
      <Center flex={1}>
        <Heading mt={3}>Error al buscar el archivo </Heading>
      </Center>
    );

  if (loading)
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Cargando archivo" />
      </Center>
    );

  const { file } = data;
  console.log(file);
  return (
    <PDFReader source={{ base64: file.file }} />
  );
};
