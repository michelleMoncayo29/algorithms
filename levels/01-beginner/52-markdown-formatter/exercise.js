/**
 * Formateador de Texto Markdown Básico
 *
 * Descripción: Convierte texto plano a formato Markdown básico (negritas, cursivas, listas).
 * Dificultad: BEGINNER
 *
 * @param {string} text - Texto plano a formatear
 * @returns {string} Texto formateado en Markdown
 *
 * Ejemplo:
 * formatMarkdown("**Hello** *world*") // Retorna texto con formato aplicado
 */

function formatMarkdown(text) {
  // 1. DIVIDIR: Convertimos el string en un array de líneas
  const lines = text.split('\n');
  let result = [];

  // 2. MEMORIA: Variables para saber si estamos dentro de una lista
  let inUnorderedList = false;
  let inOrderedList = false;

  // 3. RECORRER: Iteramos sobre cada línea
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // --- LÓGICA DE LISTAS NO ORDENADAS (- ) ---
    if (line.startsWith('- ')) {
      if (!inUnorderedList) {
        result.push('<ul>'); // Abrimos la lista si es la primera vez
        inUnorderedList = true;
      }
      // Transformamos la línea en un item de lista
      let content = line.slice(2);
      result.push('<li>' + content + '</li>');
      continue; // Saltamos a la siguiente línea
    } else if (inUnorderedList) {
      result.push('</ul>'); // Cerramos si la línea actual ya no es lista
      inUnorderedList = false;
    }

    // --- LÓGICA DE ENCABEZADOS (#) ---
    if (line.startsWith('### ')) {
      result.push('<h3>' + line.slice(4) + '</h3>');
    } else if (line.startsWith('## ')) {
      result.push('<h2>' + line.slice(3) + '</h2>');
    } else if (line.startsWith('# ')) {
      result.push('<h1>' + line.slice(2) + '</h1>');
    } 
      
    //   else if (line.startsWith('** ')) {
    //   result.push('<strong>' + line.slice(3) + '</strong>');
    // } else if (line.startsWith('* ')) {
    //   result.push('<em>' + line.slice(2) + '</em>');
    // }

    // --- TEXTO NORMAL ---
    else if (line.trim() !== '') {
      // Si no es nada de lo anterior, lo guardamos como está
      result.push(line);
    }
  }

  // 4. CIERRE DE SEGURIDAD: Por si el texto termina en una lista
  if (inUnorderedList) result.push('</ul>');

  // 5. UNIR Y TRANSFORMAR ESTILOS (Negritas y Cursivas)
  let finalHTML = result.join('\n');

  // Aquí aplicarías los .replace() con Regex para ** y *
  // finalHTML = finalHTML.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  finalHTML = finalHTML.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Para **texto**
  finalHTML = finalHTML.replace(/__(.*?)__/g, '<strong>$1</strong>'); // Para __texto__
  finalHTML = finalHTML.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Para *texto*
  finalHTML = finalHTML.replace(/_(.*?)_/g, '<em>$1</em>');

  return finalHTML;
}
// Input

console.log(formatMarkdown('* subtitle'));
module.exports = formatMarkdown;
