const express = require('express')

const app = express()
const api = require('./api')
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.set('port', process.env.PORT || 8081)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use('/api', api)
app.use(express.static('static'))


app.use(morgan('dev'))

app.use(function(req, res, next){
    const err = new Error('Not Found')
    err.status = 404
    res.json(err)
    
})

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/client')
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: Failed to connect to mongodb'))
db.once('open', function()
{
    console.log('Connected to mongoDB')
    app.listen(app.get('port'), function(){
        console.log('API SERVER listening on port ' + app.get('port'))
    })
})