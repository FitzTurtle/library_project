const myLibrary  = [];
const shelf = document.getElementById("shelf");
const addBookDialog = document.querySelector("#addBookDialog");
const showAddBook = document.querySelector("#addNewBook");
const closeAddBook = document.querySelector("dialog button");
const addBookForm = document.querySelector("#addBook");
const submitBook = document.querySelector("#submitNewBook");


showAddBook.addEventListener("click", ()=> {
    addBookDialog.showModal();
});

closeAddBook.addEventListener("click", () => {
    addBookDialog.close();
});



//On submission, retrieves the value from each field and stores it in a new book object
submitBook.addEventListener("click", (event)=>{
    event.preventDefault();
    const newTitle = document.querySelector("#title").value;
    const newAuthor = document.querySelector("#author").value;
    const newPages = document.querySelector("#pages").value;
    const isRead = document.querySelector('input[name="isRead"]:checked').value;
    const newBook = new Book(newTitle, newAuthor, newPages, isRead);
    myLibrary.push(newBook);
    appendNewBook(newBook);

    addBookForm.reset();
    addBookDialog.close();
});

//Constructor for books
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

//Function handles creation of the new book card and inserts it into the dom.
function appendNewBook(book) {
    var displayBook = document.createElement("div");
    displayBook.setAttribute("class","bookCard");
    // displayBook.setAttribute("data-index",myLibrary.indexOf(book));
    displayBook.innerHTML = `
        <h3 class="title"></h3>
        <h4 class="author"></h4>
        <div class="pages"></div>
        <div class="read"></div>
        <div class="cardButtons">
        <div class="remove"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></div>
        <div class="changeRead"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l395-78v640l-379 76q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-640h80v720H270Zm90-233 200-39v-478l-200 39v478Zm-80 16v-478l-15 3q-11 2-18 9.5t-7 18.5v457q5-2 10.5-3.5T261-293l19-4Zm-40-472v482-482Z"/></svg></div>
        </div>
        `;
    //Note to self: could potentially just add event listener here?
    //Keeps code from being injected from input
    displayBook.querySelector(".title").textContent = book.title;
    displayBook.querySelector(".author").textContent = book.author;
    displayBook.querySelector(".pages").textContent = book.pages;
    displayBook.querySelector(".read").textContent = book.read;

    displayBook.querySelector(".remove").addEventListener("click", (e) => {
        removeBook(e.target.parentElement.parentElement.getAttribute("data-index"));
    });

    displayBook.querySelector(".changeRead").addEventListener("click", (e) => {
        var parentIndex = e.target.parentElement.parentElement.getAttribute('data-index');
        myLibrary[parentIndex].toggleRead(parentIndex);
    });
    

    shelf.appendChild(displayBook);
    shelf.appendChild(showAddBook);
    updateIndex();
}


function displayBooks(){
    for(const book of myLibrary) {
        appendNewBook(book);
    }
}



function removeBook(index){
    myLibrary.splice(index,1);
    document.querySelector(`div[data-index="${index}"]`).remove();
    updateIndex();
}

function updateIndex(){

    const cards = Array.from(document.querySelectorAll(".bookCard"));

    for(const card of cards) {
        card.setAttribute("data-index",cards.indexOf(card));
    }
}


 Book.prototype.toggleRead = function(parentIndex){
    console.log("Before:"+this.read+" Book: "+this.title);
    this.read = !this.read;
    console.log("after:"+this.read);

    document.querySelector(`[data-index='${parentIndex}'] .read`).textContent = this.read; 
}

// function toggleRead(parent, index){
//     myLibrary[index].read = !myLibrary[index].read;
//     parent.querySelector(".read").textContent = myLibrary[index].read;
//     console.log(myLibrary[index].read);
// }

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

