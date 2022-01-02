const express = require('express')
const bodyParser = require('body-parser');
const postsController = require('../controllers/posts');


const router = express.Router()
router.use(bodyParser.json());

router.post('/posts', postsController.create);

module.exports = router