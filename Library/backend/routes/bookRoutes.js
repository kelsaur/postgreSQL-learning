const express = require("express");
const router = express.Router();
const {
	getAllBooks,
	addBook,
	updateBook,
	deleteBook,
} = require("../controllers/bookController");

router.route("/").get(getAllBooks).post(addBook);
router.route("/:bookId").put(updateBook).delete(deleteBook);

module.exports = router;
