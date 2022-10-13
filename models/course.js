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
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'Course name must be filled'
        },
        notEmpty:{
          msg: 'Course name must be filled'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'Description must be filled'
        },
        notEmpty:{
          msg: 'Description must be filled'
        }
      }
    },
      duration: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{
            msg: 'Duration must be filled'
          },
          notEmpty:{
            msg: 'Duration must be filled'
          },
        }
      }
    ,
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
  
  Course.beforeCreate((course,option)=>{
    course.createdAt = new Date();
  })
  return Course;
};