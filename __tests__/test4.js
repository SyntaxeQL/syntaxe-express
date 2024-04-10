test(`Return id, status and package of data where:
    - id is greater than 5 and less than 30
    - status matches the regular expression /under/
    - package is 'pro'
    - For lastLogin
        - Day of week must match the provided range
    To equal [
        {
          id: 20,
          status: 'under review',
          package: 'pro',
          lastLogin: '2021-09-15T02:47:27.784Z'
        }
    ]`, async() => {
    const response = await fetch('http://localhost:8000/users', {
        method: 'GET',
        headers: {
            'Syntaxe-Resolve-Schema':
            btoa(`{
                id [gt:5] [lt:30]
                status [regex:/under/]
                package [eq:"pro"]
                lastLogin [dwinrange:["Tue", "Thur"]]
            }`)
        }
    });
    const result = await response.json();
    expect(result).toEqual([
        {
          id: 20,
          status: 'under review',
          package: 'pro',
          lastLogin: '2021-09-15T02:47:27.784Z'
        }
    ]);
});