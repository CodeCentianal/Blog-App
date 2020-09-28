const jwt = require("jsonwebtoken");

module.exports = (deleting, knex) => {
  deleting

    .delete("/", (req, res) => {
      var account = req.body;
      var username = req.body.username;
      var password = req.body.password;

      knex("fbsignup")
        .where(account)
        .then((rows) => {
          var Accountdata = rows[0];
          var firstname = Accountdata.firstname;
          var fb_profile_id = Accountdata.fb_profile_id;

          knex(firstname)
            .delete()
            .then((rows) => {
              console.log(`Mr.${firstname} your account is deleted!`);
            });

          knex("fblogin")
            .where("fb_profile_id", fb_profile_id)
            .delete()
            .then((rows) => {
              console.log(`Mr.${firstname} your all posts are deleted!!`);
            });

          knex("fbsignup")
            .where("username", username)
            .delete()
            .then((rows) => {
              console.log(`Mr.${firstname} your all posts are deleted!!`);
            });

          res.send(`Mr.${firstname} your account and all posts are deleted!!`);
        });
    })

    // token creation

    .post("/token", (req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      res.send(jwt.sign(username, "my_secrete_key"));
    });

  // middle ware function

  function verifyToken(req, res, next) {
    const header = req.headers["authorization"];
    const verification = jwt.verify(header, "my_secrete_key");

    if (verification == req.body.username) {
      next();
    } else {
      res.send("your are not authenticate properly!!!!");
    }
  }
};
