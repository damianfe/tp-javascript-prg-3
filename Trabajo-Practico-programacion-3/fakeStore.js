const fs = require('fs');
const path = require('path');

// URLs y archivo JSON
const FAKESTORE_API_URL = 'https://fakestoreapi.com/products';
const FAKESTORE_JSON_FILE = path.join(__dirname, 'productos.json');

// 1. Recuperar la información de todos los productos
async function getAllProducts() {
  try {
    const response = await fetch(FAKESTORE_API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener información de los productos');
    }
    const products = await response.json();
    fs.writeFileSync(FAKESTORE_JSON_FILE, JSON.stringify(products, null, 2));
    console.log('\nEjercicio 2, Punto 1: Todos los productos recuperados y guardados en "productos.json".');
  } catch (error) {
    console.error('Error al recuperar todos los productos:', error);
  }
}

// 2. Recuperar la información de un número limitado de productos
async function getLimitedProducts(limit) {
  try {
    const response = await fetch(`${FAKESTORE_API_URL}?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Error al obtener información de los productos');
    }
    const products = await response.json();
    console.log(`\nEjercicio 2, Punto 2: Primeros ${limit} productos recuperados:`);
    console.log(products);
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

// Exportar funciones
module.exports = {
  getAllProducts,
  getLimitedProducts,
  addProduct,
  getProductById,
  deleteProduct
};
