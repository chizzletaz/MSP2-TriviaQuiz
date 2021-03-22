fetch('https://opentdb.com/api_token.php?command=request')
    .then( response => {
       return response.json();
    })
    .then (newToken => {
        token = newToken.token;
        localStorage.setItem('Token', token);
    });