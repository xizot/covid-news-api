if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const db = require("./services/db");
const News = require("./model/News");
// const crawler = require("./crawler");

app.use(cors());

// app.use("/api", require("./api"));
const newObj = {
    title: "covid",
    image: "covid.jpg",
    link: "covid.com",
    content: "goodbye covid",
    date: "2020-02-02",
};

app.use("/news", require("./routes/covid"));

app.use("/", (req, res) => {
    return res.end("this is API about covid's news");
});
db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
