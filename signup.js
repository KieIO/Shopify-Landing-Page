function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}   

async function onSubmitFormSignUp(idInput, idBtn, idMsg) {
    console.log(idInput, idBtn)
    const element = document.getElementById(idInput)
    const elementMsg = document.getElementById(idMsg);
    const elementBtn = document.getElementById(idBtn)
    console.log(elementMsg)
    if (element) {
        elementBtn.disabled = true;
        const email = element.value
        elementMsg.classList.remove("msg-subscribe", "msg-subscribe--danger", "msg-subscribe--success")

        if (validateEmail(email)) {
            try {
                await onSignUp({email})
                elementMsg.classList.add("msg-subscribe", "msg-subscribe--success")
                elementMsg.innerText = "Successfully! Thanks for your supscription"
            } catch (err) {
                elementMsg.classList.add("msg-subscribe", "msg-subscribe--danger")
                elementMsg.innerText = "Something went wrong, please try later"
            }
        } else {
            elementMsg.classList.add("msg-subscribe", "msg-subscribe--danger")
            console.log("invalid: ", email)
            if (!email) {
                elementMsg.innerText = "Email is required"
            } else {
                elementMsg.innerText= "Invalid email"
            } 
        }
        setTimeout(()=>{
            elementBtn.disabled = false;
        }, 2000)
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

