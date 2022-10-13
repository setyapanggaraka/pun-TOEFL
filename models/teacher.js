'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Course);
      Teacher.belongsTo(models.User);
    }
  }
  Teacher.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'Name must be filled'
        },
        notEmpty:{
          msg: 'Name must be filled'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};