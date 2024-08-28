const axios = require('axios');
const fs = require('fs');

// URLs y archivo JSON
const THRONES_API_URL = 'https://thronesapi.com/api/v2/Characters';
const FAKESTORE_API_URL = 'https://fakestoreapi.com/products';
const THRONES_JSON_FILE = 'characters.json';
const FAKESTORE_JSON_FILE = 'productos.json';

// Ejercicio 1: Thrones API

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
    console.log('\nEjercicio 1, Punto 2: Todos lo personajes disponibles han sido recuperados');
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
  return filteredCharacters;  // Devolver los personajes filtrados para usarlos en la siguiente operación
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
    const filteredCharacters = removeCharactersAboveId25(characters);  // Filtrar personajes con ID > 25
    addNewCharacter(filteredCharacters);  // Agregar un nuevo personaje después de filtrar
  } catch (error) {
    console.error('Error al leer o manipular el archivo de personajes:', error);
  }
}

// Ejercicio 2: FakeStore API

// 1. Recuperar la información de todos los productos
async function getAllProducts() {
  try {
    const response = await axios.get(FAKESTORE_API_URL);
    fs.writeFileSync(FAKESTORE_JSON_FILE, JSON.stringify(response.data, null, 2));
    console.log('\nEjercicio 2, Punto 1: Todos los productos recuperados y guardados en "productos.json".');
  } catch (error) {
    console.error('Error al recuperar todos los productos:', error);
  }
}

// 2. Recuperar la información de un número limitado de productos
async function getLimitedProducts(limit) {
  try {
    const response = await axios.get(`${FAKESTORE_API_URL}?limit=${limit}`);
    console.log(`\nEjercicio 2, Punto 2: Primeros ${limit} productos recuperados:`);
    console.log(response.data);
  } catch (error) {
    console.error(`Error al recuperar los primeros ${limit} productos:`, error);
  }
}

// 3. Agregar un nuevo producto y guardar en archivo JSON
async function addProduct(newProductDetails) {
  try {
    const products = readProductsFromFile();
    const newProductId = getNextProductId(products);
    const newProduct = {
      id: newProductId,
      ...newProductDetails
    };
    products.push(newProduct);
    saveProductsToFile(products);
    console.log('\nEjercicio 2, Punto 3: Producto agregado y guardado en productos.json:', newProduct);
  } catch (error) {
    console.error('Error al agregar un producto:', error);
  }
}

// 4. Retornar un producto según un "id" como parámetro
async function getProductById(id) {
  try {
    const products = readProductsFromFile();
    const product = products.find(p => p.id === id);
    if (product) {
      console.log(`\nEjercicio 2, Punto 4: Producto con ID ${id}:`, product);
    } else {
      console.log(`\nEjercicio 2, Punto 4: Producto con ID ${id} no encontrado.`);
    }
  } catch (error) {
    console.error(`Error al recuperar el producto con ID ${id}:`, error);
  }
}

// 5. Eliminar un producto y guardar cambios en archivo JSON
async function deleteProduct(id) {
  try {
    let products = readProductsFromFile();
    products = products.filter(p => p.id !== id);
    saveProductsToFile(products);
    console.log(`\nEjercicio 2, Punto 5: Producto con ID ${id} eliminado y cambios guardados en productos.json.`);
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
  }
}

// Funciones auxiliares para manejo de archivos de productos
function readProductsFromFile() {
  try {
    const data = fs.readFileSync(FAKESTORE_JSON_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    return [];
  }
}

function saveProductsToFile(products) {
  try {
    fs.writeFileSync(FAKESTORE_JSON_FILE, JSON.stringify(products, null, 2));
    console.log('Productos guardados en productos.json');
  } catch (error) {
    console.error('Error al guardar en el archivo JSON:', error);
  }
}

function getNextProductId(products) {
  const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
  return maxId + 1;
}

// Función principal
async function main() {
  // Ejercicio 1
  await getNedStark();
  await saveCharactersToFile();
  readLocalCharacters();

  // Ejercicio 2
  await getAllProducts();
  await getLimitedProducts(5);
  const newProductDetails = {
    title: 'Nuevo Producto',
    price: 19.99,
    description: 'Descripción del nuevo producto',
    image: 'https://i.pravatar.cc',
    category: 'category'
  };
  await addProduct(newProductDetails);
  await getProductById(1);
  await deleteProduct(1);
}

main();
