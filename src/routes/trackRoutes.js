const express = require('express');
const mongoose = require('mongoose');
const Track = mongoose.model('Track');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
	const track = await Track.find({ userId : req.user._id });
	res.send(track);
});

router.post('/tracks', async (req, res) => {
	const { name, locations } = req.body;

	if(!name || !locations)
	{
		res.status(422).send('invalid request');
	}

	try
	{
		const track = new Track({ name, locations, userId : req.user._id });
		await track.save();
		res.send(track);
	}
	catch(err)
	{
		res.status(422).send(err.message);
	}
});
module.exports = router;