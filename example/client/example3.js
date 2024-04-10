/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, name, phone_code, capital, currency and region for each object in the array
- name must match any name that begins with 'a' or 'n' (case-insensitive)
- Rename phone_code as code
- region must match at least one entry of the provided array (case-insensitive)
- Rename region as continent
*/

const response = await fetch('http://localhost:8000/countries', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
            id
            name [regex:/^(a|n)/i]
            phone_code [as:"code"]
            capital
            currency
            region [ini:["asia", "africa"]] [as:"continent"]
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
    id: 1,
    name: 'Afghanistan',
    code: '93',
    capital: 'Kabul',
    currency: 'AFN',
    continent: 'Asia'
  },
  {
    id: 4,
    name: 'Algeria',
    code: '213',
    capital: 'Algiers',
    currency: 'DZD',
    continent: 'Africa'
  },
  {
    id: 7,
    name: 'Angola',
    code: '244',
    capital: 'Luanda',
    currency: 'AOA',
    continent: 'Africa'
  },
  {
    id: 12,
    name: 'Armenia',
    code: '374',
    capital: 'Yerevan',
    currency: 'AMD',
    continent: 'Asia'
  },
  {
    id: 16,
    name: 'Azerbaijan',
    code: '994',
    capital: 'Baku',
    currency: 'AZN',
    continent: 'Asia'
  },
  {
    id: 152,
    name: 'Namibia',
    code: '264',
    capital: 'Windhoek',
    currency: 'NAD',
    continent: 'Africa'
  },
  {
    id: 154,
    name: 'Nepal',
    code: '977',
    capital: 'Kathmandu',
    currency: 'NPR',
    continent: 'Asia'
  },
  {
    id: 160,
    name: 'Niger',
    code: '227',
    capital: 'Niamey',
    currency: 'XOF',
    continent: 'Africa'
  },
  {
    id: 161,
    name: 'Nigeria',
    code: '234',
    capital: 'Abuja',
    currency: 'NGN',
    continent: 'Africa'
  },
  {
    id: 115,
    name: 'North Korea',
    code: '850',
    capital: 'Pyongyang',
    currency: 'KPW',
    continent: 'Asia'
  }
]
*/