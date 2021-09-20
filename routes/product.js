const { Router } = require('express');
const { getItem, getItems } = require('../controllers/products.controller')
const router = Router();




router.get('', getItems);
router.get('/:id', getItem);
module.exports = router;