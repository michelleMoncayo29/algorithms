/**
 * Sistema de Gestión de Gimnasio (Gym Management System)
 *
 * Descripción: Implementa dos clases básicas (`Member` y `Gym`) para practicar
 * constructores, métodos de instancia, validaciones complejas, manejo de fechas,
 * cálculos basados en tipos de membresía y gestión de colecciones.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce
 */

/**
 * Representa un miembro del gimnasio.
 * Traducción: Miembro
 * @class
 */
class Member {
    /**
     * Constructor de la clase Member
     * Traducción: Constructor de Miembro
     *
     * Crea un nuevo miembro con ID, nombre, email, tipo de membresía y fecha de inicio.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} id - ID único del miembro (no puede estar vacío)
     * @param {string} name - Nombre del miembro (no puede estar vacío)
     * @param {string} email - Email del miembro (no puede estar vacío)
     * @param {string} membershipType - Tipo de membresía ('basic', 'premium', 'vip')
     * @param {Date} startDate - Fecha de inicio de la membresía (debe ser una instancia de Date)
     *
     * TODO:
     * - Valida que id sea un string no vacío (después de trim)
     * - Lanza error "Member ID is required" si el ID es inválido
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Member name is required" si el nombre es inválido
     * - Valida que email sea un string no vacío (después de trim)
     * - Lanza error "Member email is required" si el email es inválido
     * - Valida que membershipType sea uno de: 'basic', 'premium', 'vip'
     * - Lanza error "Membership type must be 'basic', 'premium', or 'vip'" si el tipo es inválido
     * - Valida que startDate sea una instancia de Date
     * - Lanza error "Start date must be a Date object" si la fecha es inválida
     * - Inicializa this.checkIns como un array vacío []
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(id, name, email, membershipType, startDate) {
        if (typeof id !== 'string' || id.trim() === '') throw new Error('Member ID is required');
        if (typeof name !== 'string' || name.trim() === '') throw new Error('Member name is required');
        if (typeof email !== 'string' || email.trim() === '') throw new Error('Member email is required');
        // ... resto del código

        if (!['basic', 'premium', 'vip'].includes(membershipType)) {
            throw new Error("Membership type must be 'basic', 'premium', or 'vip'");
        }

        if (!(startDate instanceof Date)) {
            throw new Error("Start date must be a Date object");
        }

        this.checkIns = [];
        this.id = id;
        this.name = name;
        this.email = email;
        this.membershipType = membershipType;
        this.startDate = startDate;
    }

    /**
     * Registra una entrada al gimnasio.
     * Traducción: Registrar Entrada
     *
     * Este método registra una entrada del miembro al gimnasio con la fecha y hora actual.
     * Cada entrada se guarda como un objeto con fecha y hora.
     *
     * @returns {Date} La fecha y hora de la entrada registrada
     *
     * TODO:
     * - Crea un objeto con la fecha actual: { date: new Date() }
     * - Agrega el objeto al array this.checkIns usando push()
     * - Retorna la fecha de la entrada registrada
     */
    checkIn() {
        const checkInDate = new Date();
        const checkInRecord = { date: checkInDate };
        this.checkIns.push(checkInRecord);
        return checkInDate;
    }

    /**
     * Obtiene el historial de entradas.
     * Traducción: Obtener Historial de Entradas
     *
     * Este método retorna un nuevo array con todas las entradas registradas.
     * No debe mutar el array original.
     *
     * @returns {Object[]} Array con el historial de entradas
     *
     * TODO:
     * - Retorna una copia del array this.checkIns usando spread operator [...]
     * - Esto asegura que no se modifique el array original
     */
    getCheckInHistory() {
        return [...this.checkIns];
    }

    /**
     * Calcula el total de visitas.
     * Traducción: Obtener Total de Visitas
     *
     * Este método retorna el número total de entradas registradas.
     *
     * @returns {number} Total de visitas
     *
     * TODO:
     * - Retorna this.checkIns.length
     */
    getTotalVisits() {
        return this.checkIns.length;
    }

    /**
     * Calcula la cuota de membresía según el tipo.
     * Traducción: Obtener Cuota de Membresía
     *
     * Este método retorna la cuota mensual según el tipo de membresía:
     * - 'basic': $30
     * - 'premium': $50
     * - 'vip': $80
     *
     * @returns {number} Cuota mensual de la membresía
     *
     * TODO:
     * - Usa un switch o if/else para determinar la cuota según this.membershipType
     * - Retorna el valor correspondiente
     */
    getMembershipFee() {
        switch (this.membershipType) {
            case 'basic':
                return 30;
            case 'premium':
                return 50;
            case 'vip':
                return 80;
            default:
                return 0; // Esto no debería ocurrir debido a la validación en el constructor
        }
    }

    /**
     * Verifica si la membresía está activa (no vencida).
     * Traducción: Verificar si Membresía está Activa
     *
     * Una membresía está activa si han pasado menos de 12 meses desde la fecha de inicio.
     * Este método compara la fecha actual con la fecha de inicio más 12 meses.
     *
     * @returns {boolean} true si la membresía está activa, false si está vencida
     *
     * TODO:
     * - Calcula la fecha de vencimiento: 12 meses después de this.startDate
     * - Crea una nueva fecha sumando 12 meses a startDate
     * - Compara la fecha actual con la fecha de vencimiento
     * - Retorna true si la fecha actual es anterior a la fecha de vencimiento
     */
    isMembershipActive() {
        const expiryDate = this.getMembershipExpiryDate();
        // Es más simple comparar directamente los objetos Date
        return new Date() < expiryDate;
    }

    /**
     * Renueva la membresía por N meses.
     * Traducción: Renovar Membresía
     *
     * Este método actualiza la fecha de inicio sumando los meses especificados.
     * Debe validar que los meses sean un número positivo.
     *
     * @param {number} months - Número de meses a renovar (debe ser mayor que 0)
     * @returns {Date} La nueva fecha de inicio después de la renovación
     *
     * TODO:
     * - Valida que months sea un número mayor que 0
     * - Lanza error "Months must be greater than 0" si los meses son inválidos
     * - Crea una nueva fecha basada en this.startDate
     * - Suma los meses especificados a la fecha
     * - Actualiza this.startDate con la nueva fecha
     * - Retorna la nueva fecha de inicio
     */
    renewMembership(months) {
        if(typeof months !== 'number' || months <= 0) {
            throw new Error('Months must be greater than 0');
        }

        // se creo la nueva fecha sumando los meses
        const newStartDate = new Date(this.startDate);
        newStartDate.setMonth(newStartDate.getMonth() + months);
        this.startDate = newStartDate;
        return this.startDate;
    }

    /**
     * Calcula los días desde que se unió al gimnasio.
     * Traducción: Obtener Días desde Inicio
     *
     * Este método calcula la diferencia en días entre la fecha actual y la fecha de inicio.
     *
     * @returns {number} Número de días desde que se unió
     *
     * TODO:
     * - Calcula la diferencia en milisegundos: new Date() - this.startDate
     * - Convierte a días: diferencia / (1000 * 60 * 60 * 24)
     * - Usa Math.floor() para obtener días enteros
     * - Retorna el número de días
     */
    getDaysSinceJoined() {
        const millisecondsPerDay = new Date() - this.startDate;
        const diferences = millisecondsPerDay / (1000 * 60 * 60 * 24);
        return Math.floor(diferences);
    }

    /**
     * Obtiene la fecha de vencimiento de la membresía.
     * Traducción: Obtener Fecha de Vencimiento
     *
     * Este método calcula y retorna la fecha de vencimiento (12 meses después de la fecha de inicio).
     *
     * @returns {Date} Fecha de vencimiento de la membresía
     *
     * TODO:
     * - Crea una nueva fecha basada en this.startDate
     * - Suma 12 meses a la fecha
     * - Retorna la fecha de vencimiento
     */
    getMembershipExpiryDate() {
        const newDate = new Date(this.startDate);
        newDate.setMonth(newDate.getMonth() + 12);
        return newDate;
    }
}

/**
 * Gestiona el gimnasio y sus miembros.
 * Traducción: Gimnasio
 * @class
 */
class Gym {
    /**
     * Constructor de la clase Gym
     * Traducción: Constructor de Gimnasio
     *
     * Crea un nuevo gimnasio con nombre y dirección.
     * Inicializa arrays vacíos para miembros.
     *
     * @param {string} name - Nombre del gimnasio (no puede estar vacío)
     * @param {string} address - Dirección del gimnasio (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Gym name is required" si el nombre es inválido
     * - Valida que address sea un string no vacío (después de trim)
     * - Lanza error "Gym address is required" si la dirección es inválida
     * - Inicializa this.members como un array vacío []
     * - Asigna los valores validados a this.name y this.address
     */
    constructor(name, address) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Gym name is required');
        }

        if (address.trim() === '' || typeof address !== 'string') {
            throw new Error('Gym address is required');
        }

        this.members = [];
        this.name = name;
        this.address = address;
    }

    /**
     * Registra un nuevo miembro en el gimnasio.
     * Traducción: Registrar Miembro
     *
     * Este método agrega un miembro al gimnasio. Debe validar que sea una instancia de Member
     * y que no exista ya un miembro con el mismo ID.
     *
     * @param {Member} member - Instancia de Member a registrar
     * @returns {Member} El miembro registrado
     *
     * TODO:
     * - Valida que member sea una instancia de Member
     * - Lanza error "Member must be an instance of Member" si es inválido
     * - Usa findMember() para verificar si ya existe un miembro con ese ID
     * - Si el miembro existe, lanza un error: "Member already registered"
     * - Agrega el miembro al array this.members usando push()
     * - Retorna el miembro agregado
     */
    registerMember(member) {
        if(!(member instanceof Member)) {
            throw new Error('Member must be an instance of Member');
        }

        const existingMember = this.findMember(member.id);
        if(existingMember) {
            throw new Error('Member already registered');
        }

        this.members.push(member);
        return member;
    }

    /**
     * Busca un miembro por ID usando find().
     * Traducción: Buscar Miembro
     *
     * Este método busca un miembro cuyo id coincida exactamente con el parámetro recibido.
     *
     * @param {string} memberId - ID del miembro a buscar
     * @returns {Member|null} El miembro encontrado o null si no existe
     *
     * TODO:
     * - Usa this.members.find() para buscar un miembro cuyo id coincida exactamente
     * - Retorna el miembro encontrado o null si no se encuentra
     */
    findMember(memberId) {
        const item = this.members.find(member => member.id === memberId);
        return item || null;
    }

    /**
     * Elimina un miembro del gimnasio.
     * Traducción: Eliminar Miembro
     *
     * Este método elimina un miembro del gimnasio buscándolo por ID.
     *
     * @param {string} memberId - ID del miembro a eliminar
     * @returns {boolean} true si se eliminó correctamente
     *
     * TODO:
     * - Usa findMember() para buscar el miembro por ID
     * - Si no se encuentra, retorna false
     * - Encuentra el índice del miembro usando findIndex()
     * - Elimina el miembro del array usando splice()
     * - Retorna true si se eliminó correctamente
     */
    removeMember(memberId) {
        if(!this.findMember(memberId)) {
            return false;
        }

        const index = this.members.findIndex(member => member.id === memberId);
        this.members.splice(index, 1);
        return true;
    }

    /**
     * Obtiene todos los miembros de un tipo específico usando filter().
     * Traducción: Obtener Miembros por Tipo
     *
     * Este método retorna un nuevo array con todos los miembros del tipo especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} membershipType - Tipo de membresía a filtrar
     * @returns {Member[]} Array con los miembros de ese tipo
     *
     * TODO:
     * - Usa this.members.filter() para filtrar miembros
     * - Filtra miembros donde member.membershipType === membershipType
     * - Retorna el nuevo array filtrado
     */
    getMembersByType(membershipType) {
        const filteredMembers = this.members.filter(member => member.membershipType === membershipType);
        return filteredMembers;
    }

    /**
     * Obtiene todos los miembros con membresía activa usando filter().
     * Traducción: Obtener Miembros Activos
     *
     * Este método retorna un nuevo array con todos los miembros cuya membresía está activa.
     * Debe usar el método filter() del array.
     *
     * @returns {Member[]} Array con los miembros activos
     *
     * TODO:
     * - Usa this.members.filter() para filtrar miembros
     * - Filtra miembros donde member.isMembershipActive() retorna true
     * - Retorna el nuevo array filtrado
     */
    getActiveMembers() {
        const filter = this.members.filter(member => member.isMembershipActive());
        return filter;
    }

    /**
     * Obtiene miembros que necesitan renovación (próximos a vencer).
     * Traducción: Obtener Miembros que Necesitan Renovación
     *
     * Este método retorna miembros cuya membresía vence en menos de 30 días.
     * Debe usar el método filter() del array.
     *
     * @returns {Member[]} Array con los miembros que necesitan renovación
     *
     * TODO:
     * - Usa this.members.filter() para filtrar miembros
     * - Para cada miembro, obtén la fecha de vencimiento usando getMembershipExpiryDate()
     * - Calcula los días hasta el vencimiento: (expiryDate - new Date()) / (1000 * 60 * 60 * 24)
     * - Filtra miembros donde días hasta vencimiento <= 30 y > 0
     * - Retorna el nuevo array filtrado
     */
    getMembersNeedingRenewal() {
        const filter = this.members.filter(member => {
            const expiryDate = member.getMembershipExpiryDate();
            const daysToExpiry = (expiryDate - new Date()) / (1000 * 60 * 60 * 24);
            return daysToExpiry <= 30 && daysToExpiry > 0;
        });
        return filter;
    }

    /**
     * Obtiene las entradas de un día específico usando filter().
     * Traducción: Obtener Asistencias del Día
     *
     * Este método retorna todas las entradas registradas por todos los miembros en una fecha específica.
     * Debe usar el método filter() del array.
     *
     * @param {Date} date - Fecha para la cual obtener las entradas
     * @returns {Object[]} Array con todas las entradas de ese día
     *
     * TODO:
     * - Valida que date sea una instancia de Date
     * - Lanza error "Date must be a Date object" si es inválido
     * - Usa this.members para iterar sobre todos los miembros
     * - Para cada miembro, obtén su historial de entradas usando getCheckInHistory()
     * - Filtra entradas donde la fecha coincide con el día especificado
     * - Compara año, mes y día de la entrada con la fecha proporcionada
     * - Retorna un array plano con todas las entradas del día
     */
    getDailyAttendance(date) {
        if(!(date instanceof Date)) {
            throw new Error('Date must be a Date object');
        }

        // Usamos flatMap para obtener todos los check-ins y "aplanar" el array al mismo tiempo
        return this.members.flatMap(member => 
        member.getCheckInHistory().filter(entry => {
            const d = entry.date;
            return d.getDate() === date.getDate() &&
                   d.getMonth() === date.getMonth() &&
                   d.getFullYear() === date.getFullYear();
            })
        );
    }
    /**
     * Calcula los ingresos totales del gimnasio usando reduce().
     * Traducción: Obtener Ingresos Totales
     *
     * Este método calcula los ingresos totales sumando la cuota mensual de todos los miembros activos.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Total de ingresos mensuales
     *
     * TODO:
     * - Usa this.members.reduce() para calcular el total
     * - Para cada miembro, suma member.getMembershipFee() al acumulador
     * - Retorna el total de ingresos
     * - Si no hay miembros, retorna 0
     */
    getTotalRevenue() {
        const total = this.members.reduce((acc, member) => {
            return acc + member.getMembershipFee();
        }, 0);
        return total;
    }

    /**
     * Calcula el promedio de visitas por miembro.
     * Traducción: Obtener Promedio de Visitas
     *
     * Este método calcula el promedio de visitas de todos los miembros.
     * Si no hay miembros, retorna 0.
     *
     * @returns {number} Promedio de visitas por miembro
     *
     * TODO:
     * - Si this.members.length === 0, retorna 0
     * - Calcula el total de visitas sumando getTotalVisits() de cada miembro
     * - Divide el total entre el número de miembros
     * - Retorna el promedio con 2 decimales usando toFixed(2) y parseFloat()
     */
    getAverageVisitsPerMember() {
        if(this.members.length === 0) {
            return 0;
        }

        const totalVisits = this.members.reduce((acc, member) => {
            return acc + member.getTotalVisits();
        }, 0);

        const average = totalVisits / this.members.length;
        return parseFloat(average.toFixed(2));
    }

    /**
     * Obtiene estadísticas completas del gimnasio.
     * Traducción: Obtener Estadísticas
     *
     * Este método retorna un objeto con estadísticas del gimnasio:
     * - totalMembers: número total de miembros
     * - activeMembers: número de miembros activos
     * - membersByType: objeto con conteo por tipo de membresía
     * - totalRevenue: ingresos totales mensuales
     * - averageVisits: promedio de visitas por miembro
     *
     * @returns {Object} Objeto con las estadísticas
     *
     * TODO:
     * - Crea un objeto con las estadísticas solicitadas
     * - totalMembers: this.members.length
     * - activeMembers: this.getActiveMembers().length
     * - membersByType: usa reduce() para contar por tipo
     * - totalRevenue: this.getTotalRevenue()
     * - averageVisits: this.getAverageVisitsPerMember()
     * - Retorna el objeto con todas las estadísticas
     */
    getGymStatistics() {
        const stadict = {
            totalMembers: this.members.length,
            activeMembers: this.getActiveMembers().length,
            membersByType: this.members.reduce((acc, member) => {
                acc[member.membershipType] = (acc[member.membershipType] || 0) + 1;
                return acc;
            }, {}),
            totalRevenue: this.getTotalRevenue(),
            averageVisits: this.getAverageVisitsPerMember()
        }

        return stadict;
    }
}

module.exports = {
    Member,
    Gym
};

