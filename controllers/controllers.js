const { Course, Category } = require('../models')

class Controller {
    static landingPage(req, res){
        // res.send('landing page')
        res.render('landingPage')
    }
    static home(req, res){
        res.send('home')
    }
    static selectCourse(){

    }
    static buyCourse(){

    }
    static createCourse(req, res){
        Category.findAll({
            attributes: ['name','description']
        })
          .then(categories => {
            // res.send(categories)
            res.render('createCourse', {categories})
          })
          .catch(err => {
            res.send(err)
          })
    }
    static updateCourse(){

    }
}

module.exports = Controller