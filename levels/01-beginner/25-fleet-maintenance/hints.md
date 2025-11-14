# Pistas Progresivas – Fleet Maintenance Manager

## 💭 Pista 1: Normaliza datos en el constructor
Antes de asignar la placa, usa `plate.trim().toUpperCase()` y valida longitud mínima. Recuerda lanzar `"Vehicle plate is required"` si queda vacía.

## 💭 Pista 2: Reutiliza validaciones
Crea funciones auxiliares privadas (por ejemplo, `validatePositiveNumber(value, message)`) dentro de la clase para evitar duplicar lógica en `constructor` y `addTrip`.

## 💭 Pista 3: Reporte de mantenimiento
Para `getMaintenanceList`, valida el umbral, filtra con `this.vehicles.filter(vehicle => vehicle.mileage >= threshold)` y luego mapea con `getSummary()`. Devuelve el resultado del `map` para garantizar un nuevo array.*** End Patch to=functions.apply_patch  भन्न to=functions.apply_patch code:

