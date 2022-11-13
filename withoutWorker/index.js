const express = require("express");
const morgan = require("morgan");
const app = express();
const router = express.Router();
app.use(morgan("combined"));
router.use(morgan("combined"));

router.get("/blocking", (req, res) => {
	try {
		var startTime = performance.now();
		let j = 0;
		for (let i = 0; i < 20000000000; i++) {
			j += i;
		}
		var endTime = performance.now();

		res.status(200).json({ message: endTime - startTime });
	} catch (err) {
		res.status(401).json("This has failed");
		console.log(err);
	}
});

router.get("/nonBlocking", (req, res) => {
	res.status(200).json("you've requested for non blocking route");
});

app.use(router);

app.listen(3001, () => {
	console.log("server is live at port", 3000);
});
