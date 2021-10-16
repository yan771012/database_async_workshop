const express = require('express')
const router = express.Router()
const Product = require('../../models/product')
const Customer = require('../../models/customer')

router.get('/', (req, res) => {
  return res.render('index')
})

router.get('/productList', async (req, res) => {
  let products = await Product.find().lean()
  res.render('productList', { products })
})

router.get('/customerList', async (req, res) => {
  let customers = await Customer.find().lean()
  let products = await Product.find().lean()

  customers = customers.map(customer => {
    let favoriteProduct = products.find(product => customer.favorite.equals(product._id))
    customer.productName = favoriteProduct.name
    return customer
  })

  //模擬其他資料邏輯處理
  await saveUserLog()

  res.render('customerList', { customers })
})


//case 2
// router.get('/customerList', async (req, res) => {
//   let customers = await Customer.find().lean()
//
//   for (const customer of customers) {
//     let product = await Product.findOne({_id: customer.favorite})
//     customer.productName = product.name
//   }
//
//   //模擬其他資料邏輯處理
//   await saveUserLog()
//
//   res.render('customerList', { customers })
// })

function saveUserLog () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

module.exports = router
