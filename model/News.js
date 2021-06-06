const db = require("../services/db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class News extends Model {
    static async getNews(limit, page) {
        const totalCount = await News.count();
        console.log("count", totalCount);
        const totalPage =
            Math.floor(totalCount / limit) + (totalCount % limit > 0 ? 1 : 0);
        console.log("page", page);
        console.log("total page", totalPage);
        const rs = {
            totalPage,
            data: await News.findAndCountAll({
                order: [["createdAt", "DESC"]],
                limit,
                offset: page * limit,
            }),
            currentPage: page,
        };
        return rs;
    }

    static async findByLink(link) {
        return await News.findOne({
            where: { link },
        });
    }

    static async addNew(item) {
        const found = await News.findByLink(item.link);
        if (!found) {
            return await this.create(item);
        }
    }
}

News.init(
    {
        link: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.TEXT,
        },
        content: {
            type: Sequelize.TEXT,
        },
        date: {
            type: Sequelize.DATE,
        },
    },
    {
        sequelize: db,
        modelName: "news",
    }
);
module.exports = News;
