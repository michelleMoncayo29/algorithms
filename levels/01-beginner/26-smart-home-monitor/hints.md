# Pistas Progresivas – Smart Home Monitor

## 💭 Pista 1: Normaliza cadenas
Dentro del constructor de `SmartDevice`, limpia los strings con `trim()`. Para capitalizar:  
```javascript
const cleanName = input.trim();
const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
```
Para `room`, basta con `input.trim().toLowerCase()`.

## 💭 Pista 2: Reusa `findByName`
Antes de agregar un dispositivo, llama a `this.findByName(device.name)`. Si devuelve algo distinto de `null`, lanza `"Device name already registered"`.

## 💭 Pista 3: Reporte por habitación
En `getRoomReport`, después de filtrar los dispositivos de la habitación, puedes construir el objeto con:
```javascript
const devicesInRoom = this._devices.filter(/* ... */);
return {
  room: normalizedRoom,
  devices: devicesInRoom.map(device => device.name),
  activeDevices: devicesInRoom.filter(device => device.isOn).length,
  totalWatts: devicesInRoom.reduce((sum, device) => sum + device.watts, 0)
};
```

