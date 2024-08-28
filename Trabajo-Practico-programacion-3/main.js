const gameOfThrones = require('./gameOfThrones');
const fakeStore = require('./fakeStore');

async function main() {
  // Ejercicio 1: Thrones API
  await gameOfThrones.getNedStark();
  await gameOfThrones.saveCharactersToFile();
  gameOfThrones.readLocalCharacters();

  // Ejercicio 2: FakeStore API
  await fakeStore.getAllProducts();
  await fakeStore.getLimitedProducts(5);
  const newProductDetails = {
    title: 'Nuevo Producto',
    price: 19.99,
    description: 'Descripción del nuevo producto',
    image: 'https://i.pravatar.cc',
    category: 'category'
  };
  await fakeStore.addProduct(newProductDetails);
  await fakeStore.getProductById(1);
  await fakeStore.deleteProduct(1);
}

main();
