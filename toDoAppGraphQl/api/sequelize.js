const Sequelize = require('sequelize')
const ItemModel = require('./models/item')


// * * * Connect to db * * * * * * * * * * * * * *
const sequelize = new Sequelize('to_do', 'testuser', 'test', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


//* *  Data modeling ie set up models relationships etc  **
const Item = ItemModel(sequelize, Sequelize)


//*** Populate tables with some initial data  **//
sequelize.sync({ force: true})
  .then(() => {
      Item.create({
    text: 'Wake up'
  });
  Item.create({
    text: 'Brush teeth'
  });
    console.log(`Database & tables created!`)
  })

// * * * Export models so other parts can use * * * * *
module.exports = {
  Item
}
