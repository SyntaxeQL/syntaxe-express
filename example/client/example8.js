/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, status and lastLogin for each object in the array
- package must not match 'free'
- omit package
- status must match 'inactive'
- For lastLogin
    - Day of week must match 'Monday'
    - Month must be in provided range
    - Year must match 2024
    - [cond:"or"] means at least one of the operations for lastLogin must evaluate to true 
*/

const response = await fetch('http://localhost:8000/users', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
            id
            package? [ne:"free"]
            status [eq:"inactive"]
            lastLogin [dweq:"Monday"] [meq:"June"] [yeq:2024] [cond:"or"]
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
  { id: 36, status: 'inactive', lastLogin: '2022-02-14T06:18:52.965Z' },
  { id: 73, status: 'inactive', lastLogin: '2022-05-09T06:26:50.498Z' },
  { id: 85, status: 'inactive', lastLogin: '2023-09-25T17:05:28.857Z' },
  { id: 90, status: 'inactive', lastLogin: '2022-04-25T20:33:01.655Z' },
  { id: 99, status: 'inactive', lastLogin: '2022-01-31T06:02:58.543Z' }
]
*/