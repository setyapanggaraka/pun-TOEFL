const { sequelize, Course, Category, Role, User, Teacher, Student } = require('../models');
const {Op} = require('sequelize');
const student = require('../models/student');
const bcrypt = require('bcryptjs');
const convertToCurrency = require('../helper/currency');

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
      const options = {
        where:{email,RoleId},
        include:[{
          model:Role,
          where:{
            id:RoleId
          }
        }]
      }
      if(RoleId == 1){
        options.include.push({model:Teacher})
      }else if(RoleId == 2){
        options.include.push({model:Student});
      }
      let globaluser;
      User.findOne(options)
      .then(user =>{
        globaluser = user
        let promiseRole;
        if(+RoleId == 1){
          promiseRole = Teacher.findOne({where:{UserId:user.id}})
        }else if(+RoleId == 2){
          promiseRole = Student.findOne({where:{UserId:user.id}})
        }
        return promiseRole
      })
      .then(role =>{
        if(globaluser) {
          const isValidPassword = bcrypt.compareSync(password,globaluser.password);
          if(isValidPassword){
            req.session.userId = globaluser.id
            req.session.roleName = globaluser.Role.name
            req.session.role = RoleId
            req.session.name = role.name;
            console.log(req.session)
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
        console.log(err);
        res.send(err)
      });
    }

    static home(req, res){
      const { search } = req.query
      const session = req.session
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
      let promiseUser, wallet;
      if(session.role == 2){
        promiseUser = Student.findOne({
          where:{
            UserId:session.userId
          }
        })
      }
      promiseUser.then(result =>{
        wallet = result.wallet;
        return Course.findAll(options)
      })
      .then(courses => {
        let money = convertToCurrency(wallet);
        res.render('home', {courses,session,money});
      })
      .catch(err => {
        res.send(err);
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

    static getMyCourse(req,res){
      const {Search} = req.query
      let options = {
        include:[
          {
            model: Category,
            attributes: ['name']
          },{
            model: Teacher,
            attributes: ['name']
          }
        ],
        where:{
          StudentId:req.session.userId
        }
      }
      if(Search){
        options.where.name = {
          [Op.iLike]: `%${Search}%`
        }
      }
      Course.findAll(options)
      .then(courses=>{
        res.render('myCourses',{courses,session:req.session});
      })
      .catch(err =>{
        res.send(err);
      })
    }

    static getMyCourseDetail(req,res){
      const {courseId} = req.params
      Course.findByPk(courseId, {
        include: [Category,Teacher] 
      })
      .then(course => {
        // res.send(course);
        res.render('myCourse_detail', {course,session:req.session})
      })
      .catch(err => {
        res.send(err)
      })
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

    static Logout(req,res){
      req.session.destroy(err=>{
        if(err){
          res.send(err);
        }else{
          res.redirect('/login');
        }
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