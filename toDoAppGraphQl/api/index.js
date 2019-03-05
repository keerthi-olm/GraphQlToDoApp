const express = require('express')
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
app.use(bodyParser.json())
