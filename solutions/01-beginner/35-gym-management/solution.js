/**
 * Solución: Sistema de Gestión de Gimnasio
 * 
 * Esta implementación muestra cómo crear clases Member y Gym que gestionan
 * miembros del gimnasio con diferentes tipos de membresía, entradas y estadísticas.
 */

class Member {
    constructor(id, name, email, membershipType, startDate) {
        // Valida que el ID sea un string no vacío
        if (typeof id !== 'string' || id.trim().length === 0) {
            throw new Error('Member ID is required');
        }

        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Member name is required');
        }

        // Valida que el email sea un string no vacío
        if (typeof email !== 'string' || email.trim().length === 0) {
            throw new Error('Member email is required');
        }

        // Valida que el tipo de membresía sea válido
        const validTypes = ['basic', 'premium', 'vip'];
        if (!validTypes.includes(membershipType)) {
            throw new Error("Membership type must be 'basic', 'premium', or 'vip'");
        }

        // Valida que startDate sea una instancia de Date
        if (!(startDate instanceof Date)) {
            throw new Error('Start date must be a Date object');
        }

        // Asigna los valores validados
        this.id = id.trim();
        this.name = name.trim();
        this.email = email.trim();
        this.membershipType = membershipType;
        this.startDate = startDate;
        this.checkIns = [];
    }

    checkIn() {
        // Crea un objeto con la fecha actual
        const checkIn = { date: new Date() };

        // Agrega la entrada al array
        this.checkIns.push(checkIn);

        // Retorna la fecha de la entrada registrada
        return checkIn.date;
    }

    getCheckInHistory() {
        // Retorna una copia del array para no mutar el original
        return [...this.checkIns];
    }

    getTotalVisits() {
        // Retorna el número total de entradas
        return this.checkIns.length;
    }

    getMembershipFee() {
        // Retorna la cuota según el tipo de membresía
        switch (this.membershipType) {
            case 'basic':
                return 30;
            case 'premium':
                return 50;
            case 'vip':
                return 80;
            default:
                return 0;
        }
    }

    isMembershipActive() {
        // Calcula la fecha de vencimiento (12 meses después de la fecha de inicio)
        // Maneja correctamente fechas creadas desde string (UTC) y desde componentes (local)
        const year = this.startDate.getUTCFullYear() || this.startDate.getFullYear();
        const month = this.startDate.getUTCMonth() || this.startDate.getMonth();
        const day = this.startDate.getUTCDate() || this.startDate.getDate();
        
        // Crea la fecha de vencimiento usando componentes locales
        const expiryDate = new Date(year + 1, month, day);

        // Compara la fecha actual con la fecha de vencimiento
        return new Date() < expiryDate;
    }

    renewMembership(months) {
        // Valida que months sea un número mayor que 0
        if (typeof months !== 'number' || months <= 0) {
            throw new Error('Months must be greater than 0');
        }

        // Crea una nueva fecha basada en startDate
        const newStartDate = new Date(this.startDate);
        
        // Suma los meses especificados
        newStartDate.setMonth(newStartDate.getMonth() + months);

        // Actualiza la fecha de inicio
        this.startDate = newStartDate;

        // Retorna la nueva fecha de inicio
        return newStartDate;
    }

    getDaysSinceJoined() {
        // Calcula la diferencia en milisegundos
        const diffInMs = new Date() - this.startDate;

        // Convierte a días y retorna días enteros
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return days;
    }

    getMembershipExpiryDate() {
        // Crea una nueva fecha basada en startDate para no mutar la original
        // Maneja correctamente fechas creadas desde string (UTC) y desde componentes (local)
        // Si la fecha fue creada desde string ISO, usa UTC; si no, usa local
        const year = this.startDate.getUTCFullYear() || this.startDate.getFullYear();
        const month = this.startDate.getUTCMonth() || this.startDate.getMonth();
        const day = this.startDate.getUTCDate() || this.startDate.getDate();
        
        // Crea la fecha de vencimiento usando componentes locales para que getDate() funcione correctamente
        const expiryDate = new Date(year + 1, month, day);

        // Retorna la fecha de vencimiento
        return expiryDate;
    }
}

class Gym {
    constructor(name, address) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Gym name is required');
        }

        // Valida que la dirección sea un string no vacío
        if (typeof address !== 'string' || address.trim().length === 0) {
            throw new Error('Gym address is required');
        }

        // Asigna los valores validados
        this.name = name.trim();
        this.address = address.trim();
        this.members = [];
    }

    registerMember(member) {
        // Valida que member sea una instancia de Member
        if (!(member instanceof Member)) {
            throw new Error('Member must be an instance of Member');
        }

        // Valida que no exista ya un miembro con ese ID
        if (this.findMember(member.id) !== null) {
            throw new Error('Member already registered');
        }

        // Agrega el miembro al array
        this.members.push(member);

        // Retorna el miembro agregado
        return member;
    }

    findMember(memberId) {
        // Usa find() para buscar un miembro cuyo id coincida exactamente
        const member = this.members.find(member => member.id === memberId);
        return member || null;
    }

    removeMember(memberId) {
        // Busca el miembro por ID
        const member = this.findMember(memberId);
        
        // Si no se encuentra, retorna false
        if (member === null) {
            return false;
        }

        // Encuentra el índice del miembro
        const memberIndex = this.members.findIndex(m => m.id === memberId);

        // Elimina el miembro del array
        this.members.splice(memberIndex, 1);

        // Retorna true si se eliminó correctamente
        return true;
    }

    getMembersByType(membershipType) {
        // Usa filter() para obtener miembros del tipo especificado
        return this.members.filter(member => member.membershipType === membershipType);
    }

    getActiveMembers() {
        // Usa filter() para obtener solo miembros con membresía activa
        return this.members.filter(member => member.isMembershipActive());
    }

    getMembersNeedingRenewal() {
        // Usa filter() para obtener miembros que necesitan renovación
        return this.members.filter(member => {
            const expiryDate = member.getMembershipExpiryDate();
            const now = new Date();
            const daysUntilExpiry = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));
            
            // Retorna miembros que vencen en menos de 30 días pero aún no han vencido
            return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
        });
    }

    getDailyAttendance(date) {
        // Valida que date sea una instancia de Date
        if (!(date instanceof Date)) {
            throw new Error('Date must be a Date object');
        }

        // Array para almacenar todas las entradas del día
        const dailyCheckIns = [];

        // Itera sobre todos los miembros
        this.members.forEach(member => {
            // Obtiene el historial de entradas del miembro
            const checkIns = member.getCheckInHistory();

            // Filtra entradas del día especificado
            checkIns.forEach(checkIn => {
                const checkInDate = checkIn.date;
                if (
                    checkInDate.getFullYear() === date.getFullYear() &&
                    checkInDate.getMonth() === date.getMonth() &&
                    checkInDate.getDate() === date.getDate()
                ) {
                    dailyCheckIns.push(checkIn);
                }
            });
        });

        // Retorna todas las entradas del día
        return dailyCheckIns;
    }

    getTotalRevenue() {
        // Si no hay miembros, retorna 0
        if (this.members.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el total de ingresos
        return this.members.reduce((total, member) => {
            return total + member.getMembershipFee();
        }, 0);
    }

    getAverageVisitsPerMember() {
        // Si no hay miembros, retorna 0
        if (this.members.length === 0) {
            return '0.00';
        }

        // Calcula el total de visitas sumando las visitas de cada miembro
        const totalVisits = this.members.reduce((total, member) => {
            return total + member.getTotalVisits();
        }, 0);

        // Calcula el promedio
        const average = totalVisits / this.members.length;

        // Retorna el promedio con 2 decimales
        return average.toFixed(2);
    }

    getGymStatistics() {
        // Calcula estadísticas básicas
        const totalMembers = this.members.length;
        const activeMembers = this.getActiveMembers().length;

        // Calcula miembros por tipo usando reduce()
        const membersByType = this.members.reduce((acc, member) => {
            acc[member.membershipType] = (acc[member.membershipType] || 0) + 1;
            return acc;
        }, {});

        // Calcula ingresos totales
        const totalRevenue = this.getTotalRevenue();

        // Calcula promedio de visitas
        const averageVisits = this.getAverageVisitsPerMember();

        // Retorna objeto con todas las estadísticas
        return {
            totalMembers,
            activeMembers,
            membersByType,
            totalRevenue,
            averageVisits: parseFloat(averageVisits)
        };
    }
}

module.exports = {
    Member,
    Gym
};

