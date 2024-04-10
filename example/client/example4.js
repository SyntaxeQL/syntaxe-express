/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, name, phone_code and currency_symbol for each object in the array
- Rename phone_code as code
- code [phone_code] must be greater than 230 and less than 250
- Return the last 10 entries of the resulting array
*/

const response = await fetch('http://localhost:8000/countries', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
            id
            name
            phone_code [as:"code"] [gt:230] [lt:250]
            currency_symbol
        } [last:10]`)
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
    id: 67,
    name: 'Equatorial Guinea',
    code: '240',
    currency_symbol: 'FCFA'
  },
  { id: 79, name: 'Gabon', code: '241', currency_symbol: 'FCFA' },
  { id: 83, name: 'Ghana', code: '233', currency_symbol: 'GH₵' },
  {
    id: 93,
    name: 'Guinea-Bissau',
    code: '245',
    currency_symbol: 'CFA'
  },
  { id: 123, name: 'Liberia', code: '231', currency_symbol: '$' },
  { id: 161, name: 'Nigeria', code: '234', currency_symbol: '₦' },
  {
    id: 193,
    name: 'Sao Tome and Principe',
    code: '239',
    currency_symbol: 'Db'
  },
  { id: 197, name: 'Seychelles', code: '248', currency_symbol: 'SRe' },
  { id: 198, name: 'Sierra Leone', code: '232', currency_symbol: 'Le' },
  { id: 209, name: 'Sudan', code: '249', currency_symbol: '.س.ج' }
]
*/