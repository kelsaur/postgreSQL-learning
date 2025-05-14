const express = require("express");
const router = express.Router();
const { getAllLoans, createLoan } = require("../controllers/loanController");

router.route("/").get(getAllLoans).post(createLoan);
//router.route("/:loanId").put().delete();

module.exports = router;
