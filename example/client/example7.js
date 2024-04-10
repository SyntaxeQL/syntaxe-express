/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, fullName and lastLogin for each object in the array
- Rename fullName as name
- package must not match 'free'
- omit package
- For lastLogin
    - Day of week must match 'Monday'
    - Month must be in provided range
    - Year must match 2024
*/

const response = await fetch('http://localhost:8000/users', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
            id
            fullName [as:"name"]
            package? [ne:"free"]
            lastLogin [dweq:"Monday"] [min:["Jan", "Jun"]] [yeq:2024]
        }`)
    }
});
const result = await response.json();

/*
Response Headers:
Syntaxe-Enabled: true
Syntaxe-Schema-Resolved: true

Response Data:
[
  { id: 74, name: 'Person 74', lastLogin: '2024-01-29T18:34:15.099Z' }
]
*/