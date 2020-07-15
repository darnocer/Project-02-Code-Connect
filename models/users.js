// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      ghUsername: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      ghImage: {
        type: DataTypes.STRING,
      },
      ghLink: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
<<<<<<< HEAD
=======

  //Katie commented out
>>>>>>> aef59a90a95b50c9fb80358a46109a966181ed97
  // User.addHook("beforeCreate", function (user) {
  //   user.password = bcrypt.hashSync(
  //     user.password,
  //     bcrypt.genSaltSync(10),
  //     null
  //   );
  // });
  User.associate = function (models) {
    // Associating User with Projects
    // When an User is deleted, also delete any associated Project
    User.hasMany(models.Project, {
      onDelete: "cascade",
    });
  };
  return User;
};
