import * as SecureStore from 'expo-secure-store';

// TODO: ADD JS DOCS

export const saveToSecureStore = async (key = "", value = "") => {
    await SecureStore.setItemAsync(key, value);
}

export const getFromSecureStore = async (key = "") => {
    return await SecureStore.getItemAsync(key);
};