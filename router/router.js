const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers')

router.get('/', Controller.landingPage)
router.get('/register', Controller.getRegisterPage)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.getLoginPage)
router.post('/login', Controller.postLogin)

router.use((req,res,next)=>{
    if(!req.session.user){
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
router.get('/create_course', Controller.createCourse)
router.post('/create_course', Controller.updateCourse)
router.post('/logout', Controller.Logout)

module.exports = router