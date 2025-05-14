INSERT INTO members(name, email)
VALUES('Georgia O''Keeffe', 'georgia.desertbloom@canvas.fake');

INSERT INTO books(title, author)
VALUES('The Bluest Eye', 'Toni Morrison');

INSERT INTO loans(member_id, book_id, date_borrowed, date_returned)
VALUES(1, 2, '2025-05-12', NULL);

UPDATE loans
SET date_returned = '2025-12-13'
WHERE loan_id = 1;

SELECT * FROM loans;
SELECT * FROM members;
SELECT * FROM books;

/*Insert new books*/
INSERT INTO books (title, author)
VALUES 
  ('1984', 'George Orwell'),
  ('To Kill a Mockingbird', 'Harper Lee'),
  ('Jane Eyre', 'Charlotte Brontë'),
  ('The Bell Jar', 'Sylvia Plath');

/*SELECT query that returns: member name, book title, date borrowed & returned*/
SELECT members.name AS member_name, books.title AS book_title, loans.date_borrowed, loans.date_returned
FROM loans
INNER JOIN members ON loans.member_id = members.member_id
INNER JOIN books ON loans.book_id = books.book_id;

/*Syntax for returning books that have not been returned yet*/
WHERE loans.date_returned IS NULL;