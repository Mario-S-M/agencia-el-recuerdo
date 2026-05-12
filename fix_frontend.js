const fs = require('fs');
const path = require('path');

// Ruta al archivo que necesitamos corregir
const filePath = './frontend/src/features/destinos/components/AdminDestinosPage.tsx';

// Leer el contenido actual del archivo
let content = fs.readFileSync(filePath, 'utf8');

// Reemplazar la función formatDate para manejar valores undefined
const newFormatDate = `function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  try {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  } catch {
    return '—';
  }
}`;

// Buscar y reemplazar la función antigua con la nueva
const oldFormatDate = `function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return \`\${d}/\${m}/\${y}\`;
}`;

content = content.replace(oldFormatDate, newFormatDate);

// Escribir el archivo corregido
fs.writeFileSync(filePath, content, 'utf8');

console.log('Archivo corregido correctamente');