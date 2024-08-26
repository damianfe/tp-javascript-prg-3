const axios = require('axios');
const fs = require('fs');

const API_URL = 'https://fakestoreapi.com/products';
const JSON_FILE = 'productos.json';

// 1. Recuperar la información de todos los productos
async function getAllProducts() {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log('Información de todos los productos:', response.data);
  } catch (error) {
    console.error('Error al obtener información de los productos:', error);
  }
}

// 2. Recuperar la información de un número limitado de productos
async function getLimitedProducts(amount) {
  try {
    const response = await axios.get(`${API_URL}?limit=${amount}`);
    console.log(`Información de los primeros ${amount} productos:`, response.data);
  } catch (error) {
    console.error('Error al obtener información de los productos:', error);


}

// obtener el próximo ID disponible
function getNextProductId(products) {
  const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
  return maxId + 1;
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
    console.log('Producto agregado y guardado en productos.json:', newProduct);
  } catch (error) {
    console.error('Error al agregar un producto:', error);
  }
}

// 4. Retornar un producto según un “id” como parámetro
async function getProductById(id) {
  try {
    const products = readProductsFromFile();
    const product = products.find(p => p.id === id);
    if (product) {
      console.log(`Producto con ID ${id}:`, product);
    } else {
      console.log(`Producto con ID ${id} no encontrado.`);
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
    console.log(`Producto con ID ${id} eliminado y cambios guardados en productos.json`);
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
  }
}



// Agregar un nuevo producto
const newProductDetails = {
  title: 'Nuevo Producto',
  price: 19.99,
  description: 'Descripción del nuevo producto',
  image: 'https://i.pravatar.cc',
  category: 'category'
};
addProduct(newProductDetails);

// Retornar un producto según su ID (por ejemplo, ID 1)
getProductById(1);

// Eliminar un producto según su ID (por ejemplo, ID 1)
deleteProduct(1);
