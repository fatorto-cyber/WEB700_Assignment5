
const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

// Initialize function to read JSON files
module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/students.json", "utf8", (err, studentData) => {
            if (err) {
                reject("Unable to read students.json");
                return;
            }
            const students = JSON.parse(studentData);

            fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
                if (err) {
                    reject("Unable to read courses.json");
                    return;
                }
                const courses = JSON.parse(courseData);
                dataCollection = new Data(students, courses);
                resolve();
            });
        });
    });
};

// Add a new student
module.exports.addStudent = (studentData) => {
    return new Promise((resolve, reject) => {
        try {
            // Set TA to false if undefined, otherwise set to true
            if (studentData.TA === undefined) {
                studentData.TA = false;
            } else {
                studentData.TA = true;
            }

            // Set studentNum based on the current length of the students array + 261
            studentData.studentNum = dataCollection.students.length + 261;

            // Push the new student into the students array
            dataCollection.students.push(studentData);

            // Resolve promise when student is added
            resolve();
        } catch (err) {
            reject("Error adding student: " + err);
        }
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

// Retrieve all TAs
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
        let filteredStudents = dataCollection.students.filter(student => student.course == course);
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
        let student = dataCollection.students.find(student => student.studentNum == num);
        if (student) {
            resolve(student);
        } else {
            reject("No results returned");
        }
    });
};



/*  
-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
BACK UP FILE
const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

// Initialize function to read JSON files
module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/students.json", "utf8", (err, studentData) => {
            if (err) {
                reject("Unable to read students.json");
                return;
            }
            const students = JSON.parse(studentData);

            fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
                if (err) {
                    reject("Unable to read courses.json");
                    return;
                }
                const courses = JSON.parse(courseData);
                dataCollection = new Data(students, courses);
                resolve();
            });
        });
    });
};

module.exports = {
    initialize: function () {
      return new Promise((resolve, reject) => {
        resolve("Data Initialized");
      });
    },
    getAllStudents: function () {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    },
    getStudentsByCourse: function (course) {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    },
    getTAs: function () {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    },
    getCourses: function () {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    },
    getStudentByNum: function (num) {
      return new Promise((resolve, reject) => {
        resolve({});
      });
    }
  };

  -- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
*/


/*  

-- NOT USE AT ALL 

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

// Retrieve all TAs
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

function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        let filteredStudents = students.filter(student => student.course == course);
        if (filteredStudents.length > 0) {
            resolve(filteredStudents);
        } else {
            reject("no results returned");
        }
    });
}

function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        let student = students.find(student => student.studentNum == num);
        if (student) {
            resolve(student);
        } else {
            reject("no results returned");
        }
    });
}

-- NOT USE AT ALL
*/

