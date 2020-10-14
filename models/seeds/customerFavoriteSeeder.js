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
            let size = Math.floor(Math.random() * 6)
            let favoriteProducts = sample(products, size);
            customer.favorite = favoriteProducts.map(product => product._id)
            saveProcess.push(customer.save())
          });
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

function sample(population, size) {
  if (size <= 0) return []

  let sampling = []
  Array(size).fill(0).forEach(() => {
    sampling.push(population[Math.floor(Math.random() * size)])
  })

  return sampling
}



