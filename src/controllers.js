const { prisma } = require("./config");

async function getTodos() {
	try {
		await prisma.$connect();
		const todos = await prisma.todo.findMany();
		return todos;
	} catch (err) {
		await prisma.$disconnect();
		console.error(err);
		return err;
	}
}

async function getOneTodo(id) {
	try {
		await prisma.$connect();
		const todo = await prisma.todo.findFirst({
			where: {
				id: Number(id),
			},
		});
		return todo;
	} catch (err) {
		await prisma.$disconnect();
		console.error(err);
		return err;
	}
}

async function createTodos(title, completed = false) {
	try {
		await prisma.$connect();
		const todo = await prisma.todo.create({
			data: {
				title,
				completed,
			},
		});
		return todo;
	} catch (err) {
		await prisma.$disconnect();
		console.error(err);
		return err;
	}
}

async function updateTodos(id, completed = true) {
	try {
		await prisma.$connect();
		const todo = await prisma.todo.update({
			where: {
				id: Number(id),
			},
			data: {
				completed,
			},
		});
		return todo;
	} catch (err) {
		await prisma.$disconnect();
		console.error(err);
		return err;
	}
}

async function deleteTodos(id) {
	try {
		await prisma.$connect();
		const todo = await prisma.todo.delete({
			where: {
				id: Number(id),
			},
		});
		return todo;
	} catch (err) {
		await prisma.$disconnect();
		console.error(err);
		return err;
	}
}

module.exports = {
	getTodos,
	getOneTodo,
	createTodos,
	updateTodos,
	deleteTodos,
};
