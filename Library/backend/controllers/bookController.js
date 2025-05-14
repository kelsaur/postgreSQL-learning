const pool = require("../db");

//Get all books
exports.getAllBooks = async (req, res) => {
	//res.send('Hello members!')

	try {
		const result = await pool.query("SELECT * FROM books");
		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send("There was an error getting the books!");
	}
};

//Add a book
exports.addBook = async (req, res) => {
	const { title, author } = req.body;

	try {
		const result = await pool.query(
			"INSERT INTO books(title, author) VALUES($1, $2) RETURNING *",
			[title, author]
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).send("There was an error adding a new book!");
	}
};

//Update a book
exports.updateBook = async (req, res) => {
	const { bookId } = req.params;
	const { title, author } = req.body;

	try {
		const result = await pool.query(
			"UPDATE books SET title = $1, author = $2 WHERE book_id = $3 RETURNING *",
			[title, author, bookId]
		);
		if (result.rowCount === 0) {
			return res.status(404).send("Book not found!");
		}

		res.json({
			message: `Book ${result.rows[0].title} updated!`,
			book: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error updating book!");
	}
};

//Delete a book
exports.deleteBook = async (req, res) => {
	const { bookId } = req.params;

	try {
		const result = await pool.query(
			"DELETE FROM books WHERE book_id = $1 RETURNING *",
			[bookId]
		);

		if (result.rowCount === 0) {
			return res.status(404).send("Book not found!");
		}

		res.json({
			message: `Book ${result.rows[0].title} deleted!`,
			book: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error deleting book!");
	}
};
