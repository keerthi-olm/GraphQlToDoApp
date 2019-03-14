const express = require('express')
const Cors= require('cors')
const bodyParser = require('body-parser')
const { Item, Done } = require('./sequelize')
// * * * * *  ^^^ * * * * * * * * * Bring the MODELS  * * * * * * * * * * * * * *

// npm init --> setup
// packages to install -- npm install --save body-parser express mysql2 sequelize
// Add nodemon to 

//mkdir models
//touch ./models/user.js ./models/blog.js ./models/tag.js
//touch sequelize.js 
//touch index.js

//  * * * * * * * * * * * * * * Start express server  * * * * * * * * * * * * * *
const app = express()

app.use(Cors());

app.use(bodyParser.json());

//  * * * * * * * * * * * * * * A P I routes * * * * * * * * * * * * * *
// test in insomia ->post-> json -> {"text":"my item 3","done":true}

// create a item
app.post('/api/items', (req, res) => {
    Item.create(req.body)
        .then(item => res.json(item))
})

// get all item
app.get('/api/items', (req, res) => {
    Item.findAll(
{attributes: ['text','done','id']}
      ).then(items => res.json(items))
})

// get all item
app.post('/api/add_items', (req, res) => {
Item.update({
    text: req.body.text,    
    done: false

}, {
    where: {
        id: req.body.id
    }
})
})

// update  done item
app.post('/api/done_items', (req, res) => {
Item.update({   
    done: req.body.done

}, {
    where: {
        id: req.body.id
    }
}).then(items => res.json(items))
})


// get all done items
app.get('/api/done_items', (req, res) => {
Item.findAll({
  attributes: ['id'],
  where: {
    done: false
      }
    }).then(items => res.json(items))
})



// Delete all done items
app.delete('/api/delete_done_items', (req, res) => {
Item.destroy({
  where: {
    done: 1
      }
    }).then(items => res.json(items))
})

// Delete all items
app.delete('/api/delete_items', (req, res) => {
Item.destroy( {
  where: {},
  truncate: true
}).then(items => res.json(items))
})


//Listen to port
const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

