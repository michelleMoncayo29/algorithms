const { Student } = require('./exercise');

describe('Sistema de Calificaciones para Estudiante', () => {
    // ===== CASOS BÁSICOS - CONSTRUCTOR =====
    describe('Constructor', () => {
        test('crea un estudiante con propiedades correctas', () => {
            // Este test verifica que el constructor asigna correctamente las propiedades básicas.
            // Se espera que al crear un estudiante, sus propiedades se inicialicen correctamente.
            const student = new Student('Juan Pérez', 'ST001');
            expect(student.name).toBe('Juan Pérez');
            expect(student.studentId).toBe('ST001');
            expect(student.grades).toEqual({});
        });

        test('inicializa grades como objeto vacío', () => {
            // Este test verifica que el objeto grades se inicializa vacío.
            // El comportamiento esperado es que el objeto esté listo para almacenar calificaciones por materia.
            const student = new Student('María García', 'ST002');
            expect(student.grades).toEqual({});
            expect(Object.keys(student.grades)).toHaveLength(0);
        });
    });

    // ===== VALIDACIONES - CONSTRUCTOR =====
    describe('Validaciones del Constructor', () => {
        test('lanza error cuando el nombre está vacío', () => {
            // Este test verifica que el constructor valida que el nombre no esté vacío.
            // Se espera que lance un error descriptivo cuando el nombre es una cadena vacía o solo espacios.
            expect(() => new Student('', 'ST001')).toThrow('Student name is required');
            expect(() => new Student('   ', 'ST001')).toThrow('Student name is required');
        });

        test('lanza error cuando el ID está vacío', () => {
            // Este test verifica que el constructor valida que el ID no esté vacío.
            // Se espera que lance un error cuando el ID es una cadena vacía o solo espacios.
            expect(() => new Student('Juan Pérez', '')).toThrow('Student ID is required');
            expect(() => new Student('Juan Pérez', '   ')).toThrow('Student ID is required');
        });
    });

    // ===== MÉTODO addGrade() =====
    describe('Método addGrade()', () => {
        test('agrega calificación a una materia nueva', () => {
            // Este test verifica que addGrade crea el array para una materia nueva y agrega la calificación.
            // Se espera que se cree la estructura correctamente cuando la materia no existe.
            const student = new Student('Juan Pérez', 'ST001');
            const count = student.addGrade('Matemáticas', 85);
            
            expect(student.grades['Matemáticas']).toEqual([85]);
            expect(count).toBe(1);
        });

        test('agrega múltiples calificaciones a la misma materia', () => {
            // Este test verifica que se pueden agregar varias calificaciones a la misma materia.
            // Se espera que las calificaciones se acumulen en el array de esa materia.
            const student = new Student('María García', 'ST002');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Matemáticas', 90);
            const count = student.addGrade('Matemáticas', 88);
            
            expect(student.grades['Matemáticas']).toEqual([85, 90, 88]);
            expect(count).toBe(3);
        });

        test('agrega calificaciones a múltiples materias', () => {
            // Este test verifica que se pueden agregar calificaciones a diferentes materias.
            // Se espera que cada materia mantenga su propio array de calificaciones.
            const student = new Student('Carlos López', 'ST003');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Historia', 75);
            student.addGrade('Matemáticas', 90);
            
            expect(student.grades['Matemáticas']).toEqual([85, 90]);
            expect(student.grades['Historia']).toEqual([75]);
        });

        test('retorna el número total de calificaciones de la materia', () => {
            // Este test verifica que addGrade retorna el número total de calificaciones después de agregar.
            // Se espera que el valor retornado sea el length del array después de agregar.
            const student = new Student('Ana Martínez', 'ST004');
            expect(student.addGrade('Matemáticas', 85)).toBe(1);
            expect(student.addGrade('Matemáticas', 90)).toBe(2);
            expect(student.addGrade('Matemáticas', 88)).toBe(3);
        });
    });

    // ===== VALIDACIONES - addGrade() =====
    describe('Validaciones de addGrade()', () => {
        test('lanza error cuando el nombre de la materia está vacío', () => {
            // Este test verifica que addGrade valida que el nombre de la materia no esté vacío.
            // Se espera que lance un error cuando el subject es una cadena vacía o solo espacios.
            const student = new Student('Pedro Sánchez', 'ST005');
            expect(() => student.addGrade('', 85)).toThrow('Subject name is required');
            expect(() => student.addGrade('   ', 85)).toThrow('Subject name is required');
        });

        test('lanza error cuando la calificación es menor que 0', () => {
            // Este test verifica que addGrade valida que la calificación no sea negativa.
            // Se espera que lance un error cuando la calificación es menor que 0.
            const student = new Student('Luisa Fernández', 'ST006');
            expect(() => student.addGrade('Matemáticas', -10)).toThrow('Grade must be a number between 0 and 100');
        });

        test('lanza error cuando la calificación es mayor que 100', () => {
            // Este test verifica que addGrade valida que la calificación no exceda 100.
            // Se espera que lance un error cuando la calificación es mayor que 100.
            const student = new Student('Miguel Torres', 'ST007');
            expect(() => student.addGrade('Matemáticas', 150)).toThrow('Grade must be a number between 0 and 100');
        });

        test('acepta calificaciones en los límites (0 y 100)', () => {
            // Este test verifica que se pueden agregar calificaciones en los límites válidos.
            // El comportamiento esperado es que 0 y 100 sean valores válidos.
            const student = new Student('Roberto Díaz', 'ST008');
            student.addGrade('Matemáticas', 0);
            student.addGrade('Historia', 100);
            
            expect(student.grades['Matemáticas']).toContain(0);
            expect(student.grades['Historia']).toContain(100);
        });
    });

    // ===== MÉTODO getAverage() - Usa reduce() =====
    describe('Método getAverage() - Usa reduce()', () => {
        test('calcula correctamente el promedio general', () => {
            // Este test verifica que getAverage calcula correctamente usando reduce() para sumar todas las calificaciones.
            // Se espera que calcule el promedio de todas las calificaciones de todas las materias.
            const student = new Student('Sofía Morales', 'ST009');
            student.addGrade('Matemáticas', 80);
            student.addGrade('Matemáticas', 90);
            student.addGrade('Historia', 70);
            student.addGrade('Historia', 80);
            
            const average = student.getAverage();
            expect(average).toBe(80.00); // (80 + 90 + 70 + 80) / 4 = 80
        });

        test('retorna 0 cuando no hay calificaciones', () => {
            // Este test verifica que getAverage retorna 0 cuando no hay calificaciones.
            // El comportamiento esperado es manejar el caso cuando el objeto grades está vacío.
            const student = new Student('Diego Ruiz', 'ST010');
            const average = student.getAverage();
            expect(average).toBe(0);
        });

        test('calcula correctamente con una sola calificación', () => {
            // Este test verifica que getAverage funciona correctamente con una sola calificación.
            // Se espera que el promedio sea igual a esa única calificación.
            const student = new Student('Elena Vargas', 'ST011');
            student.addGrade('Matemáticas', 85);
            
            const average = student.getAverage();
            expect(average).toBe(85.00);
        });

        test('formatea el promedio con 2 decimales', () => {
            // Este test verifica que getAverage retorna el promedio con exactamente 2 decimales.
            // Se espera que use toFixed(2) y parseFloat() para formatear correctamente.
            const student = new Student('Andrés Moreno', 'ST012');
            student.addGrade('Matemáticas', 83);
            student.addGrade('Matemáticas', 85);
            
            const average = student.getAverage();
            expect(average).toBe(84.00);
        });

        test('calcula correctamente con múltiples materias', () => {
            // Este test verifica que getAverage calcula correctamente cuando hay múltiples materias.
            // Se espera que promedie todas las calificaciones sin importar la materia.
            const student = new Student('Carmen Jiménez', 'ST013');
            student.addGrade('Matemáticas', 90);
            student.addGrade('Historia', 80);
            student.addGrade('Ciencia', 85);
            
            const average = student.getAverage();
            expect(average).toBe(85.00); // (90 + 80 + 85) / 3 = 85
        });
    });

    // ===== MÉTODO getAverageBySubject() - Usa reduce() =====
    describe('Método getAverageBySubject() - Usa reduce()', () => {
        test('calcula correctamente el promedio de una materia', () => {
            // Este test verifica que getAverageBySubject calcula correctamente usando reduce() para una materia específica.
            // Se espera que calcule el promedio solo de las calificaciones de esa materia.
            const student = new Student('Juan Pérez', 'ST001');
            student.addGrade('Matemáticas', 80);
            student.addGrade('Matemáticas', 90);
            student.addGrade('Historia', 75);
            
            const average = student.getAverageBySubject('Matemáticas');
            expect(average).toBe(85.00); // (80 + 90) / 2 = 85
        });

        test('retorna 0 cuando la materia no existe', () => {
            // Este test verifica que getAverageBySubject retorna 0 cuando la materia no existe.
            // El comportamiento esperado es manejar el caso cuando la materia no está en grades.
            const student = new Student('María García', 'ST002');
            student.addGrade('Matemáticas', 85);
            
            const average = student.getAverageBySubject('Historia');
            expect(average).toBe(0);
        });

        test('retorna 0 cuando la materia existe pero no tiene calificaciones', () => {
            // Este test verifica que getAverageBySubject retorna 0 cuando el array está vacío.
            // Aunque este caso no debería ocurrir con addGrade, es un caso edge válido.
            const student = new Student('Carlos López', 'ST003');
            student.grades['Matemáticas'] = [];
            
            const average = student.getAverageBySubject('Matemáticas');
            expect(average).toBe(0);
        });

        test('formatea el promedio con 2 decimales', () => {
            // Este test verifica que getAverageBySubject retorna el promedio con 2 decimales.
            // Se espera que use toFixed(2) y parseFloat() para formatear correctamente.
            const student = new Student('Ana Martínez', 'ST004');
            student.addGrade('Matemáticas', 83);
            student.addGrade('Matemáticas', 84);
            
            const average = student.getAverageBySubject('Matemáticas');
            expect(average).toBe(83.50);
        });
    });

    // ===== MÉTODO getGradesBySubject() =====
    describe('Método getGradesBySubject()', () => {
        test('retorna las calificaciones de una materia existente', () => {
            // Este test verifica que getGradesBySubject retorna correctamente las calificaciones de una materia.
            // Se espera que retorne un nuevo array con las calificaciones.
            const student = new Student('Pedro Sánchez', 'ST005');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Matemáticas', 90);
            student.addGrade('Historia', 75);
            
            const grades = student.getGradesBySubject('Matemáticas');
            expect(grades).toEqual([85, 90]);
        });

        test('retorna un nuevo array (no muta el original)', () => {
            // Este test verifica que getGradesBySubject retorna un nuevo array sin modificar el original.
            // El comportamiento esperado es que modificar el array retornado no afecte al original.
            const student = new Student('Luisa Fernández', 'ST006');
            student.addGrade('Matemáticas', 85);
            
            const grades = student.getGradesBySubject('Matemáticas');
            grades.push(100);
            
            expect(student.getGradesBySubject('Matemáticas')).toEqual([85]);
        });

        test('retorna array vacío cuando la materia no existe', () => {
            // Este test verifica que getGradesBySubject retorna un array vacío cuando la materia no existe.
            // El comportamiento esperado es retornar [] cuando la materia no está en grades.
            const student = new Student('Miguel Torres', 'ST007');
            student.addGrade('Matemáticas', 85);
            
            const grades = student.getGradesBySubject('Historia');
            expect(grades).toEqual([]);
        });
    });

    // ===== MÉTODO hasPassed() =====
    describe('Método hasPassed()', () => {
        test('retorna true cuando el promedio es mayor o igual al mínimo', () => {
            // Este test verifica que hasPassed retorna true cuando el promedio cumple con la nota mínima.
            // Se espera que retorne true cuando el promedio es >= minGrade.
            const student = new Student('Roberto Díaz', 'ST008');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Historia', 90);
            
            expect(student.hasPassed()).toBe(true); // promedio 87.5 >= 70
            expect(student.hasPassed(80)).toBe(true); // promedio 87.5 >= 80
        });

        test('retorna false cuando el promedio es menor al mínimo', () => {
            // Este test verifica que hasPassed retorna false cuando el promedio no cumple con la nota mínima.
            // Se espera que retorne false cuando el promedio es < minGrade.
            const student = new Student('Sofía Morales', 'ST009');
            student.addGrade('Matemáticas', 65);
            student.addGrade('Historia', 70);
            // Promedio: (65 + 70) / 2 = 67.5
            
            expect(student.hasPassed(70)).toBe(false); // promedio 67.5 < 70
            expect(student.hasPassed(75)).toBe(false); // promedio 67.5 < 75
        });

        test('retorna false cuando no hay calificaciones', () => {
            // Este test verifica que hasPassed retorna false cuando no hay calificaciones.
            // El comportamiento esperado es retornar false cuando no se puede calcular un promedio.
            const student = new Student('Diego Ruiz', 'ST010');
            expect(student.hasPassed()).toBe(false);
        });

        test('usa el valor por defecto de 70 cuando no se especifica minGrade', () => {
            // Este test verifica que hasPassed usa 70 como valor por defecto para minGrade.
            // Se espera que el parámetro opcional tenga un valor por defecto de 70.
            const student = new Student('Elena Vargas', 'ST011');
            student.addGrade('Matemáticas', 75);
            
            expect(student.hasPassed()).toBe(true); // promedio 75 >= 70
        });
    });

    // ===== MÉTODO getBestSubject() - Usa Object.keys() =====
    describe('Método getBestSubject() - Usa Object.keys()', () => {
        test('retorna la materia con el mejor promedio', () => {
            // Este test verifica que getBestSubject encuentra correctamente la materia con mejor promedio usando Object.keys().
            // Se espera que compare los promedios de todas las materias y retorne la mejor.
            const student = new Student('Andrés Moreno', 'ST012');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Historia', 90);
            student.addGrade('Ciencia', 80);
            
            const bestSubject = student.getBestSubject();
            expect(bestSubject).toBe('Historia'); // promedio 90 es el más alto
        });

        test('retorna null cuando no hay calificaciones', () => {
            // Este test verifica que getBestSubject retorna null cuando no hay calificaciones.
            // El comportamiento esperado es retornar null cuando no se puede determinar una mejor materia.
            const student = new Student('Carmen Jiménez', 'ST013');
            const bestSubject = student.getBestSubject();
            expect(bestSubject).toBeNull();
        });

        test('retorna la primera materia cuando hay empate', () => {
            // Este test verifica que getBestSubject retorna la primera materia cuando hay empate en los promedios.
            // Se espera que cuando múltiples materias tienen el mismo promedio, se retorne la primera encontrada.
            const student = new Student('Juan Pérez', 'ST001');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Historia', 85);
            student.addGrade('Ciencia', 85);
            
            const bestSubject = student.getBestSubject();
            expect(['Matemáticas', 'Historia', 'Ciencia']).toContain(bestSubject);
        });
    });

    // ===== MÉTODO getSubjectCount() - Usa Object.keys() =====
    describe('Método getSubjectCount() - Usa Object.keys()', () => {
        test('cuenta correctamente el número de materias', () => {
            // Este test verifica que getSubjectCount cuenta correctamente usando Object.keys() para obtener las materias.
            // Se espera que retorne el número de materias distintas que tienen calificaciones.
            const student = new Student('María García', 'ST002');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Historia', 75);
            student.addGrade('Ciencia', 80);
            
            const count = student.getSubjectCount();
            expect(count).toBe(3);
        });

        test('retorna 0 cuando no hay calificaciones', () => {
            // Este test verifica que getSubjectCount retorna 0 cuando no hay calificaciones.
            // El comportamiento esperado es retornar 0 cuando el objeto grades está vacío.
            const student = new Student('Carlos López', 'ST003');
            const count = student.getSubjectCount();
            expect(count).toBe(0);
        });

        test('cuenta solo una vez cada materia aunque tenga múltiples calificaciones', () => {
            // Este test verifica que getSubjectCount cuenta cada materia solo una vez.
            // Se espera que el número de materias sea el mismo independientemente de cuántas calificaciones tenga cada una.
            const student = new Student('Ana Martínez', 'ST004');
            student.addGrade('Matemáticas', 85);
            student.addGrade('Matemáticas', 90);
            student.addGrade('Matemáticas', 88);
            student.addGrade('Historia', 75);
            
            const count = student.getSubjectCount();
            expect(count).toBe(2); // Solo 2 materias, aunque Matemáticas tenga 3 calificaciones
        });
    });

    // ===== INTEGRACIÓN - OPERACIONES COMBINADAS =====
    describe('Integración - Operaciones combinadas', () => {
        test('permite realizar operaciones complejas con múltiples materias', () => {
            // Este test verifica que todos los métodos trabajan correctamente juntos en un escenario real.
            // Se espera que se puedan agregar calificaciones, calcular promedios, y realizar consultas sin problemas.
            const student = new Student('Pedro Sánchez', 'ST005');
            
            // Agregar calificaciones
            student.addGrade('Matemáticas', 85);
            student.addGrade('Matemáticas', 90);
            student.addGrade('Historia', 75);
            student.addGrade('Historia', 80);
            student.addGrade('Ciencia', 95);
            
            // Verificar cálculos
            expect(student.getAverage()).toBe(85.00); // (85+90+75+80+95)/5 = 85
            expect(student.getAverageBySubject('Matemáticas')).toBe(87.50);
            expect(student.getBestSubject()).toBe('Ciencia'); // promedio 95
            expect(student.getSubjectCount()).toBe(3);
            expect(student.hasPassed()).toBe(true);
            expect(student.hasPassed(90)).toBe(false);
        });
    });
});

