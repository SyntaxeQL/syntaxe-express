import express from 'express';

import appUsers from '../../data/app-users.js';
import githubUsers from '../../data/github-users.js';
import countries from '../../data/countries.js';
import countriesStates from '../../data/countries-states.js';
import countriesStatesCities from '../../data/countries-states-cities.js';

import SyntaxeIO from '../../dist/index.min.js';

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