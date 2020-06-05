const books = document.querySelectorAll('.book-container');

//Shows book information when you click on an item
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