/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, login, avatar_url and type for each object in the array
- Rename login as username
- Rename avatar_url as photoUrl
- type must not match 'user' (case-insensitive) 
*/

const response = await fetch('http://localhost:8000/users-github', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
            id
            login [as:"username"]
            avatar_url [as:"photoUrl"]
            type [nei:"user"]
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
  {
    id: 44,
    username: 'errfree',
    photoUrl: 'https://avatars.githubusercontent.com/u/44?v=4',
    type: 'Organization'
  }
]
*/