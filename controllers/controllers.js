const { sequelize, Course, Category, Role, User, Teacher, Student } = require('../models');
const {Op} = require('sequelize');
const student = require('../models/student');
const bcrypt = require('bcryptjs');
const convertToCurrency = require('../helper/currency');
const e = require('express');

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
            req.session.idRole = role.id;
            req.session.role = RoleId
            req.session.name = role.name;
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
      const { search } = req.query
      const session = req.session
      let options ={}
      if(req.session.role == 1){
        options = {}
      }else{
        options = {
          where: {
            StudentId:{
              [Op.ne]: session.userId
            }
          }
        }
      }
      if (search){
        options.where.name = {
              [Op.iLike]: `%${search}%` 
          }
      }
      let promiseUser, wallet;
      if(session.role == 1){
        promiseUser = Teacher.findOne({
          where:{
            UserId:session.userId
          }
        })
      }else if(session.role == 2){
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
        let money;
        if(wallet){
          money = convertToCurrency(wallet);
        }
        res.render('home', {courses,session,money});
      })
      .catch(err => {
        res.send(err);
      })
    }

    static selectCourse(req, res){
      Course.findByPk(+req.params.courseId, {
        include: [
          {
            model: Category,
            attributes: ['name']
          },{
            model: Teacher,
            attributes: ['name']
          }
        ]
      })
      .then(course => {
        console.log(course);
        res.render('selectCourse', {course,session:req.session})
      })
      .catch(err => {
        res.send(err)
      })
    }

    static buyCourse(req,res){
      let studentWallet;
      const {courseId} = req.params
      Student.findOne({
        where:{
          UserId:req.session.userId
        }
      })
      .then(student =>{
        studentWallet = student.wallet 
        return Course.findByPk(courseId)
      })
      .then(course =>{
        let coursePrice = course.price
        let remaining;
        if(coursePrice > +studentWallet){
          throw new Error("Uang Kurang")
        }else{
          remaining = studentWallet - coursePrice
          console.log(remaining);
        }
        return Student.update({
          wallet:remaining
        },{where:{
            UserId:req.session.userId
          }
        })
      })
      .then(result=>{
        return Course.update({
          StudentId:req.session.idRole
        },{
          where: {
            id: courseId
          }
        })
      })  
      .then(result =>{
        res.redirect('/myCourse')
      })
      .catch(err=>{
        res.send(err)
      })
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
          StudentId:req.session.idRole
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
        res.render('myCourse_detail', {course,session:req.session})
      })
      .catch(err => {
        res.send(err)
      })
    }

    static addCourse(req, res){
      const {err} = req.query
      let msg;
      if(err){
        msg = err.split(";");
      }
      Category.findAll({
      attributes: ['id','name','description']
      })
      .then(categories => {
        res.render('createCourse', {categories,msg:msg})
      })
      .catch(err => {
        res.send(err)
      }) 
    }

    static createCourse(req, res){
      const {nameCourse, descriptionCourse, durationCourse, priceCourse, filename, CategoryId } = req.body
      Teacher.findOne({
        where:{
          UserId: req.session.userId,
        }
      })
      .then(teacher =>{
        Course.create({
          name: nameCourse,
          description: descriptionCourse,
          duration: durationCourse,
          price: priceCourse, 
          filePath: filename,
          TeacherId: teacher.id,
          CategoryId: CategoryId,
        })
      })
      .then(() => {
        res.redirect('/home')
      })
      .catch(err => {
        if(err.name == 'SequelizeValidationError'){
          let msg = err.errors.map(error => {
            return error.message
          }).join(';');
          res.redirect(`/create_course?err=${msg}`);
        }else{
          res.send(err);
        }
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
      const {err} = req.query
      let msg;
      if(err){
        msg = err.split(";");
      }
      let globalCourse;
      Course.findByPk(req.params.courseId, {
        include: Category
      })
      .then(course => {
        globalCourse = course
        return Category.findAll()
      })
      .then(categories => {
        res.render('updateCourse', {categories, course: globalCourse, msg:msg})
      })
      .catch(err => {
        res.send(err)
      })
    }

    static createUpdateCourse(req, res){
      const { nameCourse, descriptionCourse, durationCourse, priceCourse, filename, CategoryId } = req.body
      Course.update({
        name: nameCourse,
        description: descriptionCourse,
        duration: durationCourse,
        price: priceCourse, 
        filePath: filename,
        CategoryId: CategoryId
      },{
        where: {
          id: +req.params.courseId
        }
      }).then(result => {
        res.redirect('/home')
      })
      .catch(err => {
        if(err.name == 'SequelizeValidationError'){
          let msg = err.errors.map(error => {
            return error.message
          }).join(';');
          res.redirect(`/course/${req.params.courseId}/edit?err=${msg}`);
        }else{
          res.send(err);
        }
      })
    }

    static deleteCourse(req, res) {
      Course.destroy({
        where: {
          id: req.params.courseId
        }
      })
      .then(() => {
        res.redirect('/home')
      })
      .catch(err => {
        res.send(err)
      })
    }
}

module.exports = Controller