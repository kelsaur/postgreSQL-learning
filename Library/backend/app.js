const express = require("express");
const app = express();
const memberRoutes = require("./routes/memberRoutes");
const bookRoutes = require("./routes/bookRoutes");
const loanRoutes = require("./routes/loanRoutes");

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Console is running on PORT ${PORT}`);
});

app.use("/members", memberRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);
