/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _FELIX A TORTO_ Student ID: 168365229  Date: __2025_02_14_
*
********************************************************************************/ 


/*var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});

---**************************************************************************************--

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var collegeData = require("./modules/collegeData.js");



var app = express();

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static("public")); 
// GET /students - Returns all students or students by course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then((students) => res.json(students))
            .catch(() => res.json({ message: "no results" }));
    } else {
        collegeData.getAllStudents()
            .then((students) => res.json(students))
            .catch(() => res.json({ message: "no results" }));
    }
});

// GET /tas - Returns all TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then((tas) => res.json(tas))
        .catch(() => res.json({ message: "no results" }));
});

// GET /courses - Returns all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then((courses) => res.json(courses))
        .catch(() => res.json({ message: "no results" }));
});

// GET /student/:num - Returns a student by student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then((student) => res.json(student))
        .catch(() => res.json({ message: "no results" }));
});

// GET / - Returns home.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// GET /about - Returns about.html
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// GET /htmlDemo - Returns htmlDemo.html
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

// Handle 404 - No Matching Route
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize collegeData before starting the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.log("Error initializing data: " + err);
    });

 --****************************************************************--
---@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Existing code...
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var collegeData = require("./modules/collegeData.js");

var app = express();

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static("public")); 

// Existing routes...

// GET /students/add - Returns addStudent.html
app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

// Handle 404 - No Matching Route
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize collegeData before starting the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.log("Error initializing data: " + err);
    });
--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/
// Existing code...
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var collegeData = require("./modules/collegeData.js");

var app = express();

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static("public")); 

// Existing routes...

// GET /students/add - Returns addStudent.html
app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

// POST /students/add - Handles form submission to add a new student
app.post("/students/add", (req, res) => {
    // Assuming the form sends student data in the body of the request
    const studentData = req.body;

    // Call addStudent() from collegeData with the student data
    collegeData.addStudent(studentData)
        .then(() => {
            // Redirect to /students to show the updated list
            res.redirect("/students");
        })
        .catch((err) => {
            console.error("Error adding student:", err);
            res.status(500).send("There was an error adding the student.");
        });
});

// Handle 404 - No Matching Route
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize collegeData before starting the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.log("Error initializing data: " + err);
    });
