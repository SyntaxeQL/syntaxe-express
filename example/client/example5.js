/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return name and states for each object in the array
- region must match 'europe' (case-insensitive)
- omit region
- For states
    - Return id and name
    - Return the first 2 entries of the array
    - states is only valid if it has a size greater than 0 (which determines if its surrounding object is returned or not unless you apply [cond:"or"])
- Return the first 5 entries of the resulting array
*/

const response = await fetch('http://localhost:8000/countries-states', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
            name
            region? [eqi:"europe"]
            states {
                id
                name
            } [first:2] [sgt:0]
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
  {
    "name": "Albania",
    "states": [
      {"id": 603, "name": "Berat County"},
      {"id": 629, "name": "Berat District"}
    ]
  },
  {
    "name": "Andorra",
    "states": [
      {"id": 488, "name": "Andorra la Vella"},
      {"id": 489, "name": "Canillo"}
    ]
  },
  {
    "name": "Austria",
    "states": [
      {"id": 2062, "name": "Burgenland"},
      {"id": 2057, "name": "Carinthia" }
    ]
  },
  {
    "name": "Belarus",
    "states": [
      {"id": 2959, "name": "Brest Region"},
      {"id": 2955, "name": "Gomel Region"}
    ]
  },
  {
    "name": "Belgium",
    "states": [
      {"id": 1381, "name": "Antwerp"},
      {"id": 1376, "name": "Brussels-Capital Region"}
    ]
  }
]
*/