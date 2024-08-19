const axios = require('axios');
const fs = require('fs');

// Función para recuperar información de Ned Stark
async function getNedStark() {
  try {
    const response = await axios.get('https://thronesapi.com/api/v2/Characters/2'); // Asumiendo que Ned Stark tiene ID 2
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Función para recuperar todos los personajes disponibles
async function getAllCharacters() {
  try {
    const response = await axios.get('https://thronesapi.com/api/v2/Characters');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Función para guardar los personajes en un archivo JSON
async function saveCharactersToFile() {
  try {
    const characters = await getAllCharacters();
    fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2));
    console.log('Characters saved to characters.json');
  } catch (error) {
    console.error(error);
  }
}

// Leer el archivo local de personajes y realizar las operaciones
function readLocalCharacters() {
  try {
    const data = fs.readFileSync('characters.json', 'utf8');
    const characters = JSON.parse(data);

    // a) Mostrar por consola los personajes de la familia Stark
    console.log('Family Stark Characters:');
    characters.forEach(character => {
      if (character.family === 'House Stark') {
        console.log(character);
      }
    });

    // b) Agregar un nuevo personaje y sobrescribir el archivo original
    const newCharacter = {
      id: characters.length + 1,
      firstName: 'New',
      lastName: 'Character',
      fullName: 'New Character',
      title: 'New Title',
      family: 'New Family',
      imageUrl: '',
      image: ''
    };
    characters.push(newCharacter);
    fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2));
    console.log('New character added and file updated');

    // c) Eliminar los personajes cuyo ID sean mayores a 25 y sobrescribir el archivo original
    const filteredCharacters = characters.filter(character => character.id <= 25);
    fs.writeFileSync('characters.json', JSON.stringify(filteredCharacters, null, 2));
    console.log('Characters with ID > 25 removed and file updated');
  } catch (error) {
    console.error(error);
  }
}

// Función principal
async function main() {
  await getNedStark();
  await saveCharactersToFile();
  readLocalCharacters();
}

main();