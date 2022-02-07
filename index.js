// load DOM elements into variables
const submitButton = document.getElementById('submit-button');
const titleField = document.getElementById('title');
const authorField = document.getElementById('author');
const pagesField = document.getElementById('pages');
const isReadOptions = document.querySelectorAll('input[name="is-read"]');
const yesOption = document.getElementById('yes');

const bookDisplayArea = document.getElementById('book-display-area')

let idCounter = 0;      // this will be used to give each book a corresponding unique ID

/* BOOK constructor */
function Book(title, author, pages, isRead, uniqueID) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead,
    this.uniqueID = uniqueID
}

// declare empty array to store books
let books = [];

document.addEventListener('click', (event) => {
    if (event.target.id == 'submit-button') {       // if the user presses the Submit button
        event.preventDefault();
        submitNewBook();                 
        clearForm();
        displayBooks();
        idCounter++;
    }
    else if (event.target.className == 'delete-button') {       // is the user presses the Delete button
        books = books.filter(book => book.uniqueID != event.target.parentNode.id)       // removes the chosen book from the array of books
        displayBooks();
    }
})

const submitNewBook = () => {
    // get data from form fields
    let bookTitle = titleField.value;
    let bookAuthor = authorField.value;
    let bookPages = pagesField.value;
    let bookIsRead = '';
    
    isReadOptions.forEach((option) => {     
        if (option.checked) {
            bookIsRead = option.value;      
        }
    })

    let uniqueID = idCounter;

    // create new book and add it to books array
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookIsRead, uniqueID);
    books.push(newBook)
}


const clearForm = () => {
    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    yesOption.checked = true;
}

const displayBooks = () => {
    bookDisplayArea.innerHTML = '';     // clear the display area       
    books.forEach((book) => {       // iterate through books and display
        let newBookDiv = document.createElement('div');
        newBookDiv.className = 'book-div';
        newBookDiv.id = book.uniqueID;

        createBookContentLine('Title', book.title, newBookDiv);
        createBookContentLine('Author', book.author, newBookDiv);
        createBookContentLine('Pages', book.pages, newBookDiv);
        createBookContentLine('Read', book.isRead, newBookDiv);

        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        newBookDiv.appendChild(deleteButton);

        bookDisplayArea.appendChild(newBookDiv);
    })
}

const createBookContentLine = (lineName, lineContent, parent) => {
    let newLine = document.createElement('p');
    newLine.textContent = `${lineName} : ${lineContent}`;
    newLine.className = 'book-content';
    parent.appendChild(newLine);
}




/* PLACEHOLDER */

books.push({
    title: 'Book 1',
    author: 'Somebody Somewhere',
    pages: 180,
    isRead: yes,
    uniqueID: 1000
}, {
    title: 'Book 2',
    author: 'Mo Somebody',
    pages: 44,
    isRead: no,
    uniqueID: 2000
})

displayBooks();

