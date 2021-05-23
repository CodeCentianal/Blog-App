const option = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "blogpost",
    multipleStatements: true,
  },
};

const knex = require("knex")(option);
console.log("connected to database!");

// // //

// knex.schema
//   .createTable("fbsignup", (table) => {
//     table.increments("id");
//     table.string("firstname");
//     table.string("lastname");
//     table.string("dob");
//     table.string("gender");
//     table.string("address");
//     table.string("mobilenumber");
//     table.string("username");
//     table.string("password");
//     table.date("fb_account_date");
//     table.string("fb_profile_id");
//   })
//   .then(() => {
//     console.log("fb signup table is created!");
//   });

// // fb login table is created for

// knex.schema
//   .createTable("fblogin", (table) => {
//     table.string("fb_profile_id");
//     table.string("post").defaultTo("");
//     table.integer("views").defaultTo(0);
//     table.integer("like").defaultTo(0);
//     table.integer("dislike").defaultTo(0);
//     table.string("comments").defaultTo("");
//     table.integer("share").defaultTo(0);
//   })
//   .then(() => {
//     console.log("fb login features table is created!");
//   });

// // views table is created

// knex.schema
//   .createTable("views", (table) => {
//     table.string("fb_profile_id");
//     table.string("post").defaultTo("");
//     table.integer("views").defaultTo(0);
//   })
//   .then(() => {
//     console.log("fb login features table is created!");
//   });

// // comments table created

// knex.schema
//   .createTable("commentsTable", (table) => {
//     table.string("fb_profile_id");
//     table.string("comments").defaultTo("");
//   })
//   .then(() => {
//     console.log("comments table is created!");
//   });

// // comments table created

// knex.schema
//   .createTable("likeanddislike", (table) => {
//     table.string("fb_profile_id");
//     table.string("like").defaultTo("");
//     table.string("dislike").defaultTo("");
//   })
//   .then(() => {
//     console.log("comments table is created!");
//   });

module.exports = knex;
