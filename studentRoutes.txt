const express = require("express");
const router = express.Router();
const students = require("../data/students");

// 1. GET /students - View All Students
router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Success",
    count: students.length,
    data: students
  });
});

// 2. GET /students/:id - View Student by ID
router.get("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  if (isNaN(studentId)) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Student ID must be a valid number"
    });
  }

  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      message: "Student Not Found"
    });
  }

  return res.status(200).json({
    message: "Success",
    data: student
  });
});

// 3. POST /students - Create Student
router.post("/", (req, res) => {
  const { name, course } = req.body;

  // Validation: name and course must be non-empty strings
  if (!name || !course || typeof name !== "string" || typeof course !== "string" || !name.trim() || !course.trim()) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Both 'name' and 'course' are required and cannot be empty"
    });
  }

  // Auto-generate next ID
  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  return res.status(201).json({
    message: "New Student Created",
    data: newStudent
  });
});

// 4. PUT /students/:id - Update Student
router.put("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  if (isNaN(studentId)) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Student ID must be a valid number"
    });
  }

  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      message: "Student Not Found"
    });
  }

  const { name, course } = req.body;

  // Validate that at least one field is provided to update
  if (!name && !course) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "At least one field ('name' or 'course') must be provided for update"
    });
  }

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Invalid Input",
        error: "'name' must be a non-empty string"
      });
    }
    student.name = name.trim();
  }

  if (course !== undefined) {
    if (typeof course !== "string" || !course.trim()) {
      return res.status(400).json({
        message: "Invalid Input",
        error: "'course' must be a non-empty string"
      });
    }
    student.course = course.trim();
  }

  return res.status(200).json({
    message: "Success",
    data: student
  });
});

// 5. DELETE /students/:id - Delete Student
router.delete("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  if (isNaN(studentId)) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Student ID must be a valid number"
    });
  }

  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      message: "Student Not Found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  return res.status(200).json({
    message: "Success",
    data: deletedStudent
  });
});

module.exports = router;
