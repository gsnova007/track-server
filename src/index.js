require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');
const trackRoutes = require('./routes/trackRoutes');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = 'mongodb+srv://user:passwordd@cluster0.rj15b.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoURI,{
	useNewUrlParser: true,
	useCreateIndex:true
});

mongoose.connection.on('connected',() => {
	console.log('Connected Successfully');
});

mongoose.connection.on('error',(err) => {
	console.error('errors occuered', err);
});

app.get('/', requireAuth, (req, res) => {
	res.send(`Your Email is : ${req.user.email}`);
});

app.listen(3000,() => {
	console.log('listening on port 3000');
});