const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

// Initialize Function
module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        // Read and parse students.json
        fs.readFile("./data/students.json", "utf8", (err, studentData) => {
            if (err) {
                reject("Unable to read students.json");
                return;
            }
            const students = JSON.parse(studentData);

            // Read and parse courses.json
            fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
                if (err) {
                    reject("Unable to read courses.json");
                    return;
                }
                const courses = JSON.parse(courseData);
                // Store the parsed data in the collection
                dataCollection = new Data(students, courses);
                resolve();
            });
        });
    });
};

// Retrieve all students
module.exports.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("No results returned");
        }
    });
};

// Retrieve TAs (Teaching Assistants)
module.exports.getTAs = () => {
    return new Promise((resolve, reject) => {
        const TAs = dataCollection.students.filter(student => student.TA);
        if (TAs.length > 0) {
            resolve(TAs);
        } else {
            reject("No results returned");
        }
    });
};

// Retrieve all courses
module.exports.getCourses = () => {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("No results returned");
        }
    });
};

// Get students by course
module.exports.getStudentsByCourse = (course) => {
    return new Promise((resolve, reject) => {
        let filteredStudents = dataCollection.students.filter(student => student.course === course);
        if (filteredStudents.length > 0) {
            resolve(filteredStudents);
        } else {
            reject("No results returned");
        }
    });
};

// Get student by student number
module.exports.getStudentByNum = (num) => {
    return new Promise((resolve, reject) => {
        let student = dataCollection.students.find(student => student.studentNum === num);
        if (student) {
            resolve(student);
        } else {
            reject("No results returned");
        }
    });
};

