const BankAccount = require('./exercise');

describe('Gestor de Cuenta Bancaria', () => {
    let account;

    beforeEach(() => {
        account = new BankAccount();
    });

    // Tests del constructor
    test('debe inicializar la cuenta con saldo 0 y array de transacciones vacío', () => {
        expect(account.getBalance()).toBe(0);
        expect(account.getTransactionHistory()).toEqual([]);
        expect(account.accountNumber).toBe('ACC-001');
    });

    test('debe permitir personalizar el número de cuenta', () => {
        const customAccount = new BankAccount('CUSTOM-123');
        expect(customAccount.accountNumber).toBe('CUSTOM-123');
    });

    // Tests de depósitos
    test('debe realizar depósitos válidos correctamente', () => {
        const result = account.deposit(1000);
        expect(result).toBe(1000);
        expect(account.getBalance()).toBe(1000);
        
        const history = account.getTransactionHistory();
        expect(history).toHaveLength(1);
        expect(history[0]).toMatchObject({
            type: 'deposit',
            amount: 1000,
            balance: 1000
        });
        expect(history[0].timestamp).toBeInstanceOf(Date);
    });

    test('debe acumular múltiples depósitos', () => {
        account.deposit(500);
        account.deposit(300);
        account.deposit(200);
        
        expect(account.getBalance()).toBe(1000);
        expect(account.getTransactionHistory()).toHaveLength(3);
    });

    test('debe rechazar depósitos con montos negativos', () => {
        const result = account.deposit(-100);
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(0);
        expect(account.getTransactionHistory()).toHaveLength(0);
    });

    test('debe rechazar depósitos con monto cero', () => {
        const result = account.deposit(0);
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(0);
        expect(account.getTransactionHistory()).toHaveLength(0);
    });

    test('debe rechazar depósitos con valores no numéricos', () => {
        const result = account.deposit('invalid');
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(0);
    });

    // Tests de retiros
    test('debe realizar retiros válidos correctamente', () => {
        account.deposit(1000);
        const result = account.withdraw(300);
        
        expect(result).toBe(700);
        expect(account.getBalance()).toBe(700);
        
        const history = account.getTransactionHistory();
        expect(history).toHaveLength(2);
        expect(history[1]).toMatchObject({
            type: 'withdraw',
            amount: 300,
            balance: 700
        });
    });

    test('debe permitir retiros que agoten el saldo', () => {
        account.deposit(500);
        const result = account.withdraw(500);
        
        expect(result).toBe(0);
        expect(account.getBalance()).toBe(0);
    });

    test('debe rechazar retiros con saldo insuficiente', () => {
        account.deposit(300);
        const result = account.withdraw(500);
        
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(300);
        expect(account.getTransactionHistory()).toHaveLength(1);
    });

    test('debe rechazar retiros con montos negativos', () => {
        account.deposit(1000);
        const result = account.withdraw(-100);
        
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(1000);
        expect(account.getTransactionHistory()).toHaveLength(1);
    });

    test('debe rechazar retiros con monto cero', () => {
        account.deposit(1000);
        const result = account.withdraw(0);
        
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(1000);
        expect(account.getTransactionHistory()).toHaveLength(1);
    });

    test('debe rechazar retiros con valores no numéricos', () => {
        account.deposit(1000);
        const result = account.withdraw('invalid');
        
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(1000);
    });

    // Tests de consulta de saldo
    test('debe retornar el saldo correcto después de operaciones', () => {
        expect(account.getBalance()).toBe(0);
        
        account.deposit(1000);
        expect(account.getBalance()).toBe(1000);
        
        account.withdraw(300);
        expect(account.getBalance()).toBe(700);
        
        account.deposit(200);
        expect(account.getBalance()).toBe(900);
    });

    // Tests de historial de transacciones
    test('debe mantener el historial completo de transacciones', () => {
        account.deposit(1000);
        account.withdraw(300);
        account.deposit(200);
        account.withdraw(100);
        
        const history = account.getTransactionHistory();
        expect(history).toHaveLength(4);
        
        // Verificar estructura de cada transacción
        history.forEach(transaction => {
            expect(transaction).toHaveProperty('type');
            expect(transaction).toHaveProperty('amount');
            expect(transaction).toHaveProperty('balance');
            expect(transaction).toHaveProperty('timestamp');
            expect(['deposit', 'withdraw']).toContain(transaction.type);
            expect(typeof transaction.amount).toBe('number');
            expect(typeof transaction.balance).toBe('number');
            expect(transaction.timestamp).toBeInstanceOf(Date);
        });
    });

    test('debe registrar transacciones en orden cronológico', () => {
        account.deposit(1000);
        account.withdraw(300);
        account.deposit(200);
        
        const history = account.getTransactionHistory();
        expect(history[0].type).toBe('deposit');
        expect(history[0].amount).toBe(1000);
        expect(history[0].balance).toBe(1000);
        
        expect(history[1].type).toBe('withdraw');
        expect(history[1].amount).toBe(300);
        expect(history[1].balance).toBe(700);
        
        expect(history[2].type).toBe('deposit');
        expect(history[2].amount).toBe(200);
        expect(history[2].balance).toBe(900);
    });

    // Tests de cálculo de interés
    test('debe calcular interés simple correctamente', () => {
        account.deposit(1000);
        
        // 5% anual por 12 meses
        const interest = account.calculateInterest(5, 12);
        expect(interest).toBe(50); // (1000 * 5 * 12) / (100 * 12) = 50
    });

    test('debe calcular interés con diferentes tasas y períodos', () => {
        account.deposit(2000);
        
        // 10% anual por 6 meses
        const interest1 = account.calculateInterest(10, 6);
        expect(interest1).toBe(100); // (2000 * 10 * 6) / (100 * 12) = 100
        
        // 3% anual por 24 meses
        const interest2 = account.calculateInterest(3, 24);
        expect(interest2).toBe(120); // (2000 * 3 * 24) / (100 * 12) = 120
    });

    test('debe calcular interés con saldo cero', () => {
        const interest = account.calculateInterest(5, 12);
        expect(interest).toBe(0);
    });

    test('debe manejar tasas de interés decimales', () => {
        account.deposit(1000);
        
        // 2.5% anual por 12 meses
        const interest = account.calculateInterest(2.5, 12);
        expect(interest).toBe(25); // (1000 * 2.5 * 12) / (100 * 12) = 25
    });

    test('debe rechazar tasas de interés negativas', () => {
        account.deposit(1000);
        const interest = account.calculateInterest(-5, 12);
        expect(interest).toBe(0);
    });

    test('debe rechazar períodos negativos', () => {
        account.deposit(1000);
        const interest = account.calculateInterest(5, -12);
        expect(interest).toBe(0);
    });

    test('debe rechazar tasas de interés cero', () => {
        account.deposit(1000);
        const interest = account.calculateInterest(0, 12);
        expect(interest).toBe(0);
    });

    test('debe rechazar períodos cero', () => {
        account.deposit(1000);
        const interest = account.calculateInterest(5, 0);
        expect(interest).toBe(0);
    });

    // Tests de casos edge
    test('debe manejar operaciones con decimales', () => {
        account.deposit(1000.50);
        expect(account.getBalance()).toBe(1000.50);
        
        account.withdraw(300.25);
        expect(account.getBalance()).toBe(700.25);
    });

    test('debe manejar múltiples cuentas independientes', () => {
        const account1 = new BankAccount('ACC-001');
        const account2 = new BankAccount('ACC-002');
        
        account1.deposit(1000);
        account2.deposit(500);
        
        expect(account1.getBalance()).toBe(1000);
        expect(account2.getBalance()).toBe(500);
        expect(account1.getTransactionHistory()).toHaveLength(1);
        expect(account2.getTransactionHistory()).toHaveLength(1);
    });

    test('debe manejar secuencia compleja de operaciones', () => {
        // Depósito inicial
        account.deposit(1000);
        expect(account.getBalance()).toBe(1000);
        
        // Retiro parcial
        account.withdraw(200);
        expect(account.getBalance()).toBe(800);
        
        // Depósito adicional
        account.deposit(300);
        expect(account.getBalance()).toBe(1100);
        
        // Retiro que agota el saldo
        account.withdraw(1100);
        expect(account.getBalance()).toBe(0);
        
        // Intento de retiro sin saldo
        const result = account.withdraw(100);
        expect(result).toBe(null);
        expect(account.getBalance()).toBe(0);
        
        // Verificar historial completo
        const history = account.getTransactionHistory();
        expect(history).toHaveLength(4);
        expect(history[0].balance).toBe(1000);
        expect(history[1].balance).toBe(800);
        expect(history[2].balance).toBe(1100);
        expect(history[3].balance).toBe(0);
    });
});
