'use strict';
const {
  Model
} = require('sequelize');
const convertToCurrency = require('../helper/currency');
const estimatedTime = require('../helper/estimatedTime');
const formattedDate = require('../helper/time');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category);
      Course.belongsTo(models.Student);
      Course.belongsTo(models.Teacher);
    }
    
    getEstimatedTime(){
      return estimatedTime(this.duration);
    }

    getFormattedDate(){
      return formattedDate(this.createdAt);
    }

    getCurrency(){
      return convertToCurrency(this.price);
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    filePath: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    CategoryId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};