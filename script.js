const myLibrary  = [];
const shelf = document.getElementById("shelf");
const addBookDialog = document.querySelector("#addBookDialog");
const showAddBook = document.querySelector("#addNewBook");
const closeAddBook = document.querySelector("dialog button");
const submitBook = document.querySelector("#submitNewBook");

showAddBook.addEventListener("click", ()=> {
    addBookDialog.showModal();
});

closeAddBook.addEventListener("click", () => {
    addBookDialog.close();
});

submitBook.addEventListener("click", (event)=>{
    event.preventDefault();
    var newTitle = document.querySelector("#title").value;
    var newAuthor = document.querySelector("#author").value;
    var newPages = document.querySelector("#pages").value;
    var isRead = true;
    const newBook = new Book(newTitle, newAuthor, newPages, isRead);
    myLibrary.push(newBook);
    appendNewBook(newBook);
    addBookDialog.close();
});


function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	this.info =  function() {
		return title+" by "+author+", "+pages+" pages, " + (read ? "has already read" : "has not read yet");
	}
}


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function appendNewBook(book) {
    var displayBook = document.createElement("div");
    displayBook.setAttribute("class","bookCard");
    displayBook.innerHTML = `
        <h3 class="title">${book.title}</h3>
        <h4 class="author">${book.author}</h4>
        <div class="pages">${book.pages}</div>
        <div class="read"></div>`;
    shelf.appendChild(displayBook);
}

function displayBooks(){
    for(const book of myLibrary) {
        console.log(book.info());
        var displayBook = document.createElement("div");
        displayBook.setAttribute("class","bookCard");
        displayBook.innerHTML = `
            <h3 class="title">${book.title}</h3>
            <h4 class="author">${book.author}</h4>
            <div class="pages">${book.pages}</div>
            <div class="read"></div>`;
        shelf.appendChild(displayBook);
    }
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295,false);
const assassins = new Book("Assassin's Apprentice", "Robert Jordan", 700, true);
const assassin2 = new Book("Assassin's Quest", "Robert Jordan", 700, true);
const assassin3 = new Book("Royal Assassin", "Robert Jordan", 700, true);
const assassin4 = new Book("Fools errand", "Robert Jordan", 700, true);
const assassin5 = new Book("Fools quest", "Robert Jordan", 700, true);
const assassin6 = new Book("Fools fool", "Robert Jordan", 700, true);
addBookToLibrary(hobbit);
addBookToLibrary(assassins);
addBookToLibrary(assassin2);
addBookToLibrary(assassin3);
addBookToLibrary(assassin4);
addBookToLibrary(assassin5);
addBookToLibrary(assassin6);
displayBooks();

