const button = document.querySelector("#Button")
const comment = document.querySelector("#comment")

button.addEventListener("click", async (event) => {
    event.preventDefault();
    const mail = document.querySelector("#Email");
    const password = document.querySelector("#Password");
    let result = await fetch("/auth/login", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email: mail.value,
            password: password.value
        })
    })
    parsedResponse = await result.json()
    if (result.status == 200) {
        window.location.href = `/acaunt.html`
    } else {
        comment.innerHTML = "xfcgvhjbkhvgc"
        alert(parsedResponse.message)
    }
})

