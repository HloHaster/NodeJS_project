const http = require('http')

module.exports = {
    find: async function (req, res) {
        try {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/categories',
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let categories = JSON.parse(d)
                    const haveCategories = !!categories.length;
                    res.render('categories', {haveCategories, categories, title: "Categories"})
                })
            })

            serverRequest.end();
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', errorMessage: "Unexpected error occurred on the server"})
        }
    },

    findOne: async function (req, res) {
        try {
            const {id} = req.params;
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: `/categories/${id}`,
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let category = JSON.parse(d)
                    const haveCategory = !!category;
                    res.render('categoryPage', {haveCategory, category, title: `category ${id}`})
                })
            })
            serverRequest.end();
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', errorMessage: "Unexpected error occurred on the server"})
        }
    }
}