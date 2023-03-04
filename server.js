const { config } = require("dotenv");
const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const fs = require("node:fs");
const cors = require("cors");

const todosRoute = require("./src/routes");

const app = express();

config();

app.use(express.json());
app.use(cors());
app.use(
	morgan("dev", {
		skip: (req, res) => {
			return res.statusCode < 400;
		},
	}),
);
app.use(
	morgan("common", {
		stream: fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {
			flags: "a",
		}),
	}),
);

app.get("/", (req, res) => {
	res.json({
		"api-version": "1.0.0",
		"description": "A RESTful API for CRUD operations on todos"
	});
});
app.use("/todos", todosRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	process.env.NODE_ENV === "development"
		? console.log(`Server running: http://localhost:${PORT}`)
		: console.log(`Server running: ${PORT}`);
});
