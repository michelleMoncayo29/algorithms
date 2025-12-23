const {
    delay,
    fetchUserData,
    processData,
    handleAsyncOperation,
    handleAsyncOperationWithAwait,
    fetchMultipleUsers
} = require('./exercise');

describe('Funciones Asíncronas con Delays Simples', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos', () => {
        test('debe crear un delay que se resuelve después del tiempo especificado', async () => {
            // Propósito: Verificar que delay() crea una promesa que se resuelve correctamente
            // Entrada: delay(100) - Delay de 100 milisegundos
            // Esperado: La promesa debe resolverse con "Delay completed" después de aproximadamente 100ms
            const startTime = Date.now();
            const result = await delay(100);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe('Delay completed');
            expect(elapsed).toBeGreaterThanOrEqual(90); // Permite un margen de error
            expect(elapsed).toBeLessThan(200); // No debe tardar mucho más
        });

        test('debe obtener datos de usuario después de 500ms', async () => {
            // Propósito: Verificar que fetchUserData() simula correctamente una llamada API
            // Entrada: fetchUserData(123) - Obtener datos del usuario 123
            // Esperado: Debe retornar objeto con id, name y email después de ~500ms
            const startTime = Date.now();
            const user = await fetchUserData(123);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(user).toEqual({
                id: 123,
                name: 'User 123',
                email: 'user123@example.com'
            });
            expect(elapsed).toBeGreaterThanOrEqual(450);
            expect(elapsed).toBeLessThan(600);
        });

        test('debe procesar datos después de 300ms', async () => {
            // Propósito: Verificar que processData() procesa datos correctamente con delay
            // Entrada: processData("test") - Procesar el string "test"
            // Esperado: Debe retornar "Processed: test" después de ~300ms
            const startTime = Date.now();
            const result = await processData('test');
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe('Processed: test');
            expect(elapsed).toBeGreaterThanOrEqual(250);
            expect(elapsed).toBeLessThan(400);
        });

        test('debe encadenar operaciones asíncronas con .then()', async () => {
            // Propósito: Verificar que handleAsyncOperation() encadena correctamente operaciones
            // Entrada: handleAsyncOperation(456) - Obtener y procesar datos del usuario 456
            // Esperado: Debe retornar "Processed: User 456" después de ~800ms (500ms + 300ms)
            const startTime = Date.now();
            const result = await handleAsyncOperation(456);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe('Processed: User 456');
            expect(elapsed).toBeGreaterThanOrEqual(750);
            expect(elapsed).toBeLessThan(900);
        });

        test('debe encadenar operaciones asíncronas con async/await', async () => {
            // Propósito: Verificar que handleAsyncOperationWithAwait() funciona igual que .then()
            // Entrada: handleAsyncOperationWithAwait(789) - Obtener y procesar datos del usuario 789
            // Esperado: Debe retornar "Processed: User 789" después de ~800ms
            const startTime = Date.now();
            const result = await handleAsyncOperationWithAwait(789);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe('Processed: User 789');
            expect(elapsed).toBeGreaterThanOrEqual(750);
            expect(elapsed).toBeLessThan(900);
        });

        test('debe obtener múltiples usuarios en paralelo', async () => {
            // Propósito: Verificar que fetchMultipleUsers() ejecuta promesas en paralelo
            // Entrada: fetchMultipleUsers([1, 2, 3]) - Obtener 3 usuarios
            // Esperado: Debe retornar array con 3 usuarios después de ~500ms (no 1500ms)
            const startTime = Date.now();
            const users = await fetchMultipleUsers([1, 2, 3]);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(users).toHaveLength(3);
            expect(users[0]).toEqual({ id: 1, name: 'User 1', email: 'user1@example.com' });
            expect(users[1]).toEqual({ id: 2, name: 'User 2', email: 'user2@example.com' });
            expect(users[2]).toEqual({ id: 3, name: 'User 3', email: 'user3@example.com' });
            // Debe ser aproximadamente 500ms, no 1500ms (que sería secuencial)
            expect(elapsed).toBeLessThan(700);
        });

        test('debe manejar diferentes tipos de datos en processData', async () => {
            // Propósito: Verificar que processData() convierte diferentes tipos a string
            // Entrada: processData(123) y processData(true) - Números y booleanos
            // Esperado: Debe convertir correctamente a string y agregar prefijo
            const result1 = await processData(123);
            const result2 = await processData(true);

            expect(result1).toBe('Processed: 123');
            expect(result2).toBe('Processed: true');
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites', () => {
        test('debe manejar delay de 0 milisegundos', async () => {
            // Propósito: Verificar comportamiento con delay mínimo
            // Entrada: delay(0) - Delay de 0ms
            // Esperado: Debe resolverse inmediatamente (o casi)
            const result = await delay(0);
            expect(result).toBe('Delay completed');
        });

        test('debe manejar userId como número y string', async () => {
            // Propósito: Verificar que fetchUserData acepta diferentes tipos de ID
            // Entrada: fetchUserData(123) y fetchUserData("456")
            // Esperado: Debe funcionar correctamente con ambos tipos
            const user1 = await fetchUserData(123);
            const user2 = await fetchUserData('456');

            expect(user1.id).toBe(123);
            expect(user2.id).toBe('456');
            expect(user2.name).toBe('User 456');
        });

        test('debe manejar arrays vacíos en fetchMultipleUsers', async () => {
            // Propósito: Verificar validación de array vacío
            // Entrada: fetchMultipleUsers([]) - Array vacío
            // Esperado: Debe lanzar error "User IDs array cannot be empty"
            await expect(fetchMultipleUsers([])).rejects.toThrow('User IDs array cannot be empty');
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs', () => {
        test('debe lanzar error cuando delay recibe un valor no numérico', async () => {
            // Propósito: Verificar validación de tipo numérico en delay()
            // Entrada: delay("100") - String en lugar de número
            // Esperado: Error "Delay must be a number"
            await expect(delay('100')).rejects.toThrow('Delay must be a number');
        });

        test('debe lanzar error cuando delay es negativo', async () => {
            // Propósito: Verificar validación de valor negativo
            // Entrada: delay(-100) - Valor negativo
            // Esperado: Error "Delay must be greater than or equal to 0"
            await expect(delay(-100)).rejects.toThrow('Delay must be greater than or equal to 0');
        });

        test('debe lanzar error cuando userId está vacío', async () => {
            // Propósito: Verificar validación de userId requerido
            // Entrada: fetchUserData("") - String vacío
            // Esperado: Error "User ID is required"
            await expect(fetchUserData('')).rejects.toThrow('User ID is required');
        });

        test('debe lanzar error cuando userId es null', async () => {
            // Propósito: Verificar validación de null
            // Entrada: fetchUserData(null) - null
            // Esperado: Error "User ID is required"
            await expect(fetchUserData(null)).rejects.toThrow('User ID is required');
        });

        test('debe lanzar error cuando userId es undefined', async () => {
            // Propósito: Verificar validación de undefined
            // Entrada: fetchUserData(undefined) - undefined
            // Esperado: Error "User ID is required"
            await expect(fetchUserData(undefined)).rejects.toThrow('User ID is required');
        });

        test('debe lanzar error cuando data es null en processData', async () => {
            // Propósito: Verificar validación de data requerido
            // Entrada: processData(null) - null
            // Esperado: Error "Data is required"
            await expect(processData(null)).rejects.toThrow('Data is required');
        });

        test('debe lanzar error cuando data es undefined en processData', async () => {
            // Propósito: Verificar validación de undefined
            // Entrada: processData(undefined) - undefined
            // Esperado: Error "Data is required"
            await expect(processData(undefined)).rejects.toThrow('Data is required');
        });

        test('debe lanzar error cuando userIds no es un array', async () => {
            // Propósito: Verificar validación de tipo array
            // Entrada: fetchMultipleUsers("1,2,3") - String en lugar de array
            // Esperado: Error "User IDs must be an array"
            await expect(fetchMultipleUsers('1,2,3')).rejects.toThrow('User IDs must be an array');
        });

        test('debe propagar errores en handleAsyncOperation', async () => {
            // Propósito: Verificar que los errores se propagan correctamente en encadenamiento
            // Entrada: handleAsyncOperation("") - userId inválido
            // Esperado: Debe propagar el error de fetchUserData
            await expect(handleAsyncOperation('')).rejects.toThrow('User ID is required');
        });

        test('debe propagar errores en handleAsyncOperationWithAwait', async () => {
            // Propósito: Verificar que los errores se propagan en async/await
            // Entrada: handleAsyncOperationWithAwait(null) - userId inválido
            // Esperado: Debe propagar el error de fetchUserData
            await expect(handleAsyncOperationWithAwait(null)).rejects.toThrow('User ID is required');
        });
    });

    // ===== CASOS ADICIONALES =====
    describe('Casos adicionales', () => {
        test('debe manejar múltiples delays secuenciales', async () => {
            // Propósito: Verificar que se pueden encadenar múltiples delays
            // Entrada: delay(50).then(() => delay(50))
            // Esperado: Debe tomar aproximadamente 100ms en total
            const startTime = Date.now();
            await delay(50).then(() => delay(50));
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(elapsed).toBeGreaterThanOrEqual(90);
            expect(elapsed).toBeLessThan(150);
        });

        test('debe manejar errores en Promise.all()', async () => {
            // Propósito: Verificar que Promise.all() rechaza si alguna promesa falla
            // Entrada: fetchMultipleUsers([1, "", 3]) - Array con userId inválido
            // Esperado: Debe rechazar con el error de validación
            await expect(fetchMultipleUsers([1, '', 3])).rejects.toThrow('User ID is required');
        });

        test('debe retornar resultados en el mismo orden con Promise.all()', async () => {
            // Propósito: Verificar que Promise.all() mantiene el orden de resultados
            // Entrada: fetchMultipleUsers([3, 1, 2]) - IDs en orden diferente
            // Esperado: Los resultados deben estar en el mismo orden que los IDs de entrada
            const users = await fetchMultipleUsers([3, 1, 2]);

            expect(users[0].id).toBe(3);
            expect(users[1].id).toBe(1);
            expect(users[2].id).toBe(2);
        });

        test('debe manejar un solo usuario en fetchMultipleUsers', async () => {
            // Propósito: Verificar comportamiento con un solo elemento
            // Entrada: fetchMultipleUsers([99]) - Array con un solo usuario
            // Esperado: Debe retornar array con un solo elemento
            const users = await fetchMultipleUsers([99]);

            expect(users).toHaveLength(1);
            expect(users[0].id).toBe(99);
        });
    });

    // ===== COMPARACIÓN DE MÉTODOS =====
    describe('Comparación de métodos', () => {
        test('handleAsyncOperation y handleAsyncOperationWithAwait deben producir el mismo resultado', async () => {
            // Propósito: Verificar que .then() y async/await producen resultados idénticos
            // Entrada: Ambas funciones con el mismo userId
            // Esperado: Deben retornar exactamente el mismo resultado
            const userId = 999;
            const result1 = await handleAsyncOperation(userId);
            const result2 = await handleAsyncOperationWithAwait(userId);

            expect(result1).toBe(result2);
            expect(result1).toBe('Processed: User 999');
        });
    });
});

