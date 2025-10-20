const { correctPath } = require('./pathCorrector');

console.log('='.repeat(60));
console.log('Ejemplos de uso de correctPath()');
console.log('='.repeat(60));
console.log();

// Ejemplo 1: Búsqueda directa exitosa
console.log('--- Ejemplo 1: Búsqueda Directa ---');
console.log('Buscando: "Desktop"');
const result1 = correctPath('Desktop');
if (result1.success) {
  console.log('✅ Éxito:', result1.correctedPath);
} else {
  console.log('❌ Error:', result1.error);
}
console.log();

// Ejemplo 2: Búsqueda con ruta relativa
console.log('--- Ejemplo 2: Ruta Relativa ---');
console.log('Buscando: "Desktop/path-corrector"');
const result2 = correctPath('Desktop/path-corrector');
if (result2.success) {
  console.log('✅ Éxito:', result2.correctedPath);
} else {
  console.log('❌ Error:', result2.error);
}
console.log();

// Ejemplo 3: Búsqueda de archivo específico
console.log('--- Ejemplo 3: Archivo Específico ---');
console.log('Buscando: "pathCorrector.js"');
const result3 = correctPath('pathCorrector.js');
if (result3.success) {
  console.log('✅ Éxito:', result3.correctedPath);
} else {
  console.log('❌ Error:', result3.error);
}
console.log();

// Ejemplo 4: Archivo que no existe
console.log('--- Ejemplo 4: Archivo No Existente ---');
console.log('Buscando: "archivo-inexistente-12345.txt"');
const result4 = correctPath('archivo-inexistente-12345.txt');
if (result4.success) {
  console.log('✅ Éxito:', result4.correctedPath);
} else {
  console.log('❌ Error:', result4.error);
}
console.log();

// Ejemplo 5: Tu propio ejemplo personalizado
console.log('--- Ejemplo 5: Personalizado ---');
console.log('Prueba tu propia ruta modificando este archivo');
console.log('Por ejemplo, busca un archivo que sepas que existe en tu sistema');
// Descomenta y modifica la siguiente línea:
// const result5 = correctPath('Documents/mi-archivo.txt');
// if (result5.success) {
//   console.log('✅ Éxito:', result5.correctedPath);
// } else {
//   console.log('❌ Error:', result5.error);
// }

console.log('='.repeat(60));
console.log('Nota: La búsqueda recursiva puede tardar si el archivo');
console.log('no está en la ubicación directa.');
console.log('='.repeat(60));
