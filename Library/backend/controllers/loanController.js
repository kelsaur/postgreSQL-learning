const pool = require("../db");

exports.getAllLoans = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM loans");
		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error getting all loans!");
	}
};

exports.createLoan = async (req, res) => {
	const { member_id, book_id, date_borrowed } = req.body;

	try {
		const result = await pool.query(
			"INSERT INTO loans(member_id, book_id, date_borrowed) VALUES ($1, $2, $3) RETURNING *",
			[member_id, book_id, date_borrowed]
		);

		res.status(201).json({ message: "Loan created!", loan: result.rows[0] });
	} catch (error) {
		console.error(error);
		res.status(500).send("Error creating loan!");
	}
};
