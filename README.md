# Path Corrector

Función que corrige rutas de archivos relativas o ambiguas a rutas absolutas únicas dentro del directorio home del usuario.

## Características

- ✅ **Cross-platform**: Funciona en Windows, macOS y Linux
- ✅ **Búsqueda en dos etapas**: Primero búsqueda directa, luego recursiva
- ✅ **Manejo de ambigüedad**: Detecta cuando múltiples archivos coinciden
- ✅ **Fácil de usar**: Función standalone sin dependencias externas

## Instalación

No requiere instalación de dependencias. Solo Node.js (versión 12 o superior).

## Uso

### Importar la función

```javascript
const { correctPath } = require('./pathCorrector');
```

### Ejemplo básico

```javascript
// Buscar un archivo
const result = correctPath('Desktop/mi-archivo.txt');

if (result.success) {
  console.log('Archivo encontrado:', result.correctedPath);
  // Por ejemplo: C:\Users\llamp\Desktop\mi-archivo.txt
} else {
  console.log('Error:', result.error);
}
```

### Ejecutar los ejemplos

```bash
node example.js
```

O usando npm:

```bash
npm start
```

## Cómo Funciona

### Etapa 1: Búsqueda Directa

La función primero intenta combinar la ruta proporcionada con el directorio home del usuario:

```javascript
// Usuario proporciona: "Desktop/archivo.txt"
// Se verifica: C:\Users\llamp\Desktop\archivo.txt (en Windows)
// Se verifica: /Users/llamp/Desktop/archivo.txt (en macOS)
// Se verifica: /home/llamp/Desktop/archivo.txt (en Linux)
```

Si el archivo existe en esa ubicación, retorna inmediatamente con éxito.

### Etapa 2: Búsqueda Recursiva

Si no se encuentra en la búsqueda directa, busca recursivamente en todo el directorio home:

- **0 coincidencias**: Retorna error de "archivo no encontrado"
- **1 coincidencia**: Retorna éxito con la ruta absoluta
- **Múltiples coincidencias**: Retorna error de "ruta ambigua" con la lista de archivos encontrados

## Formato de Retorno

La función retorna un objeto con uno de estos formatos:

### Éxito

```javascript
{
  success: true,
  correctedPath: 'C:\\Users\\llamp\\Desktop\\mi-archivo.txt'
}
```

### Error

```javascript
{
  success: false,
  error: 'Archivo no encontrado: \'mi-archivo.txt\' no existe en el directorio home.'
}
```

## Ejemplos de Uso

### Ejemplo 1: Ruta directa existente

```javascript
const result = correctPath('Desktop');
// ✅ { success: true, correctedPath: 'C:\\Users\\llamp\\Desktop' }
```

### Ejemplo 2: Archivo en subdirectorio

```javascript
const result = correctPath('Documents/proyecto/app.js');
// ✅ { success: true, correctedPath: 'C:\\Users\\llamp\\Documents\\proyecto\\app.js' }
```

### Ejemplo 3: Solo nombre de archivo (búsqueda recursiva)

```javascript
const result = correctPath('config.json');
// Si existe un único config.json en el home:
// ✅ { success: true, correctedPath: 'C:\\Users\\llamp\\proyectos\\mi-app\\config.json' }

// Si existen múltiples config.json:
// ❌ { success: false, error: 'La ruta es ambigua...' }
```

### Ejemplo 4: Archivo no existente

```javascript
const result = correctPath('archivo-que-no-existe.txt');
// ❌ { success: false, error: 'Archivo no encontrado...' }
```

## Directorio Home por Sistema Operativo

La función usa `os.homedir()` que retorna:

- **Windows**: `C:\Users\nombre-usuario`
- **macOS**: `/Users/nombre-usuario`
- **Linux**: `/home/nombre-usuario`

## API

### `correctPath(filePath)`

Corrige una ruta de archivo relativa a absoluta.

**Parámetros:**
- `filePath` (string): Ruta relativa del archivo a buscar

**Retorna:**
- `Object`: `{ success: boolean, correctedPath?: string, error?: string }`

### `findFilesRecursive(fileName, searchDir)`

Busca archivos recursivamente en un directorio (función auxiliar).

**Parámetros:**
- `fileName` (string): Nombre del archivo o ruta parcial a buscar
- `searchDir` (string): Directorio donde iniciar la búsqueda

**Retorna:**
- `string[]`: Array de rutas absolutas que coinciden

## Notas de Rendimiento

- La **búsqueda directa** es instantánea
- La **búsqueda recursiva** puede tardar varios segundos dependiendo del tamaño del directorio home
- La función ignora errores de permisos en subdirectorios del sistema

## Limitaciones

- La búsqueda recursiva puede ser lenta en directorios muy grandes
- No sigue enlaces simbólicos para evitar loops infinitos
- Ignora directorios sin permisos de lectura

## Licencia

MIT
