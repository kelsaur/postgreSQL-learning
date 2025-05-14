CREATE TABLE members (
  member_id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT
);

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title TEXT,
  author TEXT
);

CREATE TABLE loans (
  loan_id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(member_id),
  book_id INTEGER REFERENCES books(book_id),
  date_borrowed DATE,
  date_returned DATE
);