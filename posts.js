module.exports = (posts, knex) => {
  posts.post("/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var post = req.body.post;
    var views = req.body.views;

    console.log(req.body);

    knex("fbsignup")
      .where({ username: username, password: password })
      .then((rows) => {
        var myAccount = rows[0];

        var firstname = myAccount.firstname;
        var fb_profile_id = myAccount.fb_profile_id;

        var dataForfirstnameTable = [
          {
            fb_profile_id: fb_profile_id,
            post: post,
          },
        ];

        knex(firstname)
          .insert(dataForfirstnameTable)
          .then((rows) => {
            console.log(
              `Mr.${firstname} data is successfully inserted into your table`
            );
          });

        var DataForfbloginTable = [
          {
            fb_profile_id: fb_profile_id,
            post: post,
            views: views,
          },
        ];
        console.log(DataForfbloginTable);
        knex("fblogin")
          .insert(DataForfbloginTable)
          .then((rows) => {
            res.send(`Mr.${firstname} successfully posted!!!`);
          });
      });
  });
};
