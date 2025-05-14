const express = require("express");
const router = express.Router();
const {
	getAllMembers,
	addMember,
	updateMember,
	deleteMember,
} = require("../controllers/memberController");

router.route("/").get(getAllMembers).post(addMember);
router.route("/:memberId").put(updateMember).delete(deleteMember);

module.exports = router;
