const express = require('express');

const appUsers = require('../../../data/app-users.js');
const githubUsers = require('../../../data/github-users.js');
const countries = require('../../../data/countries.js');
const countriesStates = require('../../../data/countries-states.js');
const countriesStatesCities = require('../../../data/countries-states-cities.js');

const { SyntaxeIO } = require('../../../dist/cjs/index.js');

const app = express();

////////////////////////////
// Add syntaxe middleware //
////////////////////////////
SyntaxeIO.init({
	enabled: true,
	app: app
});

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'This is a syntaxe-enabled express.js application.'
	});
});

app.get('/users', (req, res) => {
	res.status(200).json(appUsers);
});

app.get('/users-github', (req, res) => {
	res.status(200).json(githubUsers);
});

app.get('/countries', (req, res) => {
	res.status(200).json(countries);
});

app.get('/countries-states', (req, res) => {
	res.status(200).json(countriesStates);
});

app.get('/countries-states-cities', (req, res) => {
	res.status(200).json(countriesStatesCities);
});

const port = 8000;

app.listen(port, () => console.log(`Express app listening on port 8000.`));