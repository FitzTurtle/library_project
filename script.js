const myLibrary  = [];
const shelf = document.getElementById("shelf");

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

function displayBooks(){
    for(const book of myLibrary) {
        console.log(book.info());
        var displayBook = document.createElement("div");
        displayBook.setAttribute("class","bookCard");
        displayBook.innerHTML = book.title;
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

