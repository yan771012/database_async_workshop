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


  // Product
  //   .find()
  //   .lean()
  //   .then(products => {
  //     res.render('productList', {products})
  //   })
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

  // Customer
  //   .find()
  //   .lean()
  //   .then(customers => {
  //     Product
  //       .find()
  //       .lean()
  //       .then(products => {
  //         customers.forEach(customer => {
  //           let favoriteProducts = products.filter(product => {
  //             let pass = false
  //             customer.favorite.forEach(productId => {
  //               if (String(productId) === String(product._id)) {
  //                 pass = true
  //               }
  //             })
  //             return pass
  //           })
  //           customer.favoriteSize = favoriteProducts.length
  //           customer.favoriteNames= favoriteProducts.map(product => product.name)
  //         })
  //         res.render('customerList', {customers})
  //       })
  //   })

  // let allCustomers = []
  // Customer
  //   .find()
  //   .lean()
  //   .then(customers => {
  //     allCustomers = customers.map(customer => {
  //       customer.favorite = customer.favorite.map(String)
  //       return customer
  //     })
  //     return Product.find().lean()
  //   }).then(products => {
  //   allCustomers.forEach(customer => {
  //     let favoriteProducts = products.filter(product => customer.favorite.includes(String(product._id)))
  //     customer.favoriteSize = favoriteProducts.length
  //     customer.favoriteNames= favoriteProducts.map(product => product.name)
  //   })
  //   res.render('customerList', {customers: allCustomers})
  // })
})

module.exports = router
