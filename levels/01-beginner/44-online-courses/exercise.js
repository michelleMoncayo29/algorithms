/**
 * Sistema de Gestión de Cursos Online (Online Course Management System)
 */
class Course {
    constructor(courseId, title, instructor, duration, price) {
        if (typeof courseId !== 'string' || courseId.trim().length === 0) {
            throw new Error('Course ID is required');
        }

        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Course title is required');
        }

        if (typeof instructor !== 'string' || instructor.trim().length === 0) {
            throw new Error('Course instructor is required');
        }

        if (typeof duration !== 'number' || duration <= 0 || isNaN(duration)) {
            throw new Error('Course duration must be greater than 0');
        }

        if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
            throw new Error('Course price must be greater than 0');
        }

        this.courseId = courseId;
        this.title = title;
        this.instructor = instructor;
        this.duration = duration;
        this.price = price;

        this.enrolledStudents = [];
        this.lessons = [];

    }

    enrollStudent(student) {
        throw new Error('Method enrollStudent not implemented');
    }

    addLesson(lessonTitle, duration) {
        throw new Error('Method addLesson not implemented');
    }

    getTotalLessons() {
        throw new Error('Method getTotalLessons not implemented');
    }

    getTotalDuration() {
        throw new Error('Method getTotalDuration not implemented');
    }

    getEnrollmentCount() {
        throw new Error('Method getEnrollmentCount not implemented');
    }

    getCompletionRate() {
        throw new Error('Method getCompletionRate not implemented');
    }
}

class Student {
    constructor(studentId, name, email) {
        if (typeof studentId !== 'string' || studentId.trim().length === 0) {
            throw new Error('Student ID is required');
        }
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Not enrolled in this course');
        }
        if (typeof email !== 'string' || email.trim().length === 0) {
            throw new Error('Progress must be between 0 and 100');
        }

        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.enrollInCourse = [];
        this.completeCourse = [];
        this.progress = {};
    }

    enrollInCourse(course) {
        if (!(course instanceof Course)) {
            throw new Error('Course must be an instance of Course');
        }
        if (this.enrolledCourses.includes(course)) {
            throw new Error('Already enrolled in this course');
        }
        this.enrolledCourses.push(course);
        this.progress[course.courseId] = 0;
        return true;
    }

    completeCourse(courseId) {
        throw new Error('Method completeCourse not implemented');
    }

    updateProgress(courseId, percentage) {
        throw new Error('Method updateProgress not implemented');
    }

    getProgress(courseId) {
        throw new Error('Method getProgress not implemented');
    }

    getTotalCoursesEnrolled() {
        throw new Error('Method getTotalCoursesEnrolled not implemented');
    }

    getCompletionRate() {
        throw new Error('Method getCompletionRate not implemented');
    }
}

class LearningPlatform {
    constructor(name) {
        throw new Error('LearningPlatform constructor not implemented');
    }

    addCourse(course) {
        throw new Error('Method addCourse not implemented');
    }

    registerStudent(student) {
        throw new Error('Method registerStudent not implemented');
    }

    getCoursesByInstructor(instructor) {
        throw new Error('Method getCoursesByInstructor not implemented');
    }

    getMostPopularCourse() {
        throw new Error('Method getMostPopularCourse not implemented');
    }

    getTotalRevenue() {
        throw new Error('Method getTotalRevenue not implemented');
    }

    getAverageCompletionRate() {
        throw new Error('Method getAverageCompletionRate not implemented');
    }

    getStudentStatistics(studentId) {
        throw new Error('Method getStudentStatistics not implemented');
    }
}

module.exports = { Course, Student, LearningPlatform };

