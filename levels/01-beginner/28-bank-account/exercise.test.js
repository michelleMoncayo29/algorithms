const { BankAccount } = require('./exercise');

describe('Sistema de Cuenta Bancaria', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos', () => {
        test('crea una cuenta con saldo inicial correctamente', () => {
            // Este test verifica que el constructor asigna correctamente las propiedades básicas.
            // Se espera que al crear una cuenta con un titular y saldo inicial, estos valores se guarden correctamente.
            const account = new BankAccount('Juan Pérez', 1000);
            expect(account.accountHolder).toBe('Juan Pérez');
            expect(account.balance).toBe(1000);
        });

        test('crea una cuenta sin saldo inicial (default 0)', () => {
            // Este test verifica que cuando no se proporciona saldo inicial, se asigne 0 por defecto.
            // El comportamiento esperado es que la cuenta se cree con saldo 0 si no se especifica otro valor.
            const account = new BankAccount('María García');
            expect(account.accountHolder).toBe('María García');
            expect(account.balance).toBe(0);
        });

        test('deposit incrementa el saldo correctamente', () => {
            // Este test verifica que el método deposit aumenta el saldo de la cuenta.
            // Se espera que después de depositar, el saldo se incremente en la cantidad depositada.
            const account = new BankAccount('Carlos López', 500);
            const newBalance = account.deposit(250);
            expect(account.balance).toBe(750);
            expect(newBalance).toBe(750);
        });

        test('withdraw decrementa el saldo correctamente', () => {
            // Este test verifica que el método withdraw disminuye el saldo de la cuenta.
            // Se espera que después de retirar, el saldo se decremente en la cantidad retirada.
            const account = new BankAccount('Ana Martínez', 1000);
            const newBalance = account.withdraw(300);
            expect(account.balance).toBe(700);
            expect(newBalance).toBe(700);
        });

        test('getBalance retorna el saldo actual', () => {
            // Este test verifica que getBalance retorna el valor actual del saldo sin modificarlo.
            // El comportamiento esperado es que siempre retorne el saldo almacenado en la cuenta.
            const account = new BankAccount('Pedro Sánchez', 750);
            expect(account.getBalance()).toBe(750);
            
            account.deposit(100);
            expect(account.getBalance()).toBe(850);
        });

        test('getAccountInfo retorna información formateada correctamente', () => {
            // Este test verifica que getAccountInfo genera un string con el formato esperado.
            // Se espera que incluya el nombre del titular y el saldo formateado con 2 decimales.
            const account = new BankAccount('Luisa Fernández', 1250);
            const info = account.getAccountInfo();
            expect(info).toBe('Account holder: Luisa Fernández, Balance: $1250.00');
        });

        test('getAccountInfo formatea el saldo con 2 decimales', () => {
            // Este test verifica que el saldo siempre se muestre con exactamente 2 decimales.
            // Incluso si el saldo es un número entero, debe mostrarse con formato de 2 decimales.
            const account = new BankAccount('Miguel Torres');
            account.deposit(100);
            const info = account.getAccountInfo();
            expect(info).toContain('$100.00');
        });
    });

    // ===== OPERACIONES MÚLTIPLES =====
    describe('Operaciones múltiples', () => {
        test('permite realizar múltiples depósitos consecutivos', () => {
            // Este test verifica que se pueden realizar varios depósitos seguidos.
            // El saldo debe acumularse correctamente con cada depósito realizado.
            const account = new BankAccount('Roberto Díaz', 200);
            account.deposit(100);
            account.deposit(50);
            account.deposit(75);
            expect(account.getBalance()).toBe(425);
        });

        test('permite realizar múltiples retiros consecutivos', () => {
            // Este test verifica que se pueden realizar varios retiros seguidos.
            // El saldo debe decrementarse correctamente con cada retiro realizado.
            const account = new BankAccount('Sofía Morales', 1000);
            account.withdraw(200);
            account.withdraw(150);
            account.withdraw(100);
            expect(account.getBalance()).toBe(550);
        });

        test('permite realizar depósitos y retiros en cualquier orden', () => {
            // Este test verifica que las operaciones de depósito y retiro funcionan correctamente cuando se intercalan.
            // El saldo debe actualizarse correctamente sin importar el orden de las operaciones.
            const account = new BankAccount('Diego Ruiz', 500);
            account.deposit(200);
            account.withdraw(100);
            account.deposit(50);
            account.withdraw(150);
            expect(account.getBalance()).toBe(500);
        });
    });

    // ===== CASOS LÍMITE Y EDGE CASES =====
    describe('Casos límite y edge cases', () => {
        test('permite retirar exactamente todo el saldo disponible', () => {
            // Este test verifica que se puede retirar todo el saldo de la cuenta.
            // El saldo final debe ser 0 cuando se retira la cantidad exacta del saldo.
            const account = new BankAccount('Elena Vargas', 500);
            account.withdraw(500);
            expect(account.getBalance()).toBe(0);
        });

        test('getAccountInfo funciona correctamente con saldo 0', () => {
            // Este test verifica que getAccountInfo muestra correctamente cuando el saldo es cero.
            // El formato debe mantenerse consistente incluso cuando no hay dinero en la cuenta.
            const account = new BankAccount('Andrés Moreno');
            const info = account.getAccountInfo();
            expect(info).toBe('Account holder: Andrés Moreno, Balance: $0.00');
        });

        test('getAccountInfo mantiene formato correcto después de operaciones', () => {
            // Este test verifica que el formato de getAccountInfo se mantiene correcto después de varias operaciones.
            // El string debe seguir el formato especificado independientemente de las operaciones realizadas.
            const account = new BankAccount('Carmen Jiménez', 100);
            account.deposit(25.5);
            account.withdraw(10);
            const info = account.getAccountInfo();
            expect(info).toMatch(/^Account holder: Carmen Jiménez, Balance: \$[\d]+\.[\d]{2}$/);
        });
    });

    // ===== VALIDACIÓN DE ENTRADAS (FAIL FAST) =====
    describe('Validación de entradas (Fail Fast)', () => {
        test('lanza error cuando el nombre del titular está vacío', () => {
            // Este test verifica que el constructor valida que el nombre no esté vacío.
            // Se espera que lance un error descriptivo cuando el nombre es una cadena vacía o solo espacios.
            expect(() => new BankAccount('', 100)).toThrow('Account holder name is required');
        });

        test('lanza error cuando el nombre del titular es solo espacios', () => {
            // Este test verifica que el constructor rechaza nombres que solo contienen espacios en blanco.
            // El comportamiento esperado es tratar espacios en blanco como nombre inválido.
            expect(() => new BankAccount('   ', 100)).toThrow('Account holder name is required');
        });

        test('lanza error cuando el saldo inicial es negativo', () => {
            // Este test verifica que el constructor valida que el saldo inicial no sea negativo.
            // Se espera que lance un error cuando se intenta crear una cuenta con saldo negativo.
            expect(() => new BankAccount('Juan Pérez', -100)).toThrow('Initial balance cannot be negative');
        });

        test('lanza error cuando se intenta depositar un monto negativo', () => {
            // Este test verifica que deposit valida que el monto sea positivo.
            // Se espera que lance un error descriptivo cuando se intenta depositar un valor negativo.
            const account = new BankAccount('María García', 500);
            expect(() => account.deposit(-50)).toThrow('Deposit amount must be positive');
            expect(account.getBalance()).toBe(500); // El saldo no debe cambiar
        });

        test('lanza error cuando se intenta depositar cero', () => {
            // Este test verifica que deposit rechaza depósitos de cero.
            // El comportamiento esperado es que solo se permitan depósitos positivos.
            const account = new BankAccount('Carlos López', 300);
            expect(() => account.deposit(0)).toThrow('Deposit amount must be positive');
        });

        test('lanza error cuando se intenta retirar un monto negativo', () => {
            // Este test verifica que withdraw valida que el monto sea positivo.
            // Se espera que lance un error descriptivo cuando se intenta retirar un valor negativo.
            const account = new BankAccount('Ana Martínez', 500);
            expect(() => account.withdraw(-100)).toThrow('Withdrawal amount must be positive');
            expect(account.getBalance()).toBe(500); // El saldo no debe cambiar
        });

        test('lanza error cuando se intenta retirar cero', () => {
            // Este test verifica que withdraw rechaza retiros de cero.
            // El comportamiento esperado es que solo se permitan retiros positivos.
            const account = new BankAccount('Pedro Sánchez', 400);
            expect(() => account.withdraw(0)).toThrow('Withdrawal amount must be positive');
        });

        test('lanza error cuando se intenta retirar más de lo disponible', () => {
            // Este test verifica que withdraw valida que haya saldo suficiente antes de retirar.
            // Se espera que lance un error cuando se intenta retirar más dinero del que hay en la cuenta.
            const account = new BankAccount('Luisa Fernández', 200);
            expect(() => account.withdraw(500)).toThrow('Insufficient funds');
            expect(account.getBalance()).toBe(200); // El saldo no debe cambiar
        });

        test('lanza error cuando se intenta retirar exactamente más de lo disponible', () => {
            // Este test verifica que withdraw valida correctamente incluso cuando la diferencia es mínima.
            // Se espera que se valide el saldo disponible antes de permitir cualquier retiro.
            const account = new BankAccount('Miguel Torres', 100);
            expect(() => account.withdraw(100.01)).toThrow('Insufficient funds');
        });
    });

    // ===== CONSISTENCIA DEL ESTADO =====
    describe('Consistencia del estado', () => {
        test('el saldo se mantiene consistente después de múltiples operaciones', () => {
            // Este test verifica que el saldo interno se mantiene correcto después de varias operaciones.
            // Se espera que getBalance siempre refleje el estado real de la cuenta.
            const account = new BankAccount('Roberto Díaz', 1000);
            account.deposit(500);
            expect(account.getBalance()).toBe(1500);
            
            account.withdraw(300);
            expect(account.getBalance()).toBe(1200);
            
            account.deposit(100);
            expect(account.getBalance()).toBe(1300);
        });

        test('getAccountInfo refleja el estado actual después de operaciones', () => {
            // Este test verifica que getAccountInfo siempre muestra el estado más reciente de la cuenta.
            // El string retornado debe reflejar las operaciones realizadas hasta ese momento.
            const account = new BankAccount('Sofía Morales', 500);
            account.deposit(250);
            account.withdraw(100);
            
            const info = account.getAccountInfo();
            expect(info).toBe('Account holder: Sofía Morales, Balance: $650.00');
        });
    });
});

