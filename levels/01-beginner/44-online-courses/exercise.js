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
        if (!(student instanceof Student)) {
            throw new Error('Student must be an instance of Student');
        }
        if (this.enrolledStudents.includes(student)) {
            throw new Error('Student already enrolled');
        }

        this.enrolledStudents.push(student);

        return this.enrolledStudents.length;
    }

    addLesson(lessonTitle, duration) {
        if (typeof lessonTitle !== 'string' || lessonTitle.trim().length === 0) {
            throw new Error('Lesson title is required');
        }

        if (typeof duration !== 'number' || duration <= 0) {
            throw new Error('Lesson duration must be greater than 0');
        }

        this.lessons.push({ title: lessonTitle.trim(), duration });
        return this.lessons.length;
    }

    getTotalLessons() {
        return this.lessons.length;
    }

    getTotalDuration() {
        return this.lessons.reduce((total, lesson) => total + lesson.duration, 0);
    }

    getEnrollmentCount() {
        return this.enrolledStudents.length;
    }

    getCompletionRate() {
        if (this.enrolledStudents.length === 0) return 0;
        const completed = this.enrolledStudents.filter(s =>
        s.completedCourses.includes(this.courseId)
        ).length;
        return parseFloat(
        ((completed / this.enrolledStudents.length) * 100).toFixed(2)
        );
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
        this.enrollInCourses = [];
        this.completedCourses = [];
        this.progress = {};
    }

    enrollInCourse(course) {
        if (!(course instanceof Course)) {
            throw new Error('Course must be an instance of Course');
        }
        if (this.enrollInCourses.includes(course)) {
            throw new Error('Already enrolled in this course');
        }
        this.enrollInCourses.push(course);
        this.progress[course.courseId] = 0;
        return true;
    }

    completeCourse(courseId) {
        if (!this.enrollInCourses.find(c => c.courseId === courseId)) {
            throw new Error('Not enrolled in this course');
        }
        if (!this.completedCourses.includes(courseId)) {
            this.completedCourses.push(courseId);
            this.progress[courseId] = 100;
        }
        return true;
    }

    updateProgress(courseId, percentage) {
        if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
            throw new Error('Progress must be between 0 and 100');
        }
        if (!this.enrollInCourses.find(c => c.courseId === courseId)) {
            throw new Error('Not enrolled in this course');
        }
        this.progress[courseId] = percentage;
        return percentage;
    }

    getProgress(courseId) {
        return this.progress[courseId] || 0;
    }

    getTotalCoursesEnrolled() {
        return this.enrollInCourses.length;
    }

    getCompletionRate() {
        if (this.enrollInCourses.length === 0) return 0;
        return parseFloat(((this.completedCourses.length / this.enrollInCourses.length) * 100).toFixed(2));
    }
}

class LearningPlatform {
    constructor(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Platform name is required');
        }

        this.name = name;
        this.courses = [];
        this.students = [];
    }

    addCourse(course) {
        if (!(course instanceof Course)) {
            throw new Error('Course must be an instance of Course');
        }
        if (this.courses.find(c => c.courseId === course.courseId)) {
            throw new Error('Course already exists');
        }
        this.courses.push(course);
        return course;
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
