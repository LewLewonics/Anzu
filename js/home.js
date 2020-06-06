//FOR USER
    const number_of_entries = 4;
///

const content = document.getElementById('content-container');
const favorites = document.getElementById('favorites');
const filterInput = document.getElementById('filterInput');

let allTags = [];
let selectedTags = [];
let titles = [];

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
        book
        .querySelector('.favorite')
        .addEventListener('click', () => {
            book.querySelector('.favorite').classList.toggle('favorited');
            book.classList.toggle('Favorites')

            if (book.querySelector('.favorite').classList.contains('favorited')) {
                book.querySelector('.favorite').innerHTML = "Favorited";
            } else {
                book.querySelector('.favorite').innerHTML = "Add To Favorites";
            }
        })
    });
}


//Get metadata from Folder
async function parseJSONfromFolder(file) {
    const response = await fetch(`${file}/metadata.json`) 
    const data = await response.json() // parse JSON
    const title = data.title;
    const tags = data.tag;
    addEntry(file, title, tags);
    book_info_click();
}

function addEntry(file, title, tags) {
    //Collect titles into global array
    titles.push(title);
    //Fix for any tags that have spaces
    let tag_string = '';
    tags.forEach(tag => {
        tag = tag.split(' ').join('-');
        allTags.push(tag);
        tag_string += `${tag} `;
    });

    let entryHTML = `
    <div class="book-container ${tag_string}">
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

function removeDuplicateTags(tags) {
    let unique = {};
    tags.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
}

function displayTags() {
    allTags.forEach(tag => {
        document.getElementById('tagss').innerHTML += `<button class='tag'>${tag}</button>`
    })
}

//Chnages the page based on what tags are clicked
function changePageTags() {
    const all_tags_elements = document.querySelectorAll('.tag');

    all_tags_elements.forEach( tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
            
            if (tag.classList.contains('selected')) {
                selectedTags.push(tag.innerHTML);
            } else {
                let index = selectedTags.indexOf(tag.innerHTML);
                selectedTags.splice(index, 1);
            }
            displayResults();
            console.log(selectedTags)
        })
    })
}

function displayResults() {
    let all_the_tags = document.querySelectorAll('.book-container'); 
    all_the_tags.forEach(tag => tag.style.display = 'flex');
    selectedTags.forEach(tag => {
        const non_tag = document.querySelectorAll(`.book-container:not(.${tag}`);
        non_tag.forEach(entry => entry.style.display = 'none')
    });
}

function filterNames() {
    let filterValue = document.getElementById('filterInput').value.toUpperCase();

    let bookTitles = document.querySelectorAll(`.book-title`);

    bookTitles.forEach(book => {
        if (book.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            book.parentElement.parentElement.style.display = 'flex';
        } else {
            book.parentElement.parentElement.style.display = 'none';
        }
    });    
}

async function main() {

    for (let i=0; i<number_of_entries; i++) {
        try {
            await parseJSONfromFolder(`folder/${i+1}`);
        }
        catch (e) {
            console.log(e);
        }
    }
    allTags.sort();
    allTags = removeDuplicateTags(allTags);
    displayTags();
    changePageTags();
}

main();

filterInput.addEventListener('keyup', filterNames);