// data.js
const express = require('express');
const router = express.Router();
let items = [
  {
    itemId: 'item1',
    name: 'Example Item 1',
    description: 'A sample item for testing',
    type: 'Electronics',
    price: 50,
    details: 'Brand: XYZ, Warranty: 1 year',
  },
  {
    itemId: 'item2',
    name: 'Example Item 2',
    description: 'Another sample item for testing',
    type: 'Furniture',
    price: 100,
    details: 'Material: Wood, Size: Medium',
  },
];

let carts = {}; // Stores each user's cart
let purchases = {}; // Stores each user's purchase history




const products = [
  {
    itemId: 'item1',
    name: 'Apple',
    category: 'Fruits',
    description: 'Fresh red apples',
    price: 10,
    quantity: 100,
    location: 'Farm 1',
    sellerId: 'seller1',
    attributes: {
      breed: 'Gala',
      age: 1,
      weight: 1.2,
      healthStatus: 'Healthy'
    }
  },
  {
    itemId: 'item2',
    name: 'Banana',
    category: 'Fruits',
    description: 'Ripe bananas',
    price: 5,
    quantity: 200,
    location: 'Farm 2',
    sellerId: 'seller2',
    attributes: {
      breed: 'Cavendish',
      age: 0.5,
      weight: 1.1,
      healthStatus: 'Healthy'
    }
  },
  {
    itemId: 'item3',
    name: 'Orange',
    category: 'Fruits',
    description: 'Juicy oranges',
    price: 8,
    quantity: 150,
    location: 'Farm 3',
    sellerId: 'seller3',
    attributes: {
      breed: 'Navel',
      age: 1.5,
      weight: 1.3,
      healthStatus: 'Healthy'
    }
  }
];

module.exports = {products, items, carts, purchases };

