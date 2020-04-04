const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const notes = require('./models').Notes;

const app = express();

/////////******** EXTERNAL POST AND GET REQUESTS ***//////////////
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods:POST');
	res.header('Access-Control-Allow-Headers:Origin, Methods, Content-Type');

	next();
});

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');

//////////////////***************GET ROUTE ***********///////////////////////


app.get('/view', (req, res) => {
	notes
		.findAll({
			where: { ref: req.query.id }
		})
		.then(data => {
			const notesArray = data.map(data => {
				const slicedDate = `${new Date(data.createdAt).getDate()}-${new Date(
					data.createdAt
				).getMonth()}-${new Date(data.createdAt).getFullYear()}`;

				const slicedDate2 = data.createdAt.toString();
				const date = slicedDate2.slice(0, 16);
				return {
					name: data.name,
					ref: data.ref,
					content: data.body,
					date: date,
				};
			});

			res.render('index', { notes: notesArray });
		});
});

app.get('/review', (req, res) => {
	notes
		.findAll({
			where: { ref: req.query.id }
		})
		.then(data => {
			const notesArray = data.map(data => {
				const slicedDate = `${new Date(data.createdAt).getDate()}-${new Date(
					data.createdAt
				).getMonth()}-${new Date(data.createdAt).getFullYear()}`;

				const slicedDate2 = data.createdAt.toString();
				const date = slicedDate2.slice(0, 16);
				return {
					name: data.name,
					ref: data.ref,
					content: data.body,
					date: date,
				};
			});

			res.render('review', { notes: notesArray });
		});
});
//////////////////***************POST ROUTE ***********///////////////////////

app.post('/add', (req, res) => {
	notes
		.create({
			ref: req.body.id,
			name: req.body.name,
			body: req.body.content
		})
		.then(() => {
			res.send('DATA ADDED SUCCESSFULLY');
		})
		.catch(ERR => {
			res.send(ERR);
		});
});

//////////////////***************UPDATE ROUTE ***********///////////////////////

app.post('/update', (req, res) => {
	notes
		.update({ body: req.body.content }, { where: { ref: req.body.id } })
		.then(function(rowsUpdated) {
			res.json(rowsUpdated);
		})
		.catch(function(error) {
			res.json(error);
		});
});

app.listen(5000, () => console.log('Listening on port 5000'));
