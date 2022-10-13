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

router.get('/home', Controller.home)
router.get('/course/:courseId', Controller.selectCourse)
router.post('/course/:courseId', Controller.buyCourse)
router.get('/myCourse', Controller.getMyCourse)
router.get('/myCourse/:courseId', Controller.getMyCourseDetail)
router.get('/create_course', Controller.addCourse)
router.post('/create_course', Controller.createCourse)
router.get('/course/:courseId/edit', Controller.updateCourse)
router.post('/course/:courseId/edit', Controller.createUpdateCourse)
router.get('/course/:courseId/delete', Controller.deleteCourse)
router.get('/logout', Controller.Logout)
// router.get('/course/upload', Controller.uploadCourse)

module.exports = router