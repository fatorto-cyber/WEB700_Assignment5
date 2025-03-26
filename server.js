const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData.js");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for parsing form data & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// HTML Demo Page - Ensure this is above other routes
app.get("/htmlDemo", (req, res) => {
    res.render("htmlDemo");  
});

// Home Route
app.get("/", (req, res) => res.render("home"));

// About Page - Includes Student Info
app.get("/about", (req, res) => {
    res.render("about", { 
        name: "Felix Torto", 
        studentID: "168365229" 
    });
});

// Fetch All Students or by Course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => res.render("students", { students: data }))
            .catch(() => res.render("students", { students: [] }));
    } else {
        collegeData.getAllStudents()
            .then(data => res.render("students", { students: data }))
            .catch(() => res.render("students", { students: [] }));
    }
});

// Fetch All Courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(data => res.render("courses", { courses: data }))
        .catch(() => res.render("courses", { message: "No results returned" }));
});

// New Route: Fetch a Course by ID
app.get("/course/:id", (req, res) => {
    const courseId = parseInt(req.params.id); // Convert to number
    collegeData.getCourses()
        .then(courses => {
            const course = courses.find(c => c.courseId === courseId);
            if (course) {
                res.render("courseDetails", { course }); // Create `courseDetails.ejs`
            } else {
                res.status(404).send("Course not found");
            }
        })
        .catch(() => res.status(500).send("Unable to fetch course details"));
});

// Render "Add Student" Form
app.get("/students/add", (req, res) => res.render("addStudent"));

// Handle "Add Student" Form Submission
app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => res.redirect("/students"))
        .catch(err => {
            console.error("Error adding student:", err);
            res.status(500).send("There was an error adding the student.");
        });
});

// Fetch Student by Student Number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(student => res.render("studentDetails", { student }))
        .catch(() => res.render("studentDetails", { student: null }));
});

// Handle 404 - No Matching Route
app.use((req, res) => {
    res.status(404).render("404"); 
});

// Start Server After Initializing Data
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => console.log(`Server listening on port ${HTTP_PORT}`));
    })
    .catch(err => {
        console.error("Initialization error:", err);
    });
