/*Aca se manajera toda la logica de @react-native-async-storage/async-storage */
import AsyncStorage from "@react-native-async-storage/async-storage";
type StoreDataProps = {
  name: string;
  value: number | string | Record<string, string>;
};
export const storeData = async ({ name, value }: StoreDataProps) => {
  try {
    const jsonValue = JSON.stringify(value);
    const result = await AsyncStorage.setItem(name, jsonValue);
    console.log("result", result);
  } catch (e) {
    // saving error
  }
};

export const getData = async (name: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeData = async (name: string): Promise<any> => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    // error reading value
  }
};
