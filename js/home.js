const content = document.getElementById('content-container');

function book_info_click() {
    //Shows book information when you click on an item
    const books = document.querySelectorAll('.book-container');
    books.forEach( book => {
        book
        .querySelector('.book-cover')
        .addEventListener('click', () => {
            let already_active = false;
            //Append active class to book info
            if (book.querySelector('.book-info').classList.contains('active')) already_active = true;

            const book_info = document.querySelectorAll('.book-info')
            book_info.forEach(infopage => infopage.classList.remove('active'));

            if (already_active == true) book.querySelector('.book-info').classList.remove('active');
            else book.querySelector('.book-info').classList.add('active');
        })
    });
}

//Get metadata from Folder
async function parseJSONfromFolder(file) {
    const response = await fetch(`${file}/metadata.json`) 
    const data = await response.json() // parse JSON
    const title = data.title;
    addEntry(file, title);
    book_info_click();
}

function addEntry(file, title) {
    let entryHTML = `
    <div class="book-container">
        <div class="book">
            <div class="book-cover-container">
                <img class="book-cover" src="${file}/001.jpg" alt="">
            </div>
        </div>
        <div class="book-info">
            <h2 class="book-title">${title}</h2>
            <a target="_blank" href="${file}/index.html"><button class='read'>Read</button></a>
            <button class='favorite'>Add To Favorites</button>
        </div>
    </div>     
    `;
    content.innerHTML += entryHTML;
}

parseJSONfromFolder('anzu');
parseJSONfromFolder('yuri');
parseJSONfromFolder('azusa');