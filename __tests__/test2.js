test(`Return id and name of data where:
    - region matches regular expression /asia/i
    - omit region
    - Return first 5 entries of the resulting array
    To equal [
        { id: 1, name: 'Afghanistan' },
        { id: 12, name: 'Armenia' },
        { id: 16, name: 'Azerbaijan' },
        { id: 18, name: 'Bahrain' },
        { id: 19, name: 'Bangladesh' }
    ]`, async() => {
    const response = await fetch('http://localhost:8000/countries', {
        method: 'GET',
        headers: {
            'Syntaxe-Resolve-Schema':
            btoa(`{
                id 
                name
                region? [regex:/asia/i]
            } [first:5]`)
        }
    });
    const result = await response.json();
    expect(result).toEqual([
        { id: 1, name: 'Afghanistan' },
        { id: 12, name: 'Armenia' },
        { id: 16, name: 'Azerbaijan' },
        { id: 18, name: 'Bahrain' },
        { id: 19, name: 'Bangladesh' }
    ]);
});