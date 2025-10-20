const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Busca archivos recursivamente en un directorio.
 * @param {string} fileName - Nombre del archivo o ruta parcial a buscar
 * @param {string} searchDir - Directorio donde iniciar la búsqueda
 * @returns {string[]} Array de rutas absolutas que coinciden
 */
function findFilesRecursive(fileName, searchDir) {
  const results = [];

  try {
    // Leer el contenido del directorio
    const entries = fs.readdirSync(searchDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(searchDir, entry.name);

      try {
        if (entry.isDirectory()) {
          // Recursivamente buscar en subdirectorios
          const subResults = findFilesRecursive(fileName, fullPath);
          results.push(...subResults);
        } else if (entry.isFile()) {
          // Verificar si el nombre coincide o si la ruta termina con el patrón buscado
          if (entry.name === fileName || fullPath.endsWith(fileName)) {
            results.push(fullPath);
          }
        }
      } catch (err) {
        // Ignorar errores de permisos o acceso en subdirectorios
        // (común en directorios del sistema como AppData)
        continue;
      }
    }
  } catch (err) {
    // Si no se puede leer el directorio, retornar resultados vacíos
    return results;
  }

  return results;
}

/**
 * Intenta corregir una ruta de archivo relativa o ambigua a una ruta absoluta única
 * dentro del directorio home del usuario.
 *
 * @param {string} filePath - La ruta del archivo a corregir
 * @returns {Object} Resultado con formato { success: boolean, correctedPath?: string, error?: string }
 */
function correctPath(filePath) {
  // Obtener el directorio home del usuario de forma cross-platform
  const homeDir = os.homedir();

  // ETAPA 1: Búsqueda Directa
  // Intentar combinar la ruta con el directorio home
  const directPath = path.join(homeDir, filePath);

  if (fs.existsSync(directPath)) {
    return {
      success: true,
      correctedPath: directPath
    };
  }

  // ETAPA 2: Búsqueda Recursiva en Todo el Directorio Home
  // Si no se encontró directamente, buscar recursivamente
  console.log(`Buscando "${filePath}" recursivamente en ${homeDir}...`);
  console.log('(Esto puede tomar unos momentos)');

  const foundFiles = findFilesRecursive(filePath, homeDir);

  // Caso 1: No se encontraron coincidencias
  if (foundFiles.length === 0) {
    return {
      success: false,
      error: `Archivo no encontrado: '${filePath}' no existe en el directorio home.`
    };
  }

  // Caso 2: Múltiples coincidencias (ambiguo)
  if (foundFiles.length > 1) {
    return {
      success: false,
      error: `La ruta '${filePath}' es ambigua y coincide con múltiples archivos. Por favor proporciona una ruta más específica. Coincidencias encontradas:\n${foundFiles.map(f => `  - ${f}`).join('\n')}`
    };
  }

  // Caso 3: Una única coincidencia (éxito)
  return {
    success: true,
    correctedPath: foundFiles[0]
  };
}

// Exportar las funciones
module.exports = {
  correctPath,
  findFilesRecursive
};
