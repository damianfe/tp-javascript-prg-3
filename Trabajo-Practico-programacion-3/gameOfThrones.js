const axios = require('axios');
const fs = require('fs');

// URLs y archivo JSON
const THRONES_API_URL = 'https://thronesapi.com/api/v2/Characters';
const THRONES_JSON_FILE = 'characters.json';

// 1. Recuperar la información de Ned Stark
async function getNedStark() {
  try {
    const response = await axios.get(`${THRONES_API_URL}/6`);
    console.log('\nEjercicio 1, Punto 1: Información de Ned Stark:');
    console.log(response.data);
  } catch (error) {
    console.error('Error al recuperar la información de Ned Stark:', error);
  }
}

// 2. Recuperar todos los personajes disponibles
async function getAllCharacters() {
  try {
    const response = await axios.get(THRONES_API_URL);
    console.log('\nEjercicio 1, Punto 2: Todos los personajes disponibles han sido recuperados');
    return response.data;
  } catch (error) {
    console.error('Error al recuperar todos los personajes:', error);
  }
}

// 3. Persistir el resultado de la segunda consulta localmente en un archivo JSON
async function saveCharactersToFile() {
  try {
    const characters = await getAllCharacters();
    fs.writeFileSync(THRONES_JSON_FILE, JSON.stringify(characters, null, 2));
    console.log('\nEjercicio 1, Punto 3: Personajes guardados en "characters.json"');
  } catch (error) {
    console.error('Error al guardar los personajes en el archivo JSON:', error);
  }
}

// 4a. Mostrar por consola los personajes de la familia Stark
function showStarkFamilyCharacters(characters) {
  console.log('\nEjercicio 1, Punto 4a: Personajes de la familia Stark:');
  characters.forEach(character => {
    if (character.family === 'House Stark') {
      console.log(`- ${character.fullName}`);
    }
  });
}

// 4b. Eliminar los personajes cuyo ID sea mayor a 25 y sobrescribir el archivo original
function removeCharactersAboveId25(characters) {
  const filteredCharacters = characters.filter(character => character.id <= 25);
  fs.writeFileSync(THRONES_JSON_FILE, JSON.stringify(filteredCharacters, null, 2));
  console.log('\nEjercicio 1, Punto 4b: Los personajes con ID > 25 se han removido y se ha actualizado el archivo.');
  return filteredCharacters;
}

// 4c. Agregar un nuevo personaje y sobrescribir el archivo original
function addNewCharacter(filteredCharacters) {
  const newCharacter = {
    id: 26,
    firstName: 'New',
    lastName: 'Character',
    fullName: 'New Character',
    title: 'New Title',
    family: 'New Family',
    imageUrl: '',
    image: ''
  };
  filteredCharacters.push(newCharacter);
  fs.writeFileSync(THRONES_JSON_FILE, JSON.stringify(filteredCharacters, null, 2));
  console.log('\nEjercicio 1, Punto 4c: Se ha añadido un nuevo personaje y se ha actualizado el archivo.');
}

// Función para leer y manipular personajes
function readLocalCharacters() {
  try {
    const data = fs.readFileSync(THRONES_JSON_FILE, 'utf8');
    const characters = JSON.parse(data);
    showStarkFamilyCharacters(characters);
    const filteredCharacters = removeCharactersAboveId25(characters);
    addNewCharacter(filteredCharacters);
  } catch (error) {
    console.error('Error al leer o manipular el archivo de personajes:', error);
  }
}

// Exportar funciones
module.exports = {
  getNedStark,
  saveCharactersToFile,
  readLocalCharacters
};
