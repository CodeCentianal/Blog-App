const express = require("express");
const knex = require("./db");
const bodyparser = require("body-parser");
const router = express.Router();
const app = express();
app.use(bodyparser.json());
const port = 3000;

// // signup endpoint

app.use("/signup", router);
require("./signup")(router, knex);

// //for posting in specific account by username and password

app.use("/post", router);
require("./posts")(router, knex);

// //deleting of your account

// app.use("/deleting", router);
// require("./delete")(router, knex);

// // for login

// app.use('/login',router)
// require('./login')(router,knex)

// //forget password

// app.use('/forgetpassword',router)
// require('./forgetpassword')(router,knex)

// // for features just like like/dislike, views, comments, share,

// app.use('/views',router)
// require('./views')(router,knex)

// // for like and dislike for one perticular post

// app.use("/lad", router);
// require("./likeanddislike")(router, knex);

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Your port is listening!");
});
