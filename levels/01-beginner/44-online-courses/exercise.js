/**
 * Sistema de Gestión de Cursos Online (Online Course Management System)
 */
class Course {
    constructor(courseId, title, instructor, duration, price) {
        throw new Error('Course constructor not implemented');
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
        throw new Error('Student constructor not implemented');
    }

    enrollInCourse(course) {
        throw new Error('Method enrollInCourse not implemented');
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

