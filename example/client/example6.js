/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return name and states for each object in the array
- name must match 'nigeria' (case-insensitive)
- For states
    - Return id, name and cities
    - name must match at least one entry of the provided array
    - For cities
        - Return name
    - states is only valid if it has a size greater than 0 (which determines if its surrounding object is returned or not unless you apply [cond:"or"])
*/

const response = await fetch('http://localhost:8000/countries-states-cities', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(`{
            name [eqi:"nigeria"]
            states {
                id
                name [ini:["lagos", "oyo", "ondo"]]
                cities {
                    name
                }
            } [sgt:0]
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
    "name": "Nigeria",
    "states": [
      {
        "id": 306,
        "name": "Lagos",
        "cities": [
          {"name": "Apapa"        },
          {"name": "Badagry"      },
          {"name": "Ebute Ikorodu"},
          {"name": "Ejirin"       },
          {"name": "Epe"          },
          {"name": "Ikeja"        },
          {"name": "Lagos"        },
          {"name": "Makoko"       }
        ]
      },
      {
        "id": 321,
        "name": "Ondo",
        "cities": [
          {"name": "Agbabu"},
          {"name": "Akure" },
          {"name": "Idanre"},
          {"name": "Ifon"  },
          {"name": "Ilare" },
          {"name": "Ode"   },
          {"name": "Ondo"  },
          {"name": "Ore"   },
          {"name": "Owo"   }
        ]
      },
      {
        "id": 296,
        "name": "Oyo",
        "cities": [
          {"name": "Ago Are"    },
          {"name": "Alapa"      },
          {"name": "Fiditi"     },
          {"name": "Ibadan"     },
          {"name": "Igbeti"     },
          {"name": "Igbo-Ora"   },
          {"name": "Igboho"     },
          {"name": "Kisi"       },
          {"name": "Lalupon"    },
          {"name": "Ogbomoso"   },
          {"name": "Okeho"      },
          {"name": "Orita Eruwa"},
          {"name": "Oyo"        },
          {"name": "Saki"       }
        ]
      }
    ]
  }
]
*/