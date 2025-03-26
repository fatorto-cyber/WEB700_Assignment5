const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData.js");
const ejs = require('ejs');

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

// Middleware for setting the active route
app.use(function(req, res, next) {
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    next();
});

// Custom EJS Helpers for Navigation and Equality Check
ejs.locals = {
    navLink: function(url, options) {
        return '<li' + ((url == app.locals.activeRoute) ? ' class="nav-item active"' : ' class="nav-item"') + '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
    },
    equal: function(lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Ejs Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    }
};

// Home Route
app.get("/", (req, res) => res.render("home"));

// About Page - Includes Student Info
app.get("/about", (req, res) => {
    res.render("about", { 
        name: "Felix Torto", 
        studentID: "168365229" 
    });
});

// HTML Demo Page
app.get("/htmlDemo", (req, res) => res.render("htmlDemo"));

// Fetch All Students or by Course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => res.render("students", { students: data }))
            .catch(() => res.render("students", { students: [], message: "No students found for the selected course" }));
    } else {
        collegeData.getAllStudents()
            .then(data => res.render("students", { students: data }))
            .catch(() => res.render("students", { students: [], message: "No students available" }));
    }
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
    res.status(404).render("404"); // Ensure you have a `404.ejs` file in `views`
});

// Start Server After Initializing Data
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => console.log(`Server listening on port ${HTTP_PORT}`));
    })
    .catch(err => {
        console.error("Initialization error:", err);
    });
