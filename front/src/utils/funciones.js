export function convertToCamelCase(title) {
  const words = title.split(' ');
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase(); // Mantén la primera palabra en minúscula
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return camelCaseWords.join('');
}



export function slugCreator(texto) {
  if (!texto) return "";

  var resultado = texto.toLowerCase(); // Convertir a minúsculas

  // Reemplazar caracteres acentuados por sus equivalentes sin acento
  resultado = resultado.replace(/[áàäâ]/g, "a");
  resultado = resultado.replace(/[éèëê]/g, "e");
  resultado = resultado.replace(/[íìïî]/g, "i");
  resultado = resultado.replace(/[óòöô]/g, "o");
  resultado = resultado.replace(/[úùüû]/g, "u");
  resultado = resultado.replace(/[ñ]/g, "n");

  resultado = resultado.replace(/ /g, "-"); // Reemplazar espacios por guiones
  resultado = resultado.replace(/&/g, "+"); // Reemplazar "&" por signos de suma

  return resultado;
}

export function capitalizeString(inputString) {
  // Verifica si la cadena de entrada es válida y no está vacía
  if (inputString && inputString.length > 0) {
    // Capitaliza la primera letra y concatena el resto de la cadena en minúsculas
    const capitalized = inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    return capitalized;
  } else {
    return inputString; // Devuelve la cadena original si es inválida o vacía
  }
}