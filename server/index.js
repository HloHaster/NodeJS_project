const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postsRoutes = require('./routes/posts')
const categoriesRoutes = require('./routes/categories')
const authorsRoutes = require('./routes/authors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(postsRoutes)
app.use(categoriesRoutes)
app.use(authorsRoutes)

app.get('/', (req, res) => {
    res.send('Homepage')
})

const url = 'mongodb+srv://TanyaHlopenkova:1q2w3e4r@cluster0.nf0tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, (error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log('It is connected')
    app.listen(3000, () => {
        console.log('Server has been started')
    })
})