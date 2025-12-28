# Sistema de Gestión de Cursos Online

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Validaciones, Gestión de Estado  
**Tiempo estimado:** 30-35 minutos

## 📦 Contexto

Una plataforma de aprendizaje online necesita gestionar cursos, estudiantes, lecciones y progreso. El sistema debe permitir crear cursos con lecciones, inscribir estudiantes, rastrear progreso y generar reportes de finalización e ingresos. Tu misión es crear tres clases (`Course`, `Student` y `LearningPlatform`) que permitan gestionar estas operaciones.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de clases con múltiples propiedades y métodos complejos
- [ ] Aplicar validaciones tempranas (Fail Fast) con mensajes descriptivos
- [ ] Implementar gestión de progreso y estados (inscrito, completado)
- [ ] Gestionar relaciones entre clases (estudiantes y cursos)
- [ ] Usar métodos de arrays (filter, reduce, map) para reportes
- [ ] Reforzar principios KISS, Código Expresivo y Responsabilidad Única

## 📝 Enunciado Detallado

Implementa tres clases en `exercise.js`:

### 1. Clase `Course`

**Propiedades:**
- `courseId` (string): ID único del curso (no puede estar vacío)
- `title` (string): Título del curso (no puede estar vacío)
- `instructor` (string): Nombre del instructor (no puede estar vacío)
- `duration` (number): Duración total en horas (debe ser mayor que 0)
- `price` (number): Precio del curso (debe ser mayor que 0)
- `enrolledStudents` (array): Array de instancias de `Student`
- `lessons` (array): Array de objetos { title, duration }

**Constructor:**
- Valida todos los parámetros requeridos
- Inicializa `enrolledStudents = []`, `lessons = []`

**Métodos:**

- `enrollStudent(student)`
  - Valida que sea instancia de `Student`
  - Valida que no esté ya inscrito
  - Agrega estudiante y retorna total inscritos

- `addLesson(lessonTitle, duration)`
  - Valida parámetros
  - Agrega lección y retorna total de lecciones

- `getTotalLessons()` - Retorna número de lecciones
- `getTotalDuration()` - Suma duración de todas las lecciones
- `getEnrollmentCount()` - Retorna número de estudiantes inscritos
- `getCompletionRate()` - Porcentaje de estudiantes que completaron

### 2. Clase `Student`

**Propiedades:**
- `studentId` (string): ID único
- `name` (string): Nombre
- `email` (string): Email
- `enrolledCourses` (array): Cursos inscritos
- `completedCourses` (array): Cursos completados
- `progress` (object): cursoId -> porcentaje (0-100)

**Métodos:**

- `enrollInCourse(course)` - Inscribe en curso
- `completeCourse(courseId)` - Marca curso como completado
- `updateProgress(courseId, percentage)` - Actualiza progreso
- `getProgress(courseId)` - Obtiene progreso
- `getTotalCoursesEnrolled()` - Cuenta cursos inscritos
- `getCompletionRate()` - Porcentaje de cursos completados

### 3. Clase `LearningPlatform`

**Propiedades:**
- `name` (string): Nombre de la plataforma
- `courses` (array): Cursos disponibles
- `students` (array): Estudiantes registrados

**Métodos:**

- `addCourse(course)` - Agrega curso
- `registerStudent(student)` - Registra estudiante
- `getCoursesByInstructor(instructor)` - Filtra cursos por instructor
- `getMostPopularCourse()` - Curso con más inscritos
- `getTotalRevenue()` - Ingresos totales
- `getAverageCompletionRate()` - Promedio de tasa de finalización
- `getStudentStatistics(studentId)` - Estadísticas de estudiante

## 💡 Ejemplos

Ver README completo para ejemplos detallados.

## ⚙️ Restricciones y Reglas

- Todos los mensajes de error y nombres deben estar en inglés
- No se permite usar librerías externas
- Los cálculos de porcentajes deben tener 2 decimales
- Un estudiante puede estar inscrito en múltiples cursos
- El progreso se mide de 0 a 100

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases solicitadas
3. Corre `npm test online-courses`
4. Verifica que todos los tests pasen

---

**💡 Tip:** Mantén los métodos cortos y expresivos. Usa reduce() para cálculos agregados.

