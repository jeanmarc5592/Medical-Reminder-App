import * as SecureStore from 'expo-secure-store';

/**
 * ***********************************
 * **** Stores a value with a key ****
 * ***********************************
 * @param {String} key - Key for the stored value
 * @param {String} value - Value that should be stored
 * @returns {Void} - Nothing
 */
export const saveToSecureStore = async (key = "", value = "") => {
    await SecureStore.setItemAsync(key, value);
}



/**
 * ***********************
 * **** Reads a value ****
 * ***********************
 * @param {String} key - Key that should be read 
 * @returns {Any} - The stored value for the provided key (if stored)
 */
export const getFromSecureStore = async (key = "") => {
    return await SecureStore.getItemAsync(key);
};