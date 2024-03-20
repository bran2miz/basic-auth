'use strict';

const userModel= (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type:DataTypes.STRING,
    allowNull: false,
  }
});

// userModel.beforeCreate((user) => {
//   console.log("this is the user I am about to create", user)
// });

module.exports = userModel;