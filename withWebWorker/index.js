const express = require("express");
const morgan = require("morgan");
const { Worker } = require("worker_threads");

const app = express();
const router = express.Router();
router.use(morgan("common"));

router.get("/blocking", (req, res) => {
	var startTime = performance.now();
	const worker = new Worker("./withWebWorker/worker.js");
	worker.on("message", (data) => {
		let endTime = performance.now();
		res
			.status(200)
			.json({ message: `result is ${data}`, time: endTime - startTime });
	});
	worker.on("error", (msg) => {
		res.status(404).json(`An error occurred: ${msg}`);
	});
});

router.get("/nonBlocking", (req, res) => {
	res.status(200).json("you've requested for non blocking route");
});

app.use(router);

app.listen(3000, () => {
	console.log("server is live at port", 3000);
});
