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

module.exports = { items, carts, purchases };
