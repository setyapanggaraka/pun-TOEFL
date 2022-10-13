const { Student, Course, Category, User } = require('../models')
const { search } = require('../router/router')
const { Op } = require('sequelize')

class Controller {
    static landingPage(req, res){
        res.render('landingPage')
    }
    static home(req, res){
      const { search } = req.query
      const options = {
        where: {}
      }
      if (search){
        options.where = {
          name : {
              [Op.iLike]: `%${search}%` 
          }
      }
      }
      Course.findAll(options)
      .then(courses => {
        res.render('home', {courses})
      })
      .catch(err => {
        res.send(err)
        console.log(err)
      })
    }
    static selectCourse(req, res){
      Course.findByPk(+req.params.courseId, {
        include: Category
      })
      .then(course => {
        res.render('selectCourse', {course})
      })
      .catch(err => {
        res.send(err)
      })
    }
    static buyCourse(){

    }
    static addCourse(req, res){
      Category.findAll({
        attributes: ['id','name','description']
      })
      .then(categories => {
        res.render('createCourse', {categories})
      })
      .catch(err => {
        res.send(err)
      })
    }
    static createCourse(req, res){
      Student.findByPk(req.body.TeacherId)
      .then(StudentId => {
        const { nameCourse, descriptionCourse, durationCourse, priceCourse, filename, CategoryId } = req.body
        return Course.create({
          name: nameCourse,
          description: descriptionCourse,
          duration: durationCourse,
          price: priceCourse, 
          filePath: filename,
          StudentId: StudentId.id,
          CategoryId: CategoryId,
        })
      })
      .then(() => {
        res.redirect('/home')
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
    }
    static updateCourse(req, res){
      
    } 
    static createUpdateCourse(req, res){

    }
    static deleteCourse(req, res) {

    }
}

module.exports = Controller