const express = require("express");
const morgan = require("morgan");
const app = express();
const router = express.Router();
const { Worker } = require("worker_threads");

app.use(morgan("common"));
const THREAD_COUNT = 4;

function createWorker() {
	return new Promise(function (resolve, reject) {
		const worker = new Worker("./multipleWorker/fourWorkers.js", {
			workerData: { thread_count: THREAD_COUNT },
		});
		worker.on("message", (data) => {
			resolve(data);
		});
		worker.on("error", (msg) => {
			reject(`An error ocurred: ${msg}`);
		});
	});
}

router.get("/blocking", async (req, res) => {
	try {
		var startTime = performance.now();
		const workerPromises = [];
		for (let i = 0; i < THREAD_COUNT; i++) {
			workerPromises.push(createWorker());
		}
		const thread_results = await Promise.all(workerPromises);
		const total =
			thread_results[0] +
			thread_results[1] +
			thread_results[2] +
			thread_results[3];
		var endTime = performance.now();
		res.status(200).json({ message: endTime - startTime, total: total });
	} catch (err) {
		res.status(401).json("This has failed");
		console.log(err);
	}
});

router.get("/nonBlocking", (req, res) => {
	res.status(200).json("you've requested for non blocking route");
});

app.use(router);

app.listen(3000, () => {
	console.log("server is live at port", 3000);
});
