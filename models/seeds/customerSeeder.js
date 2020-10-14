const Customer = require('../customer')
const db = require('../../config/mongoose')
// 20 rows
const customerRowData = [
  {
    "name": "陳小姐"
  },
  {
    "name": "林先生"
  },
  {
    "name": "黃小姐"
  },
  {
    "name": "張先生"
  },
  {
    "name": "李先生"
  },
  {
    "name": "王先生"
  },
  {
    "name": "吳小姐"
  },
  {
    "name": "劉小姐"
  },
  {
    "name": "蔡小姐"
  },
  {
    "name": "楊先生"
  },
  {
    "name": "許小姐"
  },
  {
    "name": "鄭小姐"
  },
  {
    "name": "謝先生"
  },
  {
    "name": "郭小姐"
  },
  {
    "name": "洪小姐"
  },
  {
    "name": "曾先生"
  },
  {
    "name": "邱先生"
  },
  {
    "name": "廖小姐"
  },
  {
    "name": "賴小姐"
  },
  {
    "name": "周小姐"
  }
]

db.once('open', () => {
  Customer.create(
    customerRowData
  ).then(() => {
    console.log(`insert customer done...`)
    return db.close()
  }).then(() => {
    console.log(`database connection close...`)
  })


  // for (let i = 0; i < customerRowData.length; i++) {
  //   setTimeout(() => {
  //     Customer.create(
  //       customerRowData[i]
  //     )
  //   }, i * 500);
  // }
  //
  // setTimeout(() => {
  //   db.close()
  //   console.log(`database connection close...`)
  // }, customerRowData.length * 500 + 1000)
})



