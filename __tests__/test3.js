test(`Return id and name of data where:
    - name matches the regular expression /^n/i (name that starts with case-insensitive 'n')
    - region matches regular expression /africa/i
    - omit region
    - Return last 5 entries of the resulting array
    To equal [
        { id: 152, name: 'Namibia' },
        { id: 160, name: 'Niger' },
        { id: 161, name: 'Nigeria' }
    ]`, async() => {
    const response = await fetch('http://localhost:8000/countries', {
        method: 'GET',
        headers: {
            'Syntaxe-Resolve-Schema':
            btoa(`{
                id 
                name [regex:/^n/i]
                region? [regex:/africa/i]
            } [last:5]`)
        }
    });
    const result = await response.json();
    expect(result).toEqual([
        { id: 152, name: 'Namibia' },
        { id: 160, name: 'Niger' },
        { id: 161, name: 'Nigeria' }
    ]);
});