const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// PUBLIC - Get all published courses
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll({ where: { isPublished: true } });
    res.json({ success: true, data: courses });
  } catch (err) { next(err); }
};

// PUBLIC - Get single course
const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    const lessons = await Lesson.findAll({ where: { courseId: course.id }, order: [['order', 'ASC']] });
    res.json({ success: true, data: { ...course.toJSON(), lessons } });
  } catch (err) { next(err); }
};

// ADMIN - Create course
const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create({ ...req.body, instructorId: req.user.id });
    res.status(201).json({ success: true, data: course });
  } catch (err) { next(err); }
};

// ADMIN - Update course
const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    await course.update(req.body);
    res.json({ success: true, data: course });
  } catch (err) { next(err); }
};

// ADMIN - Delete course
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    await course.destroy();
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) { next(err); }
};

// ADMIN - Add lesson to course
const addLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.create({ ...req.body, courseId: req.params.id });
    await Course.increment('totalLessons', { where: { id: req.params.id } });
    res.status(201).json({ success: true, data: lesson });
  } catch (err) { next(err); }
};

// ADMIN - Get ALL courses including unpublished
const getAllCoursesAdmin = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.json({ success: true, data: courses });
  } catch (err) { next(err); }
};

module.exports = { getAllCourses, getAllCoursesAdmin, getCourse, createCourse, updateCourse, deleteCourse, addLesson };