const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers')

router.get('/', Controller.landingPage)
router.get('/home', Controller.home)
router.get('/course/:courseId', Controller.selectCourse)
router.post('/course/:courseId', Controller.buyCourse)
router.get('/create_course', Controller.createCourse)
router.post('/create_course', Controller.updateCourse)

module.exports = router