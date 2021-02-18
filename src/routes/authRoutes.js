const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');


router.post('/signup',async (req, res) => {
	const { email, password} = req.body;
	try {
		const user = new User({ email, password });
		await user.save();
		const token = jwt.sign({ userId : user._id}, 'MY_SECRET_KEY');
		res.send(`token : ${token}`);
	}
	catch(err){
		return res.status(422).send(err.message);
	}
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	if(!email || !password)
	{
		res.status(422).send('Please Enter credentials');
	}

	const user = await User.findOne({ email });
	if(!user)
	{
		res.status(422).send('User is not valid');
	}

	try
	{
		user.comparePassword(password);
		const token = jwt.sign({userId : user._id},'MY_SECRET_KEY');
		res.send({token : token});
	}
	catch(err)
	{
		res.status(422).send(`Error : ${err}`);
	}
});

module.exports = router;