let seeMore = document.getElementById("seeMore");
async function getBooks() {
  let response = await fetch("/books/getBooks");
  let parsedResponse =  await response.json();
  return parsedResponse.books;
}


let books = await getBooks();


function createProducts(books) {
    let bookPreview = document.querySelector("#booksin");
    bookPreview.innerHTML = "";
    let load = 0;

    return function (productCount = books.length) {
        let booksSlice = books.slice(load, load + productCount);
        let elements = booksSlice.map(book => {
            let item = document.createElement("div");
            let picture = document.createElement("div");
            let info = document.createElement("div");
            item.className = "item";
            picture.className = "picture";
            info.className = "info";
            let title = document.createElement("h3");
            let author = document.createElement("p");
            title.innerHTML = book.title;
            picture.innerHTML = '<img src="/img/1.jpg">'

            // author.innerHTML = book.authors.join(", ");
            author.innerHTML = book.authors;

            item.append(picture, info);
            info.append(title, author);
            item.addEventListener("click", function () {
                window.location.href = `/books/book_details/${book.isbn}`;
            });
            ++load
            return item;
        });

        bookPreview.append(...elements, seeMore);
        if (books.length == load) {
            seeMore.style.display = "none";
        } 
    };
}

let loadProduct = createProducts(books);
loadProduct(6);

function addBooksContent() {
    loadProduct(3);
}

// let seeMore = document.getElementById("seeMore");
seeMore.addEventListener("click", addBooksContent);

let resetFilter = document.getElementById('reset');
resetFilter.addEventListener("click", function() {
    window.location.reload();
})




let filteredArr = [];
let filters = document.querySelectorAll(".filter");


filters.forEach((elem) => {
    elem.addEventListener("click", function(event) {
        event.preventDefault();
        let genre = elem.getAttribute("href")
        if (genre === "allBooks" ) {
            filteredArr = books;
        } else {
            filteredArr = books.filter((book) => {
                if(book.category.includes(genre)) {
                    return true;
                }
            });
        }
        createProducts(filteredArr)();
    })
})



let input = document.getElementById("search");
input.oninput = function() {
setTimeout(() => {
let title = input.value;
let requiredBooks = books.filter((book) => {
if (book.title.toLowerCase().startsWith(title.toLowerCase())) {
return true;
}

if(book.title.toLowerCase().split(" ").includes(title.toLowerCase())) {
return true
}
})
createProducts(requiredBooks)();
}, 2000);
}



// async function getBooks() {
//   let response = await fetch("/books/getBooks");
//   let parsedResponse =  await response.json();
//   return parsedResponse.books;
// }


// let books = await getBooks();


// function createProducts(books) {
//     let loadedContect = 0;
//     let bookPreview = document.querySelector("#booksin");
//     bookPreview.innerHTML = "";

//     return function (productCount = books.length) {
//         let booksSlice = books.slice(loadedContect, loadedContect + productCount);
//         let elements = booksSlice.map(book => {
//             let item = document.createElement("div");
//             let picture = document.createElement("div");
//             let info = document.createElement("div");
//             item.className = "item";
//             picture.className = "picture";
//             info.className = "info";
//             let title = document.createElement("h3");
//             let author = document.createElement("p");
//             title.innerHTML = book.title;
//             picture.innerHTML = '<img src="/img/1.jpg">'


//             item.append(picture, info);
//             info.append(title, author);
//             item.addEventListener("click", function () {
//                 window.location.href = `/books/book_details/${book.isbn}`;
//             });
//             ++loadedContect;
//             return item;
//         });

//         let seeMore = document.getElementById("seeMore");
//         bookPreview.append(...elements, seeMore);
//         if (loadedContect == books.length) {
//             seeMore.style.display = "none";
//         }
//     };
// }

// let loadProduct = createProducts(books);
// loadProduct(6);

// function addBooksContent() {
//     loadProduct(3);
// }


// let seeMore = document.getElementById("seeMore");
// seeMore.addEventListener("click", addBooksContent);


// let resetFilter = document.getElementById('reset');
// resetFilter.addEventListener("click", function() {
//     window.location.reload();
// })



// let filteredArr = [];
// let filters = document.querySelectorAll(".filter");


// filters.forEach((elem) => {
//     elem.addEventListener("click", function(event) {
//         event.preventDefault();
//         let genre = elem.getAttribute("href")
//         if (genre === "allBooks" ) {
//             filteredArr = books;
//         } 
//         else {
//             filteredArr = books.filter((book) => {
//                 if(book.category.includes(genre)) {
//                     return true;
//                 }
//             });
//         }
//     createProducts(filteredArr)();
//     })
// })



// let input = document.getElementById("search");
// input.oninput = function() {
//     setTimeout(() => {
//         let title = input.value;
//         let requiredBooks = books.filter((book) => {
//             if (book.title.toLowerCase().startsWith(title.toLowerCase())) {
//                 return true;
//             }

//             if(book.title.toLowerCase().split(" ").includes(title.toLowerCase())) {
//                 return true
//             }
//         })
//         createProducts(requiredBooks)();
//     }, 2000);
// }