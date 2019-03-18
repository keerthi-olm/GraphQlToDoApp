const Sequelize = require('sequelize')
const ItemModel = require('./models/item')


// * * * * * * * * * * * * * * * Connect to db * * * * * * * * * * * * * *
const sequelize = new Sequelize('to_do', 'wp', 'todo', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


//* * * * * * * * * * * * * *  Data modeling ie set up relationships etc * * * * * * * * * * * * * *
const Item = ItemModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const ItemDone = sequelize.define('blog_tag', {})
// const Blog = BlogModel(sequelize, Sequelize)
// const Done = DoneModel(sequelize, Sequelize)

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
// Blog.belongsTo(User);

//* * * * * * * * * * * * Initilise  DB by dropping and creating new tables * * * * * * * * * * * * * * * *
// Force will force the tables to be dropped an created again
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

// * * * * * * * * * * * * * * Export models so other pasrtsc can use * * * * * * * * * * * * * *
module.exports = {
  Item
}
