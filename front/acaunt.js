const ul = document.querySelector("#ul");
let button = document.createElement("button");


async function a () {
    let result = await fetch("/auth/authChek")
    if (result.status === 200) {
        button.className = "button";
        button.innerHTML = "Log Out"
        ul.append(button)
    } else {
        let li = document.createElement("li")
        ul.append(li)
        li.innerHTML = `<a href="login.html">Login</a>`
    }
}
a()

async function getUserInfo() {
    let result = await fetch("/auth/checkAuth");
    let parsedResponse = await result.json();
    if (result.status == 200) {
        return parsedResponse.user;
    }
    return null;
}

button.addEventListener("click", () => {
    let res = fetch("/auth/logout");
    let li = document.createElement("li")
    ul.append(li)
    button.remove()
    li.innerHTML = `<a href="login.html">Login</a>`
})

