const button = document.querySelector("#Button");
const input = document.querySelectorAll(".input");
const comment = document.querySelectorAll(".comment");
const pass = document.querySelector("#pass");

let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
let email = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/

button.addEventListener("click", async () => {
    let bool = true;
    for (const key in input) {
        if (input[key].value === "") {
            comment[key].innerHTML = "This field cannot be empty.";
            bool = false;
        } else {
            if (input[key].placeholder == "Enter your username") {
                if (input[key].value.length > 2) {
                    comment[key].innerHTML = ""
                } else {
                    comment[key].innerHTML = "Please enter a real name."
                    bool = false;
                }
            } else if (input[key].placeholder === "Enter your email") {
                if (email.test(input[key].value)) {
                    comment[key].innerHTML = ""
                } else {
                    comment[key].innerHTML = "Please enter a valid email address."
                    bool = false;
                }
            } else if (input[key].placeholder === "Create a password") {
                if (regularExpression.test(input[key].value)) {
                    comment[key].innerHTML = ""
                } else {
                    comment[key].innerHTML = "Use letters (a-z, A-Z) or numbers or special character ."
                    bool = false;
                }
            } else if (input[key].placeholder === "Confirm a password") {
                if (input[key].value === pass.value) {
                    comment[key].innerHTML = ""
                } else {
                    comment[key].innerHTML = "Password mismatch."
                    bool = false;
                }
            }
        }
    }
    if (bool) {
        let result = await fetch("/auth/registration", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: input[0].value,
                email: input[1].value,
                password: pass.value,
                books: []
            })
        })
        parsedResponse = await result.json()
        console.log(result);
        if (result.status === 200) {
            alert(parsedResponse.message)
            window.location.href = `/login.html`
        } else {
            alert(parsedResponse.message)
        }
    }
})

