const router = require("express").Router();

const {
	getTodos,
	getOneTodo,
	createTodos,
	updateTodos,
	deleteTodos,
} = require("./controllers");

router.get("/", async (req, res) => {
	try {
		const todos = await getTodos();
		console.log({ todos });
		res.status(200).json(todos);
	} catch (err) {
		res.status(500).json(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const todo = await getOneTodo(id);
		console.log({ todo });
		res.status(200).json(todo);
	} catch (err) {
		res.status(500).json(err.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const todo = await createTodos((title = req.body.title));
		console.log({ todo });
		res.status(201).json(todo);
	} catch (err) {
		res.status(500).json(err.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const updatedTodo = await updateTodos(id);
		console.log({ updatedTodo });
		res.status(200).json(updatedTodo);
	} catch (err) {
		res.status(500).json(err.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const deletedTodo = await deleteTodos(id);
		console.log({ deletedTodo });
		res.status(200).json(deletedTodo);
	} catch (err) {
		res.status(500).json(err.message);
	}
});

module.exports = router;
