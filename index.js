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
  //re-write next line so checkbox determines value of newRead
  let newRead = document.getElementById('read').checked
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

    libraryBook.style.background = 'blue';

    let remove = document.createElement('p');
    remove.textContent = 'remove';
    remove.classList.add('remove');
    libraryBook.appendChild(remove);

    let readButton = document.createElement('p');
    readButton.classList.add('readButton');
    libraryBook.appendChild(readButton);

    if (myLibrary[i].read){
      libraryBook.style.background = 'blue';
      readButton.textContent = 'read';
    } else {
      libraryBook.style.background = 'white';
      readButton.textContent = 'not read';
    }
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

  removeAllChildNodes(library);
  refreshLibrary();
}

function toggleRead(book) {
  let bookToToggle = book.parentElement;

  let index = bookToToggle.getAttribute('data-bookid');
  console.log(myLibrary[index].read);
  if(myLibrary[index].read){
    myLibrary[index].read = false
  } else {
    myLibrary[index].read = true
  }
  localStorage.clear();
  localStorage.setItem('books', JSON.stringify(myLibrary));
  
  removeAllChildNodes(library);
  refreshLibrary();
}

library.addEventListener('click', function(event) {
	let clicked = event.target;
  console.log(clicked);
  if (clicked.textContent === 'remove'){
    removeBook(clicked);
  } else if (clicked.textContent === 'read' || clicked.textContent === "not read"){
    toggleRead(clicked);
  }
}
)

submitButton.addEventListener('click', addBookToMyLibrary);
console.log(myLibrary);
console.log(localStorage.getItem('books'));
