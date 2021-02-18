const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if(!authorization)
	{
		res.status(401).send('you must login first');
	}
	else
	{
		const token = authorization.replace('Bearer ', '');
		jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
			if(err)
			{
				res.status(401).send('Credentials are invalid check again');
			}
			else
			{
				const { userId } = payload;
				const user = await User.findById(userId);
				req.user = user;
				next();
			}
		});
	}
}