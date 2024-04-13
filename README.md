<img src="assets/logo.svg" width="180px"/>
<br/>
Syntaxe middleware for Express.js
<br/>
<br/>

[![MIT licensed](https://img.shields.io/badge/license-MIT-0091F7)](./LICENSE)
![NPM Version](https://img.shields.io/badge/npm-v1.1.0-D50100)
![Top Language](https://img.shields.io/badge/javascript-100%25-F0DC4E)

<br/>

_Syntaxe is a declarative data querying library inspired by graphql._

[PLEASE REFER TO THE ORIGINAL SYNTAXE DOCUMENTATION FOR A MORE DETAILED COVERAGE OF THE SYNTAXE SCHEMA AND ITS OPERATORS.](https://github.com/lolu-sholar/syntaxe/blob/master/README.md)

Syntaxe Express is a middleware built on the original syntaxe engine to support declarative data fetching and querying when building server-side applications using express.js.

# Installation

## Setup

```bash
npm install syntaxe-express
```

# Example

### Server

```js
import express from 'express';
import SyntaxeIO from 'syntaxe-express';

import appUsers from './data/app-users.js';

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

const port = 8000;

app.listen(port, () =>
  console.log(`Express app listening on port 8000.`));

```

### Client

```js
const response = await fetch('http://127.0.0.1:8000/users', {
  method: 'GET',
  headers: {
    'Syntaxe-Resolve-Schema': btoa(`{
      id
      fullName [as:"name"]
      package? [ne:"free"]
    } [first:5]`)
  }
});
const result = await response.json();

/*
Response Headers:
Syntaxe-Enabled: true
Syntaxe-Schema-Resolved: true

Response Data:
[
  { id: 3, name: 'Person 3' },
  { id: 4, name: 'Person 4' },
  { id: 6, name: 'Person 6' },
  { id: 8, name: 'Person 8' },
  { id: 10, name: 'Person 10' }
]
*/
```

# Usage

## Availability

The first thing to look out for when communicating with a Syntaxe-enabled server application is the availability header `Syntaxe-Enabled`, which indicates whether Syntaxe is enabled for the application and ready to process queries sent from the client or not.

The Syntaxe middleware always returns the availability header `Syntaxe-Enabled` once hooked to your express application.

The value of the header is the value set to the `enabled` config property.

## Request

When making a query request from a client, there are two important commandments to note 😃:
- You shall include the header that holds your query schema - `Syntaxe-Resolve-Schema`.
- You shall convert your query schema to a base64 string, which should be the value of the header.

## Response

When a Syntaxe-enabled server returns a response, it returns one or two additional headers. The number of headers returned is based on the status of the query operation.

- When the query is successful, the additional header returned is `Syntaxe-Schema-Resolved` which has the value `true`.
- When the query fails, the two additional headers returned are `Syntaxe-Schema-Resolved` which has the value `false`, and also `Syntaxe-Schema-Resolved-Error` which contains some information on why the query failed.

# Support and Feedback

If you find any bugs or inconsistency, please submit an issue here in GitHub.

If you have any issues using the library, please contact me by email [lolu.sholar@gmail.com](mailto:lolu.sholar@gmail.com) with the subject 'Problem Using Syntaxe-Express'.

You are welcome to contribute or participate in making the library better.

_NOTE: Development of this library in various technologies, such as PHP, C#, Java, Python, and others, is currently ongoing, with support for both standalone and REST API usage._

# License

[The MIT License (MIT)](LICENSE)