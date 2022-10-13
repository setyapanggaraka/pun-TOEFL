const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers')

router.get('/', Controller.landingPage)
router.get('/register', Controller.getRegisterPage)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.getLoginPage)
router.post('/login', Controller.postLogin)

router.use((req,res,next)=>{
    if(!req.session.userId){
        const err = 'Please Login First!'
        res.redirect(`/login?err=${err}`)
    }else{
        next();
    }
});
router.get('/logout', Controller.Logout)
router.get('/home', Controller.home)

const roleAuthStudent = (req,res,next)=>{
    if(req.session.role == 2 ){
        next()
    }else{
        res.redirect(`/home`)
    }
}

const roleAuthTeacher = (req,res,next)=>{
    if(req.session.role == 1 ){
        next()
    }else{
        res.redirect(`/home`)
    }
}

router.get('/course/:courseId', Controller.selectCourse)
router.post('/course/:courseId/buy', roleAuthStudent, Controller.buyCourse)
router.get('/myCourse', roleAuthStudent, Controller.getMyCourse)
router.get('/myCourse/:courseId', roleAuthStudent,Controller.getMyCourseDetail)

router.get('/create_course',roleAuthTeacher, Controller.addCourse)
router.post('/create_course',roleAuthTeacher, Controller.createCourse)
router.get('/course/:courseId/edit', roleAuthTeacher, Controller.updateCourse)
router.post('/course/:courseId/edit', roleAuthTeacher, Controller.createUpdateCourse)
router.get('/course/:courseId/delete', roleAuthTeacher, Controller.deleteCourse)

module.exports = router