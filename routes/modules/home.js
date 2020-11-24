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
          //搜尋並模擬資料庫緩慢
          .find({ _id: { $in: customer.favorite.map(mongoose.Types.ObjectId) }, $where: 'sleep(30) || true' })
          .then(products => {
            customer.favoriteSize = products.length
            customer.favoriteNames = products.map(product => product.name)
          })
      })

      //模擬其他資料邏輯處理
      saveUserLog()
        .then(() => {
          res.render('customerList', { customers })
        })
    })
})

function saveUserLog () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

module.exports = router
