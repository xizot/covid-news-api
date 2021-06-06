if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const moment = require("moment");
let Parser = require("rss-parser");
let parser = new Parser();
const News = require("./model/News");

const getImgLink = (link) => {
    return link.match(/(?=<a href).*(?<=<\/a>)/gs);
};
const rssLink = [
    "https://vnexpress.net/rss/tin-moi-nhat.rss",
    "https://tuoitre.vn/rss/tin-moi-nhat.rss",
];

const ncovid = ["covid", "ncovid", "covid-19", "ncov", "ncov-19", "corona"];

const crawPost = async (linkrss) => {
    let feed = await parser.parseURL(linkrss);
    feed.items.forEach(async (item) => {
        const aboutCV19 = ncovid.some((s) =>
            item.title.toLowerCase().includes(s)
        );
        if (aboutCV19) {
            const newItem = {
                link: item.link,
                title: item.title,
                image: getImgLink(item.content).toString(),
                content: item.contentSnippet,
                date: moment(item.pubDate).format("DD/MM/YYYY"),
            };
            console.log(newItem);
            await News.addNew(newItem);
        }
    });
};

//first
setTimeout(() => {
    rssLink.forEach((item) => {
        crawPost(item);
    });
}, 2000);

// get data each 2 hours
setInterval(() => {
    //craw news
    rssLink.forEach((item) => {
        crawPost(item);
    });
}, 1000 * 60 * 60 * 2);
