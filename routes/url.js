const express = require("express");
const { handelGenerateNewShortURL, handelGetAnalytics } = require("../controller/urlController.js");
const router = express.Router();

router.post("/", handelGenerateNewShortURL);

router.get('/analytics/:shortId', handelGetAnalytics);

module.exports = router;
