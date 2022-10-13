'use strict';
const {
  Model
} = require('sequelize');
const byrcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:{
          msg: 'Invalid email address'
        },
        notEmpty:{
          msg: 'Email must be filled'
        },
        notEmpty:{
          msg: 'Email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'Password must be filled'
        },
        notEmpty:{
          msg: 'Password must be filled'
        }
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'Please Choose your role'
        },
        notEmpty:{
          msg: 'Please Choose your role'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,options)=>{
    const salt = byrcrypt.genSaltSync(15);
    const hash = byrcrypt.hashSync(user.password,salt);
    user.password = hash;
  })
  return User;
};