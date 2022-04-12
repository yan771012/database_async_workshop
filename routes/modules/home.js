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

  res.render('productList', { products })
})

router.get('/customerList', (req, res) => {
  Customer
    .find()
    .lean()
    .then(customers => {
      customers.forEach(customer => {
        Product
          .findOne({ _id: mongoose.Types.ObjectId(customer.favorite) })
          .then(product => {
            customer.productName = product.name
          })
      })

      //模擬其他資料邏輯處理
      saveUserLog()
        .then(() => {
          res.render('customerList', { customers })
        })
    })
})

//correct
// router.get('/productList', (req, res) => {
//   Product
//     .find()
//     .lean()
//     .then(products => {
//       res.render('productList', { products })
//     })
// })
//
// router.get('/customerList', (req, res) => {
//   Customer
//     .find()
//     .lean()
//     .then(customers => {
//       Product
//         .find()
//         .lean()
//         .then(products => {
//           customers.forEach(customer => {
//             let favoriteProduct = products.find(product => customer.favorite.equals(product._id))
//             customer.productName = favoriteProduct.name
//           })
//         })
//
//       //模擬其他資料邏輯處理
//       saveUserLog()
//         .then(() => {
//           res.render('customerList', { customers })
//         })
//     })
// })


function saveUserLog () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

module.exports = router
