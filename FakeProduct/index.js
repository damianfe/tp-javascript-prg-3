const axios = require('axios');

// URL base de la FakeStore API
const API_URL = 'https://fakestoreapi.com/products';

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
}

// 3. Agregar un nuevo producto
async function addProduct(newProduct) {
  try {
    const response = await axios.post(API_URL, newProduct);
    console.log('Producto agregado:', response.data);
  } catch (error) {
    console.error('Error al agregar un producto:', error);
  }
}

// 4. Retornar un producto según un “id” como parámetro
async function getProductById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(`Producto con ID ${id}:`, response.data);
  } catch (error) {
    console.error(`Error al recuperar el producto con ID ${id}:`, error);
  }
}

// 5. Eliminar un producto
async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(`Producto con ID ${id} eliminado:`, response.data);
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
  }
}

// Ejecución de las funciones para probar los requerimientos

// Recuperar todos los productos
getAllProducts();

// Recuperar un número limitado de productos (por ejemplo, 5)
getLimitedProducts(5);

// Agregar un nuevo producto
const newProduct = {
  title: 'Nuevo Producto',
  price: 19.99,
  description: 'Descripción del nuevo producto',
  image: 'https://i.pravatar.cc',
  category: 'category'
};
addProduct(newProduct);

// Retornar un producto según su ID (por ejemplo, ID 1)
getProductById(1);

// Eliminar un producto según su ID (por ejemplo, ID 21)
deleteProduct(21);
