// src/utils/idGenerator.js

/**
 * Genera un ID o código aleatorio con la longitud y el tipo de caracteres especificados.
 *
 * @param {number} length - La longitud del ID/código a generar. Por defecto es 10.
 * @param {string} type - El tipo de caracteres a usar:
 * - 'alphanumeric' (por defecto): letras (mayúsculas/minúsculas) y números.
 * - 'numeric': solo números (0-9).
 * - 'alphabetic': solo letras (mayúsculas/minúsculas).
 * - 'hex': caracteres hexadecimales (0-9, a-f).
 * @returns {string} El ID/código aleatorio generado.
 */
export const generateRandomId = (length = 10, type = 'alphanumeric') => {
    let characters = '';
    switch (type.toLowerCase()) {
      case 'numeric':
        characters = '0123456789';
        break;
      case 'alphabetic':
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        break;
      case 'hex':
        characters = '0123456789abcdef';
        break;
      case 'alphanumeric':
      default:
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
  
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  // Puedes añadir otras funciones de ayuda aquí si las necesitas
  // Por ejemplo, una función para generar UUIDs estándar si alguna vez lo necesitas:
  // export const generateUUID = () => {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // };