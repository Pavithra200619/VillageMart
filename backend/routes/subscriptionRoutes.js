const express = require("express");

const router = express.Router();

const {
  createSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
} = require("../controllers/subscriptionController");

router.post("/", createSubscription);

router.put("/:id/pause", pauseSubscription);

router.put("/:id/resume", resumeSubscription);

router.put("/:id/cancel", cancelSubscription);

module.exports = router;