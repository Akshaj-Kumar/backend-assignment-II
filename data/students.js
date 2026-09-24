// In-memory data store for Students
const initialStudents = require("./students.json");

// Working in-memory array of students
let students = [...initialStudents];

module.exports = students;
