

function moveLastPropertyToBeginning(carousel) {
  const books = carousel.querySelectorAll('.carouselBook');
  const lastBook = books[books.length - 1];
  const parent = lastBook.parentNode;

  parent.removeChild(lastBook);
  parent.insertBefore(lastBook, parent.firstChild);
}

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const myCarousel = document.getElementById('myCarousel');

nextButton.addEventListener('click', () => {
  moveLastPropertyToBeginning(myCarousel);
});

prevButton.addEventListener('click', () => {
  const firstBook = myCarousel.querySelector('.carouselBook');
  const parent = firstBook.parentNode;

  parent.removeChild(firstBook);
  parent.appendChild(firstBook);
});


async function getBooks() {
  let response = await fetch("/books/getBooks");
  let parsedResponse =  await response.json();
  return parsedResponse.books;
}



function createProducts(books) {
    return function () {
      let x = Math.floor(Math.random() * (books.length - 4))
        let bookPreview = document.querySelector(".Books");
        let booksSlice = books.slice(x, x + 3);
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
            return item;
          });
          bookPreview.append(...elements);
    };
}
let books = await getBooks();
let loadProduct = createProducts(books);
loadProduct();

function addBooksContent() {
    loadProduct();
}
let viewAll = document.getElementById("viewAll");
viewAll.addEventListener("click", function () {
    window.location.href = `/catalog.html`;
});