const News = require("../model/News");

const router = require("express").Router();
router.get("/", async (req, res) => {
    const limit = Number(req.query && req.query.limit) || 8;
    const page = Number(req.query && req.query.page) || 0;
    return res.json(await News.getNews(limit, page));
});
router.post("/", async (req, res) => {
    const limit = Number(req.body && req.body.limit) || 8;
    const page = Number(req.body && req.body.page) || 0;
    return res.json(await News.getNews(limit, page));
});

module.exports = router;
