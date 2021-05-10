let myLibrary = [];


let addABook = document.getElementById('addABook');

let library = document.getElementById('library');



submit.addEventListener('click', addBookToMyLibrary());
submit.addEventListener('click', populateLibrary());


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
    const book = new Book(newTitle, newAuthor, newGenre, newPages, newRead);
    myLibrary.push(book);
}

function populateLibrary() {
  for (i = 0; i < myLibrary.length; i++) {
    let libraryBook = document.createElement('div');
    libraryBook.classList.add('libraryBook');
    
    let bookTitle = document.createElement('p');
    bookTitle.classList.add('bookTitle');
    bookTitle.textContent = myLibrary[i].title;
    libraryBook.appendChild(bookTitle);
    library.appendChild(libraryBook)

    let bookAuthor = document.createElement('p');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.textContent = `by ${myLibrary[i].author}`;
    libraryBook.appendChild(bookAuthor);
    library.appendChild(libraryBook);
  }
  console.log(myLibrary);
}
