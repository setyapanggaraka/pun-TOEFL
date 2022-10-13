const { sequelize, Course, Category, Role, User, Teacher, Student } = require('../models');
const student = require('../models/student');
const bcrypt = require('bcryptjs');

class Controller {
    static landingPage(req, res){
        res.render('landingPage')
    }

    static getRegisterPage(req,res){
      const {err} = req.query
      let msg;
      if(err){
        msg = err.split(";");
      }
      Role.findAll()
        .then(roles =>{
          res.render('register',{roles:roles, msg:msg});
        })
        .catch(err=>{
          res.send(err);
        })
    }

    static postRegister(req,res){
      const {name,email,password,RoleId} = req.body;
      let t;
      return sequelize.transaction().then(trans => {
        t = trans;
        return User.create({
          email:email,
          password:password,
          RoleId:RoleId
        }, {
          transaction: t,
          returning:true
        })
        .then(user =>{
          switch(user.RoleId){
            case 1:
              return Teacher.create({
                name:name,
                UserId:user.id
              },{transaction: t})
            case 2:
              return Student.create({
                name:name,
                UserId:user.id
              },{transaction: t})
            }
          }
        )
        .then(result => {
          res.redirect('/login?msg=success')
          return t.commit();
        })
        .catch(err =>{
            if(err.name == 'SequelizeValidationError'){
              let msg = err.errors.map(error => {
                return error.message
              }).join(';');
              res.redirect(`/register?err=${msg}`);
            }else{
              res.send(err);
            }
            return t.rollback();
          }
        );
      });
    }

    static getLoginPage(req,res){
      const {msg,err} = req.query
      res.render('login',{msg:msg,err:err});
    }

    static postLogin(req,res){
      const{email, password,RoleId} = req.body;
      User.findOne({
        where:{email,RoleId},
      })
      .then(user =>{
        if(user) {
          const isValidPassword = bcrypt.compareSync(password,user.password);
          if(isValidPassword){
            req.session.user = user.id
            req.session.role = RoleId
            return res.redirect('/home');
          }else{
            const msg = "Username / Password is Invalid"
            return res.redirect(`/login?err=${msg}`);
          }
        }else{
          const msg = "Username / Password is Invalid"
          return res.redirect(`/login?err=${msg}`);
        }
      })
      .catch(err => {
        res.send(err)
      });
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
    
    static Logout(req,res){
      req.session.Destroy(err=>{
        if(err){
          res.send(err);
        }else{
          res.redirect('/login');
        }
      })
    } 
}

module.exports = Controller