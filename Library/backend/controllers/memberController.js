const pool = require("../db");

//Get all members
exports.getAllMembers = async (req, res) => {
	//res.send('Hello members!')

	try {
		const result = await pool.query("SELECT * FROM members");
		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send("There was an error getting the members!");
	}
};

//Add members
exports.addMember = async (req, res) => {
	const { name, email } = req.body;

	try {
		const result = await pool.query(
			"INSERT INTO members(name, email) VALUES($1, $2) RETURNING *",
			[name, email]
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).send("There was an error getting the members!");
	}
};

//Update a member
exports.updateMember = async (req, res) => {
	const { memberId } = req.params;
	const { name, email } = req.body;

	try {
		const result = await pool.query(
			"UPDATE members SET name = $1, email = $2 WHERE member_id = $3 RETURNING *",
			[name, email, memberId]
		);
		if (result.rowCount === 0) {
			return res.status(404).send("Member not found!");
		}

		res.json({
			message: `Member ${result.rows[0].name} updated!`,
			member: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error updating member!");
	}
};

//Delete a member
exports.deleteMember = async (req, res) => {
	const { memberId } = req.params;

	try {
		const result = await pool.query(
			"DELETE FROM members WHERE member_id = $1 RETURNING *",
			[memberId]
		);

		if (result.rowCount === 0) {
			return res.status(404).send("Member not found!");
		}

		res.json({
			message: `Member ${result.rows[0].name} deleted!`,
			member: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error deleting member!");
	}
};
