const express = require('express');
const router = express.Router();
const startFruits = require('../db/fruitSeedData.js')
const Fruit = require('../models/fruit.js')

router.post('/', async (req, res) => {
	const fruit = await Fruit.create(req.body);
	res.send(fruit);
});

// Index
router.get('/', (req, res) => {
	Fruit.find({})
	.then((fruits) => {
		// res.send(fruits);
		res.render("fruits/index.ejs", {fruits});
	})
	
});

// Seed
router.get('/seed', (req, res) => {
	Fruit.deleteMany({})
	.then(() => {
		Fruit.insertMany(startFruits)
		.then((fruits) => {
			console.log(fruits);//show us what we got
			res.redirect('/fruits');
		})
	})
});

// Show
router.get('/:id', async (req, res) => {
	const fruit = await Fruit.findById(req.params.id);
	res.send(fruit);
});

// Delete
router.delete('/:id', async (req, res) => {
	const fruit = await Fruit.findByIdAndDelete(req.params.id);
	res.send({ success: true, fruit });
});

// Update
router.put('/:id', async (req, res) => {
	const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send(fruit);
});

module.exports = router;
