const formatMarkdown = require('./exercise');

describe('Formateador de Texto Markdown Básico', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos - Verificación de funcionalidad principal', () => {
        test('debe convertir negritas **texto** a <strong>texto</strong>', () => {
            expect(formatMarkdown("**Hello**")).toBe("<strong>Hello</strong>");
        });

        test('debe convertir cursivas *texto* a <em>texto</em>', () => {
            expect(formatMarkdown("*world*")).toBe("<em>world</em>");
        });

        test('debe convertir encabezado # a <h1>', () => {
            expect(formatMarkdown("# Title")).toBe("<h1>Title</h1>");
        });

        test('debe convertir encabezado ## a <h2>', () => {
            expect(formatMarkdown("## Subtitle")).toBe("<h2>Subtitle</h2>");
        });

        test('debe convertir lista no ordenada - a <ul><li>', () => {
            expect(formatMarkdown("- Item")).toBe("<ul><li>Item</li></ul>");
        });

        test('debe convertir lista ordenada 1. a <ol><li>', () => {
            expect(formatMarkdown("1. First")).toBe("<ol><li>First</li></ol>");
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites - Verificación de comportamientos extremos', () => {
        test('debe manejar texto sin formato', () => {
            expect(formatMarkdown("Plain text")).toBe("Plain text");
        });

        test('debe manejar múltiples formatos en una línea', () => {
            const result = formatMarkdown("**Bold** and *italic*");
            expect(result).toContain("<strong>Bold</strong>");
            expect(result).toContain("<em>italic</em>");
        });

        test('debe manejar lista con múltiples items', () => {
            const result = formatMarkdown("- Item 1\n- Item 2\n- Item 3");
            expect(result).toContain("<ul>");
            expect(result).toContain("<li>Item 1</li>");
            expect(result).toContain("<li>Item 2</li>");
            expect(result).toContain("<li>Item 3</li>");
            expect(result).toContain("</ul>");
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs - Verificación de principio Fail Fast', () => {
        test('debe lanzar error cuando text no es string', () => {
            expect(() => formatMarkdown(123)).toThrow();
        });

        test('debe lanzar error cuando text es null', () => {
            expect(() => formatMarkdown(null)).toThrow();
        });
    });
});

