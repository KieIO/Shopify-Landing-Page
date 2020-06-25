function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}   

async function onSubmitFormTop() {
    const element = document.getElementById('email-top')
    const elementMsg = document.getElementById('banner__msg-subscribe');
    if (element) {
        const email = element.value
        
        if (validateEmail(email)) {
            console.log("valid: ", email)
            try {
                const result = await onSignUp({email})
                console.log("success: ", result)
                elementMsg.classList.add("banner__msg-subscribe", "banner__msg-subscribe--success")
                elementMsg.innerText = "Successfully! Thanks for your supscription"
            } catch {
                elementMsg.classList.add("banner__msg-subscribe", "banner__msg-subscribe--danger")
                elementMsg.innerText = "Something went wrong, please try later"
            }


        } else {
            elementMsg.classList.add("banner__msg-subscribe", "banner__msg-subscribe--danger")
            console.log("invalid: ", email)
            if (!email) {
                elementMsg.innerText = "Email is required"
            } else {
                elementMsg.innerText= "Invalid email"
            }
            
        }
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

