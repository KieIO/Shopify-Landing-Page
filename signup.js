const { API_SIGN_UP } = require("./constant");

async function onSubmitFormTop() {
    const email = document.getElementById('email-top')
    if (email) {
        console.log("email: ", email)
    }

}

const onSignUp = async (values) => {
    return fetch(API_SIGN_UP, {
        method: "POST",
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
            // status = response.status;
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            throw err;
        })
}

