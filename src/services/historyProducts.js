import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'historyProducts';

export const saveProduct = async (product) => {
  try {
    const products = await getProducts();
    if (products === null)
      return false;

    const positionProduct = products.indexOf(product);
    if(positionProduct !== -1)
      products.splice(positionProduct, 1);
    
    products.unshift(product);
    if(products.length > 20)
      products.pop();
    
    const jsonValue = JSON.stringify(products);
    await AsyncStorage.setItem(storageKey, jsonValue);
    return true;
  } catch (error) {
    return false;
  }
}


export const getProducts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    // in the view we show an error message
    return null;
  }
}
