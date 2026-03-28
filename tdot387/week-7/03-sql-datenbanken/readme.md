SELECT title FROM books;
SELECT * FROM books WHERE genre = 'Science fiction';
SELECT * FROM books WHERE price BETWEEN 10.00 AND 15.00;
SELECT title, author, publishyear FROM books ORDER BY publishyear ASC;
SELECT title, publishyear FROM books WHERE author = 'Olivia Brown';
SELECT DISTINCT genre FROM books;