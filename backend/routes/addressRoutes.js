const express = require("express");
const router = express.Router();

console.log("addressRoutes.js loaded");

router.get("/test", (req, res) => {
    res.send("Address API Working");
});

router.get("/:customerId", (req, res) => {
    res.json({
        customerId: req.params.customerId
    });
});

module.exports = router;