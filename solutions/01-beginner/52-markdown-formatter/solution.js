/**
 * SOLUCIÓN: Formateador de Texto Markdown Básico
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function formatMarkdown(text) {
    // Validar que text sea un string
    if (typeof text !== 'string') {
        throw new Error('Text must be a string');
    }

    // Dividir el texto en líneas
    const lines = text.split('\n');
    const result = [];
    let inUnorderedList = false;
    let inOrderedList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let processed = false;

        // Procesar encabezados
        if (line.match(/^#{1,6}\s+/)) {
            // Cerrar listas si estaban abiertas
            if (inUnorderedList) {
                result.push('</ul>');
                inUnorderedList = false;
            }
            if (inOrderedList) {
                result.push('</ol>');
                inOrderedList = false;
            }

            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const content = match[2];
                result.push(`<h${level}>${content}</h${level}>`);
                processed = true;
            }
        }
        // Procesar listas no ordenadas
        else if (line.match(/^[-*]\s+/)) {
            if (!inUnorderedList) {
                if (inOrderedList) {
                    result.push('</ol>');
                    inOrderedList = false;
                }
                result.push('<ul>');
                inUnorderedList = true;
            }
            const content = line.replace(/^[-*]\s+/, '');
            result.push(`<li>${content}</li>`);
            processed = true;
        }
        // Procesar listas ordenadas
        else if (line.match(/^\d+\.\s+/)) {
            if (!inOrderedList) {
                if (inUnorderedList) {
                    result.push('</ul>');
                    inUnorderedList = false;
                }
                result.push('<ol>');
                inOrderedList = true;
            }
            const content = line.replace(/^\d+\.\s+/, '');
            result.push(`<li>${content}</li>`);
            processed = true;
        }
        // Línea normal
        else {
            // Cerrar listas si estaban abiertas
            if (inUnorderedList) {
                result.push('</ul>');
                inUnorderedList = false;
            }
            if (inOrderedList) {
                result.push('</ol>');
                inOrderedList = false;
            }

            if (!processed) {
                result.push(line);
            }
        }
    }

    // Cerrar listas si quedaron abiertas
    if (inUnorderedList) {
        result.push('</ul>');
    }
    if (inOrderedList) {
        result.push('</ol>');
    }

    // Unir las líneas
    let output = result.join('\n');

    // Procesar negritas y cursivas (después de procesar estructura)
    // Negritas: **texto** o __texto__
    output = output.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    output = output.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Cursivas: *texto* o _texto_ (pero no dentro de tags HTML)
    // Usar lookahead y lookbehind para evitar conflictos con HTML
    output = output.replace(/(?<!<[^>]*)\*([^*]+?)\*(?![^<]*>)/g, '<em>$1</em>');
    output = output.replace(/(?<!<[^>]*)_([^_]+?)_(?![^<]*>)/g, '<em>$1</em>');

    return output;
}

module.exports = formatMarkdown;

