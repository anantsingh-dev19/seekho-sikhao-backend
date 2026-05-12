const router = require('express').Router();
const { getAllCourses, getAllCoursesAdmin, getCourse, createCourse, updateCourse, deleteCourse, addLesson } = require('../controllers/courseController');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.post('/', authenticate, isAdmin, createCourse);
router.put('/:id', authenticate, isAdmin, updateCourse);
router.delete('/:id', authenticate, isAdmin, deleteCourse);
router.post('/:id/lessons', authenticate, isAdmin, addLesson);
router.get('/admin/all', authenticate, isAdmin, getAllCoursesAdmin);

module.exports = router;