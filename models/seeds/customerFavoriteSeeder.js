const Customer = require('../customer')
const Product = require('../product')
const db = require('../../config/mongoose')

db.once('open', () => {
  Customer
    .find()
    .then((customers => {
      Product
        .find()
        .then(products => {
          let saveProcess = []
          customers.forEach(customer => {
            let index = Math.floor(Math.random() * products.length)
            customer.favorite = products[index]._id
            saveProcess.push(customer.save())
          })
          return Promise.all(saveProcess)
        })
        .then(() => {
          console.log(`add customer favorite done...`)
          return db.close()
        })
        .then(() => {
          console.log(`database connection close...`)
        })
    }))
})
