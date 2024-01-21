const Users = require("../models/users");

exports.getUser = (req, res, next) => {
  res.render("main", {
    path: "/user",
  });
};

exports.postUser =
  ("/user/add-users",
  async (req, res, next) => {
    try {
      if (!req.body.phonenumber) {
        throw new Error("Phone number is mandatory");
      }
      const username = req.body.username;
      console.log("username in controller : " + username);
      const email = req.body.email;
      const phonenumber = req.body.phonenumber;

      // console.log('Submitted data:', { username, email, phonenumber });

      const data = await Users.create({
        username: username,
        email: email,
        phonenumber: phonenumber,
      });
      res.status(201).json({ newUser: data });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  });

  exports.getUserAfterReload = (async (req,res,next) => {
    const users = await Users.finAll();
    res.status(200).json({allUsers: users});
  })
