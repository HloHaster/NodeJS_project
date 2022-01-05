const http = require('http')


module.exports = {
    find: async function (req, res) {
        try {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/posts',
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    let posts = JSON.parse(d)
                    const havePosts = !!posts.length;
                    res.render('index', {havePosts, posts, title: "Home"})
                })
            })

            // serverRequest.on('error', err => {
            //     // res.render('error.hbs', {title: `error ${serverResponse.statusCode}`, message: `${serverResponse.statusMessage}`})
            //     console.log(`Got error: ${err.message}`)
            // })

            serverRequest.end();
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', message: "Unexpected error occurred on the server"})
        }
    },

    findOne: function (req, res) {
        try {
            const {id} = req.params;
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: `/posts/${id}`,
                method: 'GET'
            }
            const serverRequest = http.request(options, serverResponse => {
                serverResponse.on('data', d => {
                    let post = JSON.parse(d)
                    const havePost = !!post;
                    res.render('postPage', {havePost, post, title: `Post ${id}`})
                })
                // serverResponse.on('error', err => {
                //     res.render('error.hbs', {title: `error ${serverResponse.statusCode}`, message: `${serverResponse.statusMessage}`})
                // })
            })
            serverRequest.end();
        } catch (e) {
            res.status(500)
            res.render('error.hbs', {title: 'error 500', message: "Unexpected error occurred on the server"})
        }
    },
}