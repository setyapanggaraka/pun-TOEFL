const { Student, Course, Category, User } = require('../models')

class Controller {
    static landingPage(req, res){
        res.render('landingPage')
    }
    static home(req, res){
        // res.send('home')
        Course.findAll()
        .then(courses => {
          // res.send(courses)
          res.render('home', {courses})
        })
        .catch(err => {
          res.send(err)
        })
    }
    static selectCourse(req, res){
      // Course.findByPk(req.params.courseId)
      console.log(req.params.courseId)
      Course.findByPk(+req.params.courseId, {
        include: Category
        
      })
      .then(course => {
        // res.send(course)
        console.log(course)
        res.render('selectCourse', {course})
      })
      .catch(err => {
        res.send(err)
      })
    }
    static buyCourse(){

    }
    static createCourse(req, res){
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
    static updateCourse(req, res){
      Student.findOne({
        attributes: ['id']
      })
      .then(StudentId => {
        const { nameCourse, descriptionCourse, durationCourse, priceCourse, filename, CategoryId } = req.body
        // Course.create({
        //   name: nameCourse,
        //   description: descriptionCourse,
        //   duration: durationCourse,
        //   price: priceCourse, 
        //   filePath: filename,
        //   StudentId: StudentId.id,
        //   CategoryId: CategoryId,
        // })
      })
      .then(() => {
        res.redirect('/home')
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
    } 
}

module.exports = Controller