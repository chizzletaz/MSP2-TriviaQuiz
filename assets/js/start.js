window.onload = checkToken();

function getToken() {
    fetch('https://opentdb.com/api_token.php?command=request')
        .then(response => {
            return response.json();
        })
        .then(newToken => {
            token = newToken.token;
            object = { token: token, timestamp: new Date().getTime() }   //Credit:dotspencer @ https://gist.github.com/dotspencer/a99e004a31cbd93fa8f7828bece58708
            localStorage.setItem("key", JSON.stringify(object));
        });
};
//Credit:dotspencer @ https://gist.github.com/dotspencer/a99e004a31cbd93fa8f7828bece58708
function checkToken() {
    var object = JSON.parse(localStorage.getItem("key"));
    if (!object) {
        getToken();
    }
    else if (object) {
        dateString = object.timestamp,
            now = new Date().getTime().toString();

        if (now - dateString >= 21600000) {
            getToken();
        }
        else {
            console.log("Token is still valid");
        };
    };
};