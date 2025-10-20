const { correctPath } = require('./pathCorrector');
const os = require('os');
const path = require('path');

console.log('='.repeat(60));
console.log('Ejemplos de uso de correctPath()');
console.log('='.repeat(60));
console.log();

// Ejemplo 1: Ruta absoluta (Etapa 0)
console.log('--- Ejemplo 1: Ruta Absoluta ---');
const absolutePath = path.join(os.homedir(), 'Desktop', 'path-corrector', 'pathCorrector.js');
console.log('Buscando:', absolutePath);
const result1 = correctPath(absolutePath);
if (result1.success) {
  console.log('✅ Éxito:', result1.correctedPath);
} else {
  console.log('❌ Error:', result1.error);
}
console.log();

// Ejemplo 2: Búsqueda directa exitosa
console.log('--- Ejemplo 2: Búsqueda Directa (Etapa 1) ---');
console.log('Buscando: "Desktop"');
const result2 = correctPath('Desktop');
if (result2.success) {
  console.log('✅ Éxito:', result2.correctedPath);
} else {
  console.log('❌ Error:', result2.error);
}
console.log();

// Ejemplo 3: Búsqueda con ruta relativa
console.log('--- Ejemplo 3: Ruta Relativa (Etapa 1) ---');
console.log('Buscando: "Desktop/path-corrector"');
const result3 = correctPath('Desktop/path-corrector');
if (result3.success) {
  console.log('✅ Éxito:', result3.correctedPath);
} else {
  console.log('❌ Error:', result3.error);
}
console.log();

// Ejemplo 4: Búsqueda recursiva de archivo específico
console.log('--- Ejemplo 4: Búsqueda Recursiva (Etapa 2) ---');
console.log('Buscando: "pathCorrector.js"');
const result4 = correctPath('pathCorrector.js');
if (result4.success) {
  console.log('✅ Éxito:', result4.correctedPath);
} else {
  console.log('❌ Error:', result4.error);
}
console.log();

// Ejemplo 5: Archivo que no existe
console.log('--- Ejemplo 5: Archivo No Existente ---');
console.log('Buscando: "archivo-inexistente-12345.txt"');
const result5 = correctPath('archivo-inexistente-12345.txt');
if (result5.success) {
  console.log('✅ Éxito:', result5.correctedPath);
} else {
  console.log('❌ Error:', result5.error);
}
console.log();

// Ejemplo 6: Tu propio ejemplo personalizado
console.log('--- Ejemplo 6: Personalizado ---');
console.log('Prueba tu propia ruta modificando este archivo');
console.log('Por ejemplo, busca un archivo que sepas que existe en tu sistema');
// Descomenta y modifica la siguiente línea:
// const result6 = correctPath('Documents/mi-archivo.txt');
// if (result6.success) {
//   console.log('✅ Éxito:', result6.correctedPath);
// } else {
//   console.log('❌ Error:', result6.error);
// }

console.log('='.repeat(60));
console.log('Nota: La búsqueda recursiva puede tardar si el archivo');
console.log('no está en la ubicación directa.');
console.log('='.repeat(60));
