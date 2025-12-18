const { Member, Gym } = require('./exercise');

describe('Sistema de Gestión de Gimnasio', () => {
    // ===== CLASE MEMBER =====
    describe('Clase Member', () => {
        // ===== CASOS BÁSICOS =====
        describe('Casos básicos', () => {
            test('crea un miembro con todos los datos correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades básicas
                // Entrada: id='M001', name='Juan Pérez', email='juan@email.com', membershipType='premium', startDate=new Date('2024-01-15')
                // Esperado: Member creado con todas las propiedades correctas, checkIns inicializado como array vacío
                const startDate = new Date('2024-01-15');
                const member = new Member('M001', 'Juan Pérez', 'juan@email.com', 'premium', startDate);
                expect(member.id).toBe('M001');
                expect(member.name).toBe('Juan Pérez');
                expect(member.email).toBe('juan@email.com');
                expect(member.membershipType).toBe('premium');
                expect(member.startDate).toBe(startDate);
                expect(Array.isArray(member.checkIns)).toBe(true);
                expect(member.checkIns.length).toBe(0);
            });

            test('registra una entrada correctamente', () => {
                // Propósito: Verificar que checkIn agrega una entrada al historial
                // Entrada: Llamar checkIn() en un miembro
                // Esperado: Entrada agregada al array checkIns con fecha actual
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                const checkInDate = member.checkIn();
                expect(member.checkIns.length).toBe(1);
                expect(checkInDate).toBeInstanceOf(Date);
                expect(member.checkIns[0].date).toBeInstanceOf(Date);
            });

            test('obtiene el historial de entradas sin mutar el original', () => {
                // Propósito: Verificar que getCheckInHistory retorna una copia del array
                // Entrada: Miembro con entradas registradas
                // Esperado: Retorna array con entradas, pero no muta el original
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                member.checkIn();
                const history = member.getCheckInHistory();
                history.push({ date: new Date() });
                expect(member.checkIns.length).toBe(1);
            });

            test('calcula el total de visitas correctamente', () => {
                // Propósito: Verificar que getTotalVisits retorna el número correcto de entradas
                // Entrada: Miembro con 3 entradas registradas
                // Esperado: Retorna 3
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                member.checkIn();
                member.checkIn();
                member.checkIn();
                expect(member.getTotalVisits()).toBe(3);
            });

            test('calcula la cuota de membresía básica correctamente', () => {
                // Propósito: Verificar que getMembershipFee retorna $30 para membresía basic
                // Entrada: membershipType='basic'
                // Esperado: Retorna 30
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                expect(member.getMembershipFee()).toBe(30);
            });

            test('calcula la cuota de membresía premium correctamente', () => {
                // Propósito: Verificar que getMembershipFee retorna $50 para membresía premium
                // Entrada: membershipType='premium'
                // Esperado: Retorna 50
                const member = new Member('M001', 'Juan', 'juan@email.com', 'premium', new Date());
                expect(member.getMembershipFee()).toBe(50);
            });

            test('calcula la cuota de membresía vip correctamente', () => {
                // Propósito: Verificar que getMembershipFee retorna $80 para membresía vip
                // Entrada: membershipType='vip'
                // Esperado: Retorna 80
                const member = new Member('M001', 'Juan', 'juan@email.com', 'vip', new Date());
                expect(member.getMembershipFee()).toBe(80);
            });

            test('verifica que una membresía nueva está activa', () => {
                // Propósito: Verificar que isMembershipActive retorna true para membresía reciente
                // Entrada: startDate = fecha reciente (menos de 12 meses)
                // Esperado: Retorna true
                const recentDate = new Date();
                recentDate.setMonth(recentDate.getMonth() - 2); // 2 meses atrás
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', recentDate);
                expect(member.isMembershipActive()).toBe(true);
            });

            test('verifica que una membresía vieja está vencida', () => {
                // Propósito: Verificar que isMembershipActive retorna false para membresía vencida
                // Entrada: startDate = fecha antigua (más de 12 meses)
                // Esperado: Retorna false
                const oldDate = new Date();
                oldDate.setMonth(oldDate.getMonth() - 13); // 13 meses atrás
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', oldDate);
                expect(member.isMembershipActive()).toBe(false);
            });

            test('renueva la membresía correctamente', () => {
                // Propósito: Verificar que renewMembership actualiza la fecha de inicio
                // Entrada: months=6
                // Esperado: startDate actualizado, nueva fecha de vencimiento calculada
                const startDate = new Date('2024-01-15');
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', startDate);
                const newStartDate = member.renewMembership(6);
                expect(member.startDate.getTime()).toBeGreaterThan(startDate.getTime());
                expect(newStartDate).toBeInstanceOf(Date);
            });

            test('calcula los días desde que se unió correctamente', () => {
                // Propósito: Verificar que getDaysSinceJoined calcula la diferencia en días
                // Entrada: startDate = 10 días atrás
                // Esperado: Retorna aproximadamente 10
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - 10);
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', startDate);
                const days = member.getDaysSinceJoined();
                expect(days).toBeGreaterThanOrEqual(9);
                expect(days).toBeLessThanOrEqual(11);
            });

            test('obtiene la fecha de vencimiento correctamente', () => {
                // Propósito: Verificar que getMembershipExpiryDate retorna fecha 12 meses después
                // Entrada: startDate = '2024-01-15'
                // Esperado: Retorna fecha de '2025-01-15'
                const startDate = new Date('2024-01-15');
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', startDate);
                const expiryDate = member.getMembershipExpiryDate();
                expect(expiryDate.getFullYear()).toBe(2025);
                expect(expiryDate.getMonth()).toBe(0); // Enero
                expect(expiryDate.getDate()).toBe(15);
            });
        });

        // ===== VALIDACIÓN DE ENTRADAS (FAIL FAST) =====
        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el ID está vacío', () => {
                // Propósito: Verificar validación de ID no vacío en constructor
                // Entrada: id=''
                // Esperado: Error "Member ID is required"
                expect(() => new Member('', 'Juan', 'juan@email.com', 'basic', new Date())).toThrow('Member ID is required');
            });

            test('lanza error cuando el nombre está vacío', () => {
                // Propósito: Verificar validación de nombre no vacío en constructor
                // Entrada: name=''
                // Esperado: Error "Member name is required"
                expect(() => new Member('M001', '', 'juan@email.com', 'basic', new Date())).toThrow('Member name is required');
            });

            test('lanza error cuando el email está vacío', () => {
                // Propósito: Verificar validación de email no vacío en constructor
                // Entrada: email=''
                // Esperado: Error "Member email is required"
                expect(() => new Member('M001', 'Juan', '', 'basic', new Date())).toThrow('Member email is required');
            });

            test('lanza error cuando el tipo de membresía es inválido', () => {
                // Propósito: Verificar validación de membershipType válido en constructor
                // Entrada: membershipType='invalid'
                // Esperado: Error "Membership type must be 'basic', 'premium', or 'vip'"
                expect(() => new Member('M001', 'Juan', 'juan@email.com', 'invalid', new Date())).toThrow("Membership type must be 'basic', 'premium', or 'vip'");
            });

            test('lanza error cuando startDate no es una instancia de Date', () => {
                // Propósito: Verificar validación de startDate como Date en constructor
                // Entrada: startDate='2024-01-15' (string)
                // Esperado: Error "Start date must be a Date object"
                expect(() => new Member('M001', 'Juan', 'juan@email.com', 'basic', '2024-01-15')).toThrow('Start date must be a Date object');
            });

            test('lanza error cuando months en renewMembership es inválido', () => {
                // Propósito: Verificar validación de months > 0 en renewMembership
                // Entrada: months=0 o negativo
                // Esperado: Error "Months must be greater than 0"
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                expect(() => member.renewMembership(0)).toThrow('Months must be greater than 0');
                expect(() => member.renewMembership(-1)).toThrow('Months must be greater than 0');
            });
        });
    });

    // ===== CLASE GYM =====
    describe('Clase Gym', () => {
        // ===== CASOS BÁSICOS =====
        describe('Casos básicos', () => {
            test('crea un gimnasio con nombre y dirección correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades básicas
                // Entrada: name='FitZone', address='Calle Principal 123'
                // Esperado: Gym creado con name y address correctos, members inicializado como array vacío
                const gym = new Gym('FitZone', 'Calle Principal 123');
                expect(gym.name).toBe('FitZone');
                expect(gym.address).toBe('Calle Principal 123');
                expect(Array.isArray(gym.members)).toBe(true);
                expect(gym.members.length).toBe(0);
            });

            test('registra un miembro correctamente', () => {
                // Propósito: Verificar que registerMember agrega un miembro válido
                // Entrada: member (instancia de Member)
                // Esperado: Miembro agregado al array members y retornado
                const gym = new Gym('FitZone', 'Dirección');
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                const added = gym.registerMember(member);
                expect(gym.members.length).toBe(1);
                expect(added).toBe(member);
            });

            test('encuentra un miembro por ID correctamente', () => {
                // Propósito: Verificar que findMember busca y retorna un miembro existente
                // Entrada: memberId='M001' que existe
                // Esperado: Retorna el miembro encontrado
                const gym = new Gym('FitZone', 'Dirección');
                const member = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                gym.registerMember(member);
                const found = gym.findMember('M001');
                expect(found).toBe(member);
            });

            test('retorna null cuando no encuentra un miembro', () => {
                // Propósito: Verificar que findMember retorna null cuando el miembro no existe
                // Entrada: memberId='M999' que no existe
                // Esperado: Retorna null
                const gym = new Gym('FitZone', 'Dirección');
                expect(gym.findMember('M999')).toBeNull();
            });

            test('obtiene miembros por tipo correctamente', () => {
                // Propósito: Verificar que getMembersByType filtra por tipo de membresía
                // Entrada: membershipType='premium'
                // Esperado: Retorna solo miembros con ese tipo
                const gym = new Gym('FitZone', 'Dirección');
                const member1 = new Member('M001', 'Juan', 'juan@email.com', 'premium', new Date());
                const member2 = new Member('M002', 'María', 'maria@email.com', 'basic', new Date());
                const member3 = new Member('M003', 'Carlos', 'carlos@email.com', 'premium', new Date());
                gym.registerMember(member1);
                gym.registerMember(member2);
                gym.registerMember(member3);
                const premiumMembers = gym.getMembersByType('premium');
                expect(premiumMembers.length).toBe(2);
                expect(premiumMembers.every(m => m.membershipType === 'premium')).toBe(true);
            });

            test('obtiene miembros activos correctamente', () => {
                // Propósito: Verificar que getActiveMembers filtra solo miembros con membresía activa
                // Entrada: Miembros con membresías activas y vencidas
                // Esperado: Retorna solo miembros activos
                const gym = new Gym('FitZone', 'Dirección');
                const recentDate = new Date();
                recentDate.setMonth(recentDate.getMonth() - 2);
                const oldDate = new Date();
                oldDate.setMonth(oldDate.getMonth() - 13);
                const activeMember = new Member('M001', 'Juan', 'juan@email.com', 'basic', recentDate);
                const inactiveMember = new Member('M002', 'María', 'maria@email.com', 'basic', oldDate);
                gym.registerMember(activeMember);
                gym.registerMember(inactiveMember);
                const activeMembers = gym.getActiveMembers();
                expect(activeMembers.length).toBe(1);
                expect(activeMembers[0]).toBe(activeMember);
            });

            test('calcula los ingresos totales correctamente', () => {
                // Propósito: Verificar que getTotalRevenue suma las cuotas de todos los miembros
                // Entrada: Miembros con diferentes tipos de membresía
                // Esperado: Suma de todas las cuotas (30 + 50 + 80 = 160)
                const gym = new Gym('FitZone', 'Dirección');
                const member1 = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                const member2 = new Member('M002', 'María', 'maria@email.com', 'premium', new Date());
                const member3 = new Member('M003', 'Carlos', 'carlos@email.com', 'vip', new Date());
                gym.registerMember(member1);
                gym.registerMember(member2);
                gym.registerMember(member3);
                expect(gym.getTotalRevenue()).toBe(160);
            });

            test('calcula el promedio de visitas correctamente', () => {
                // Propósito: Verificar que getAverageVisitsPerMember calcula el promedio
                // Entrada: Miembros con diferentes números de visitas
                // Esperado: Promedio = (2 + 1) / 2 = 1.50
                const gym = new Gym('FitZone', 'Dirección');
                const member1 = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                const member2 = new Member('M002', 'María', 'maria@email.com', 'basic', new Date());
                member1.checkIn();
                member1.checkIn();
                member2.checkIn();
                gym.registerMember(member1);
                gym.registerMember(member2);
                const average = gym.getAverageVisitsPerMember();
                expect(average).toBe('1.50');
            });

            test('obtiene estadísticas completas del gimnasio', () => {
                // Propósito: Verificar que getGymStatistics retorna todas las estadísticas
                // Entrada: Gimnasio con varios miembros
                // Esperado: Objeto con todas las estadísticas solicitadas
                const gym = new Gym('FitZone', 'Dirección');
                const member1 = new Member('M001', 'Juan', 'juan@email.com', 'premium', new Date());
                const member2 = new Member('M002', 'María', 'maria@email.com', 'basic', new Date());
                gym.registerMember(member1);
                gym.registerMember(member2);
                const stats = gym.getGymStatistics();
                expect(stats.totalMembers).toBe(2);
                expect(stats.activeMembers).toBe(2);
                expect(stats.membersByType.basic).toBe(1);
                expect(stats.membersByType.premium).toBe(1);
                expect(stats.totalRevenue).toBe(80);
            });
        });

        // ===== VALIDACIÓN DE ENTRADAS (FAIL FAST) =====
        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre del gimnasio está vacío', () => {
                // Propósito: Verificar validación de name no vacío en constructor
                // Entrada: name=''
                // Esperado: Error "Gym name is required"
                expect(() => new Gym('', 'Dirección')).toThrow('Gym name is required');
            });

            test('lanza error cuando la dirección está vacía', () => {
                // Propósito: Verificar validación de address no vacío en constructor
                // Entrada: address=''
                // Esperado: Error "Gym address is required"
                expect(() => new Gym('FitZone', '')).toThrow('Gym address is required');
            });

            test('lanza error cuando member no es una instancia de Member', () => {
                // Propósito: Verificar validación de instancia de Member en registerMember
                // Entrada: member={} (objeto inválido)
                // Esperado: Error "Member must be an instance of Member"
                const gym = new Gym('FitZone', 'Dirección');
                expect(() => gym.registerMember({})).toThrow('Member must be an instance of Member');
            });

            test('lanza error cuando se intenta registrar un miembro duplicado', () => {
                // Propósito: Verificar validación de miembros duplicados en registerMember
                // Entrada: Registrar dos miembros con el mismo ID
                // Esperado: Error "Member already registered" en el segundo intento
                const gym = new Gym('FitZone', 'Dirección');
                const member1 = new Member('M001', 'Juan', 'juan@email.com', 'basic', new Date());
                gym.registerMember(member1);
                const member2 = new Member('M001', 'María', 'maria@email.com', 'basic', new Date());
                expect(() => gym.registerMember(member2)).toThrow('Member already registered');
            });

            test('lanza error cuando date en getDailyAttendance no es Date', () => {
                // Propósito: Verificar validación de date como Date en getDailyAttendance
                // Entrada: date='2024-01-15' (string)
                // Esperado: Error "Date must be a Date object"
                const gym = new Gym('FitZone', 'Dirección');
                expect(() => gym.getDailyAttendance('2024-01-15')).toThrow('Date must be a Date object');
            });
        });

        // ===== CASOS LÍMITE =====
        describe('Casos límite', () => {
            test('retorna 0 cuando no hay miembros para calcular ingresos', () => {
                // Propósito: Verificar que getTotalRevenue retorna 0 cuando no hay miembros
                // Entrada: Gimnasio sin miembros
                // Esperado: Revenue = 0
                const gym = new Gym('FitZone', 'Dirección');
                expect(gym.getTotalRevenue()).toBe(0);
            });

            test('retorna 0 cuando no hay miembros para calcular promedio', () => {
                // Propósito: Verificar que getAverageVisitsPerMember retorna 0 cuando no hay miembros
                // Entrada: Gimnasio sin miembros
                // Esperado: Promedio = 0
                const gym = new Gym('FitZone', 'Dirección');
                expect(gym.getAverageVisitsPerMember()).toBe('0.00');
            });

            test('retorna false cuando se intenta eliminar un miembro inexistente', () => {
                // Propósito: Verificar que removeMember retorna false cuando el miembro no existe
                // Entrada: memberId='M999' que no existe
                // Esperado: Retorna false
                const gym = new Gym('FitZone', 'Dirección');
                expect(gym.removeMember('M999')).toBe(false);
            });
        });
    });
});

