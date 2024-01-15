async function getBookByIsbn(isbn) {
    let response = await fetch(`/books/${isbn}`);
    let parsedResponse = await response.json();
    if (response.status == 200) {
        return parsedResponse.book;
    }
    return alert(parsedResponse.message);
}

let hrefs = window.location.href.split("/");
let isbn = hrefs[hrefs.length - 1];
let book = await getBookByIsbn(isbn);


async function displayCurrentBookInfo() {
    document.getElementById("title").innerHTML = book.title;
    document.getElementById("author").innerHTML = book.authors;
}


displayCurrentBookInfo();




let updateUserBooks = async function (user) {
    let result = await fetch("/auth/change/user", {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "user" : user
        })
    })
}

let updateBookAvailability = async function (book) {
    let result = await fetch("/books/change/book/availability", {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "book" : book
        })
    })
}



let borrow = document.getElementById("Borrow")

if (book.availability === true) {
    borrow.addEventListener("click", async () => {
        let login = await fetch("/auth/authChek")
        if (login.status == 200) {
            let user = await login.json();
            user.books.push(book);
            borrow.innerHTML = "chka"
            await updateUserBooks(user)
            await updateBookAvailability(book)
        } else {
            alert("no login")
        }
    }) 
} else {
    borrow.innerHTML = "chka"
}