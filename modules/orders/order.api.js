const router = require("express").Router();
const {mw} = require("../../utils/secure");

/*
Create
List
Read one order
Delete the order
Change the status of order
Update the order
*/

router.post("/", mw(["user", "admin"]), (req, res, next) => {
	try {
		res.json({ msg: "Created new orders" });
	} catch (e) {
		next(e);
	}
});

//this mw allow to get access this route if username and password is sent through headers
router.get("/", mw(["admin"]), (req, res, next) => {
	try {
		res.json({ msg: "List all orders", data: req.body });
	} catch (e) {
		next(e);
	}
});

router.get("/:id", (req, res, next) => {
	try {
		const { id } = req.params;
		res.json({ msg: `Get one order by id ${id}`, });
	} catch (e) {
		next(e);
	}
});

router.delete("/:id", (req, res, next) => {
	try {
		const { id } = req.params;
		res.json({ msg: `Deleted order by id ${id}` });
	} catch (e) {
		next(e);
	}
});

router.patch("/:id/status", (req, res, next) => {
	try {
		const { id } = req.params;
		res.json({ msg: `Change order status of one order by id ${id}` });
	} catch (e) {
		next(e);
	}
});

router.put("/:id", (req, res, next) => {
	try {
		const { id } = req.params;
		res.json({ msg: `Update the order by id ${id}` });
	} catch (e) {
		next(e);
	}
});

module.exports = router;
