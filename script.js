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
        <div class="remove">Trashcan</div>
        <div class="changeRead">Toggle Read</div>
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

