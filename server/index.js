const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const mongodb = require('mongodb')

const postsRoutes = require('./routes/posts')
const categoriesRoutes = require('./routes/categories')
const authorsRoutes = require('./routes/authors')
const tagsRoutes = require('./routes/tags')

const app = express()
const hbs = exphbs.create({
    layoutsDir: "../client/views/layouts",
    partialsDir: "../client/views/partials",
    defaultLayout: 'main',
    extname: 'hbs'
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', '../client/views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(postsRoutes)
app.use(categoriesRoutes)
app.use(authorsRoutes)
app.use(tagsRoutes)

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