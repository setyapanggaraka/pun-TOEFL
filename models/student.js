'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Student.belongsToMany(models.Teacher,{through:models.Category});
      // Student.belongsTo(models.Teacher);
      Student.hasMany(models.Course)
    }
  }
  Student.init({
    name: DataTypes.STRING,
    wallet: DataTypes.STRING,
    UserId: DataTypes.INTEGER
    // TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};