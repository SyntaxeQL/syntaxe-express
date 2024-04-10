test(`Return id, name and states of data where:
    - name matches regular expression /^n/i (name that starts with case-insensitive 'n')
    - region matches regular expression /africa/i
    - omit region
    - Return states where:
        - name matches regular expression /^o/i (name that starts with case-insensitive 'o')
    - The size of states that satisfy the condition(s) of its innner operation(s) is greater than 0
    To equal [
        {
          "name": "Namibia",
          "states": [
            {"name": "Ohangwena Region"   },
            {"name": "Omaheke Region"     },
            {"name": "Omusati Region"     },
            {"name": "Oshana Region"      },
            {"name": "Oshikoto Region"    },
            {"name": "Otjozondjupa Region"}
          ]
        },
        {
          "name": "Nigeria",
          "states": [
            {"name": "Ogun"},
            {"name": "Ondo"},
            {"name": "Osun"},
            {"name": "Oyo" }
          ]
        }
    ]`, async() => {
    const response = await fetch('http://localhost:8000/countries-states', {
        method: 'GET',
        headers: {
            'Syntaxe-Resolve-Schema':
            btoa(`{
                id 
                name [regex:/^n/i]
                region? [regex:/africa/i]
                states {
                    name [regex:/^o/i]
                } [sgt:0]
            }`)
        }
    });
    const result = await response.json();
    expect(result).toEqual([
        {
          "name": "Namibia",
          "states": [
            {"name": "Ohangwena Region"   },
            {"name": "Omaheke Region"     },
            {"name": "Omusati Region"     },
            {"name": "Oshana Region"      },
            {"name": "Oshikoto Region"    },
            {"name": "Otjozondjupa Region"}
          ]
        },
        {
          "name": "Nigeria",
          "states": [
            {"name": "Ogun"},
            {"name": "Ondo"},
            {"name": "Osun"},
            {"name": "Oyo" }
          ]
        }
    ]);
});