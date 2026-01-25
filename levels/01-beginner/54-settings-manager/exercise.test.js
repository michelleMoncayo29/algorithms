const SettingsManager = require('./exercise');

describe('Gestor de Configuración', () => {
    test('debe crear gestor con defaults', () => {
        const settings = new SettingsManager({ theme: 'dark', language: 'en' });
        expect(settings.get('theme')).toBe('dark');
        expect(settings.get('language')).toBe('en');
    });

    test('debe crear gestor vacío sin defaults', () => {
        const settings = new SettingsManager();
        expect(settings.size()).toBe(0);
    });

    test('debe establecer y obtener configuración', () => {
        const settings = new SettingsManager();
        settings.set('fontSize', 14);
        expect(settings.get('fontSize')).toBe(14);
    });

    test('debe soportar method chaining', () => {
        const settings = new SettingsManager();
        settings.set('a', 1).set('b', 2).set('c', 3);
        expect(settings.get('a')).toBe(1);
        expect(settings.get('b')).toBe(2);
        expect(settings.get('c')).toBe(3);
    });

    test('debe establecer múltiples configuraciones', () => {
        const settings = new SettingsManager();
        settings.setMultiple({ a: 1, b: 2, c: 3 });
        expect(settings.get('a')).toBe(1);
        expect(settings.get('b')).toBe(2);
        expect(settings.get('c')).toBe(3);
    });

    test('has debe retornar true si existe', () => {
        const settings = new SettingsManager();
        settings.set('key', 'value');
        expect(settings.has('key')).toBe(true);
        expect(settings.has('nonexistent')).toBe(false);
    });

    test('remove debe eliminar configuración', () => {
        const settings = new SettingsManager();
        settings.set('key', 'value');
        expect(settings.remove('key')).toBe(true);
        expect(settings.get('key')).toBeUndefined();
        expect(settings.remove('nonexistent')).toBe(false);
    });

    test('reset debe restablecer a defaults', () => {
        const settings = new SettingsManager({ theme: 'dark' });
        settings.set('fontSize', 14);
        settings.reset();
        expect(settings.get('theme')).toBe('dark');
        expect(settings.get('fontSize')).toBeUndefined();
    });

    test('getAll debe retornar copia inmutable', () => {
        const settings = new SettingsManager();
        settings.set('key', 'value');
        const all = settings.getAll();
        all.newKey = 'newValue';
        expect(settings.get('newKey')).toBeUndefined();
    });

    test('clear debe eliminar todas las configuraciones', () => {
        const settings = new SettingsManager({ theme: 'dark' });
        settings.set('fontSize', 14);
        settings.clear();
        expect(settings.size()).toBe(0);
    });

    test('size debe retornar número correcto', () => {
        const settings = new SettingsManager();
        expect(settings.size()).toBe(0);
        settings.set('a', 1);
        expect(settings.size()).toBe(1);
        settings.set('b', 2);
        expect(settings.size()).toBe(2);
    });
});

