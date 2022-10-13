const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers')

router.get('/', Controller.landingPage)
router.get('/home', Controller.home)
router.get('/course/:courseId', Controller.selectCourse)
router.post('/course/:courseId', Controller.buyCourse)
router.get('/create_course', Controller.addCourse)
router.post('/create_course', Controller.createCourse)
router.get('/create_course', Controller.updateCourse)
router.post('/create_course', Controller.createUpdateCourse)
router.get('/course/:courseId/delete', Controller.deleteCourse)

module.exports = router