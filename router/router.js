const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers')

router.get('/', Controller.landingPage)
router.get('/home', Controller.home)
router.get('/course/:courseId', Controller.selectCourse)
router.post('/course/:courseId', Controller.buyCourse)
router.get('/create_course', Controller.addCourse)
router.post('/create_course', Controller.createCourse)
router.get('/course/:courseId/edit', Controller.updateCourse)
router.post('/course/:courseId/edit', Controller.createUpdateCourse)
router.get('/course/:courseId/delete', Controller.deleteCourse)
// router.get('/course/upload', Controller.uploadCourse)

module.exports = router