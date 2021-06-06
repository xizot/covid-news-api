const Sequelize = require("sequelize");
const connectionString = process.env.DATABASE_URL;

//LOCAL
// const db = new Sequelize(connectionString);

//HEROKU
const db = new Sequelize({
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
module.exports = db;
