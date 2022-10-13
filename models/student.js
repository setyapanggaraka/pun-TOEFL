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
      Student.belongsToMany(models.Teacher,{through:models.Category});
    }
  }
  Student.init({
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
    wallet: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });

  Student.beforeCreate((student,options)=>{
    student.wallet = 0;
  });
  return Student;
};