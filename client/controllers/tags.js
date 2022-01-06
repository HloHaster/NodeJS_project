const http = require('http')

module.exports = {
    find: async function (req, res) {
        try {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/tags',
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let tags = JSON.parse(d)
                    const haveTags = !!tags.length;
                    res.render('index', {haveTags, tags, title: "Tags"})
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
                path: `/tags/${id}`,
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    if (serverResponse.statusCode >= 400 && serverResponse.statusCode <= 599) {
                        let error = JSON.parse(d)
                        res.render('error', {error: error.errorMessage, title: "Error"})
                        return
                    }
                    let tag = JSON.parse(d)
                    const haveTag = !!tag;
                    res.render('postPage', {haveTag, tag, title: `Tag ${id}`})
                })
            })
            serverRequest.end();
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', errorMessage: "Unexpected error occurred on the server"})
        }
    }
}