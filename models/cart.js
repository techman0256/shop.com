const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static fetchAll = cb => {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            else {
                cb(JSON.parse(fileContent));
            }
        });
    }
    
    static addProduct(id, name, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            console.log(cart);

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {id: id, name: name, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err); 
            })
        })
    }

    static deleteProduct(id, productPrice) {
        this.fetchAll(cart => {
            // cart = JSON.parse(fileContent);
    
            console.log(cart);

            const productIndex = cart.products.findIndex(prod => prod.id === id);
            cart.totalPrice -= (cart.products[productIndex].qty*productPrice);
            cart.products.splice(productIndex, 1);
            
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err); 
            })
        });
        
        // fs.readFile(p, (err, fileContent) => {
        //     if (err) {
        //         return;
        //     }
        
    }
    
}