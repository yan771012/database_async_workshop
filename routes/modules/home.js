const express = require('express')
const router = express.Router()
const Product = require('../../models/product')
const Customer = require('../../models/customer')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
  return res.render('index')
})

router.get('/productList', (req, res) => {
  let products = []
  Product
    .find()
    .lean()
    .then(ps => {
      products = ps
    })

    res.render('productList', {products})
})

router.get('/customerList', (req, res) => {
  Customer
    .find()
    .lean()
    .then(customers => {
      customers.forEach(customer => {
        Product
          .find({_id: {$in: customer.favorite.map(mongoose.Types.ObjectId)}})
          .then(products => {
            customer.favoriteSize = products.length
            customer.favoriteNames = products.map(product => product.name)
          })
      })
      res.render('customerList', {customers})
    })
})

module.exports = router
