let myLibrary = [];



const booksFromStorage = JSON.parse(localStorage.getItem('books'));
if (booksFromStorage === null){
  myLibrary =[];
} else {
myLibrary = booksFromStorage;
}

let addABook = document.getElementById('addABook');
let submitButton = document.getElementById('submit');

let library = document.getElementById('library');

refreshLibrary();


function Book(title, author, genre, pages, read) {
  this.title = title
  this.author = author
  this.genre = genre
  this.pages = pages
  this.read = read 
}

function addBookToMyLibrary() {
  let newTitle = document.getElementById('title').value
  let newAuthor = document.getElementById('author').value
  let newGenre = document.getElementById('genre').value
  let newPages = document.getElementById('pages').value
  let newRead = document.getElementById('read').value
  let submit = document.getElementById('submit')
  let book = new Book(newTitle, newAuthor, newGenre, newPages, newRead);
  myLibrary.push(book);
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function refreshLibrary() {
  for (i = 0; i < myLibrary.length; i++) {
    let libraryBook = document.createElement('div');
    libraryBook.classList.add('libraryBook');
    
    let bookTitle = document.createElement('p');
    bookTitle.classList.add('bookTitle');
    bookTitle.textContent = myLibrary[i].title;
    libraryBook.appendChild(bookTitle);

    let bookAuthor = document.createElement('p');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.textContent = `by ${myLibrary[i].author}`;
    libraryBook.appendChild(bookAuthor);

    let remove = document.createElement('p');
    remove.textContent = 'remove';
    remove.classList.add('remove');
    libraryBook.appendChild(remove);

    libraryBook.setAttribute('data-bookid', i);

    library.appendChild(libraryBook);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function removeBook(book){
  //removes book from DOM
  let bookToRemove = book.parentElement;
  library.removeChild(bookToRemove);

  //removes book from myLibrary AND localStorage
  let index = bookToRemove.getAttribute('data-bookid');
  myLibrary.splice(index, 1);
  localStorage.clear();
  localStorage.setItem('books', JSON.stringify(myLibrary));

  //PROBLEM: When myLibrary is updated, the indices shift around the removed
  // book, but the data-attribute of books in the DOM do NOT. So if a
  removeAllChildNodes(library);
  refreshLibrary();
}

library.addEventListener('click', function(event) {
	let clicked = event.target;
  console.log(clicked);
  if (clicked.textContent === 'remove'){
    removeBook(clicked);
  }
}
)

submitButton.addEventListener('click', addBookToMyLibrary);
console.log(myLibrary);
console.log(localStorage.getItem('books'));
