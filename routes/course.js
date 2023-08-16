const express = require('express');
const Course = require('../models/course'); // Import your Course model

const router = express.Router();

// Route to get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(400).json(error);
  }
});

// CREATE ROUTE
router.post('/', async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.json(newCourse);
  } catch (error) {
    res.status(400).json(error);
  }
});

// SHOW ROUTE
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.json(course);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.json(updatedCourse);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
// DELETE ROUTE
router.delete('/:id', async (req, res) => {
  console.log(`Attempting to delete course with id: ${req.params.id}`);

  try {
    const deletedCourse = await Course.findByIdAndRemove(req.params.id);
    
    if (!deletedCourse) {
      console.log(`Failed to find and delete course with id: ${req.params.id}`);
      res.status(404).json({ message: 'Course not found' });
    } else {
      console.log(`Successfully deleted course with id: ${req.params.id}`);
      res.json(deletedCourse);
    }
  } catch (error) {
    console.error(`Error when trying to delete course with id: ${req.params.id}`, error);
    res.status(400).json(error);
  }
});

module.exports = router;
