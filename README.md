# Lab Assignment 2 – Student Management REST API

**Web Dev III (Node.js & Express Backend)**  
*Unit-2 | Marks: 2.5 | In-Class Lab*

---

## 📖 Project Overview
The **Student Management REST API** is an Express.js backend application designed to perform full CRUD operations on student records using in-memory JSON data. It incorporates modular routing, custom middleware for logging, and robust error handling with appropriate HTTP status codes.

---

## 🛠️ Technology Stack & Restrictions
- **Node.js**
- **Express.js**
- **Postman** (API Testing)
- **Restrictions Adhered to**: No external database (MongoDB/MySQL) or ODM (Mongoose) is used. All data is managed using an in-memory Array/JSON structure.

---

## 📂 Project Structure

```text
backend 2/
├── data/
│   ├── students.js          # In-memory working dataset export
│   └── students.json        # Initial JSON dataset
├── middleware/
│   └── logger.js            # Custom Logger Middleware (Method, URL, Timestamp)
├── routes/
│   └── studentRoutes.js     # Modular Express Router for /students CRUD endpoints
├── app.js                   # Express server initialization, middleware & error handling
├── Student_Management_API.postman_collection.json # Exportable Postman collection
├── test_api.js              # Automated integration tests for all endpoints
├── package.json
└── README.md
```

---

## ⚙️ Initial Data

| ID | Name | Course |
|:---:|:---:|:---:|
| 1 | Rahul | BCA |
| 2 | Priya | B.Tech |
| 3 | Amit | BCA |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server

- **Standard Run:**
  ```bash
  npm start
  ```
- **Development Mode (with auto-reload):**
  ```bash
  npm run dev
  ```

The server will start on `http://localhost:3000`.

### 3. Run Automated Tests
```bash
npm test
```

---

## 📡 API Endpoints & Specifications

Base URL: `http://localhost:3000/students`

### 1. View All Students
- **Method:** `GET`
- **URL:** `/students`
- **Response:** `200 OK - Success`
```json
{
  "message": "Success",
  "count": 3,
  "data": [
    { "id": 1, "name": "Rahul", "course": "BCA" },
    { "id": 2, "name": "Priya", "course": "B.Tech" },
    { "id": 3, "name": "Amit", "course": "BCA" }
  ]
}
```

---

### 2. View Student by ID
- **Method:** `GET`
- **URL:** `/students/:id`
- **Success Response:** `200 OK - Success`
```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "Rahul",
    "course": "BCA"
  }
}
```
- **Error Responses:**
  - `404 Not Found`: `{"message": "Student Not Found"}`
  - `400 Bad Request`: `{"message": "Invalid Input", "error": "Student ID must be a valid number"}`

---

### 3. Create New Student
- **Method:** `POST`
- **URL:** `/students`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Neha",
  "course": "MCA"
}
```
- **Success Response:** `201 Created - New Student Created`
```json
{
  "message": "New Student Created",
  "data": {
    "id": 4,
    "name": "Neha",
    "course": "MCA"
  }
}
```
- **Error Response:**
  - `400 Bad Request`: `{"message": "Invalid Input", "error": "Both 'name' and 'course' are required and cannot be empty"}`

---

### 4. Update Student
- **Method:** `PUT`
- **URL:** `/students/:id`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Rahul Sharma",
  "course": "MCA"
}
```
- **Success Response:** `200 OK - Success`
```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "Rahul Sharma",
    "course": "MCA"
  }
}
```
- **Error Responses:**
  - `404 Not Found`: `{"message": "Student Not Found"}`
  - `400 Bad Request`: `{"message": "Invalid Input", "error": "At least one field ('name' or 'course') must be provided for update"}`

---

### 5. Delete Student
- **Method:** `DELETE`
- **URL:** `/students/:id`
- **Success Response:** `200 OK - Success`
```json
{
  "message": "Success",
  "data": {
    "id": 2,
    "name": "Priya",
    "course": "B.Tech"
  }
}
```
- **Error Responses:**
  - `404 Not Found`: `{"message": "Student Not Found"}`
  - `400 Bad Request`: `{"message": "Invalid Input", "error": "Student ID must be a valid number"}`

---

## 🛡️ Middleware & Error Handling

1. **Custom Logger Middleware (`middleware/logger.js`)**:
   - Intercepts all incoming requests.
   - Logs: `[Timestamp] HTTP_METHOD REQUEST_URL` to console.
   - Example output: `[2026-09-24T15:45:44.278Z] GET /students`

2. **Error Handling & Status Codes**:
   - `200 OK` – Successful retrieval, update, or deletion.
   - `201 Created` – New student record created.
   - `400 Bad Request` – Missing fields, invalid data formats, or non-numeric ID.
   - `404 Not Found` – Student ID does not exist or route is not registered.
   - `500 Internal Server Error` – Unhandled server exceptions captured by global error middleware.

---

## 📮 Testing with Postman
1. Open **Postman**.
2. Click **Import** (top left).
3. Select the file `Student_Management_API.postman_collection.json` from this project folder.
4. Execute any of the pre-configured requests against `http://localhost:3000`.
