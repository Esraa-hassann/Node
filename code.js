  
  const fs = require('fs');
  const path ='./data.json';

const products = [
    { name: "Book", id: 1, price: 30 },
    { name: "Hat", id: 2, price: 40 },
    { name: "Table", id: 3, price: 50 }
  ];
  function initializeFile() {
    if (!fs.existsSync(path) || fs.readFileSync(path, 'utf8').trim() === '') {
        writeProducts(products);
    }
}

  //write
  function writeProducts(products){
    fs.writeFileSync(path, JSON.stringify(products, null, 2));
    console.log('Data written to data.json');
}

  //read
  function readProducts(){
    try {
      const data = fs.readFileSync(path, 'utf8');
      return JSON.parse(data);
  } catch (err) {
      console.log(err);
      return [];
  }
}

  //delete
  function deleteProduct(id){
    let products = readProducts();
    const updatedProducts = products.filter((product) => product.id !== id);

    if (products.length !== updatedProducts.length) {
        writeProducts(updatedProducts);
        console.log(`Product with id ${id} deleted.`);
    } else {
        console.log(`Product with id ${id} not found.`);
    }
}

//update
function updateProduct(id, updatedProduct) {
  let products = readProducts();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      writeProducts(products);
      console.log(`Product with id ${id} updated.`);
  } else {
      console.log(`Product with id ${id} not found.`);
  }
}

//search
function searchProductByName(name) {
  const products = readProducts();
  const result = products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));

  if (result.length > 0) {
      console.log('Products found:', result);
  } else {
      console.log(`No products found with the name "${name}".`);
  }
}

initializeFile();


// Read 
console.log('Products:', readProducts());

// Update 
updateProduct(2, { name: 'Hat', price: 70 });

// Search 
searchProductByName('Table');

// Delete product with id 1
deleteProduct(1);


console.log('Products after deletion:', readProducts());

