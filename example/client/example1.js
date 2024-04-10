/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id and fullName for each object in the array
- Rename fullName as name
- package must not match 'free'
- omit package
- Return the first 5 entries of the resulting array
*/

const response = await fetch('http://localhost:8000/users', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
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