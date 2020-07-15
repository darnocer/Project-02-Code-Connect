const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    /*var query = {};
    if(req.query.userID){
      query.UserId = req.query.userID
    }*/
    db.Project.findAll({
      //where: query,
      include: [db.User],
    }).then((data) => {
      res.render("index", { projects: data });
    });
  });


  //Katie added this user route
  app.get("/api/users", (req, res) => {
    db.User.findAll({}).then((dbUser) =>{
      res.json(dbUser)
    })
  });



  //post route
  app.post("/api/projects", function (req, res) {
    db.Project.create(req.body).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  app.delete("/api/projects/:id", function (req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  //Amanda adding Interests find all route
  app.get("/api/interests", (req, res) => {
    db.Interest.findAll({}).then((dbInterest) =>{
      res.json(dbInterest)
    })
  });
  //findby userid
  app.get("/api/interests/:userid", (req, res) => {
    db.Interest.findOne({
      where:{
        userId:req.params.userid

      }
    }).then((dbInterest) =>{
      res.json(dbInterest)
    })

  });

  //findby projectid

   //post route for Interests model
   app.post("/api/interests", function (req, res) {
    db.Interest.create(req.body).then(function (dbInterest) {
      res.json(dbInterest);
    });
  });
};
