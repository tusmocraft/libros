
Biblioteca Tusmocraft - Paquete listo para GitHub Pages

Instrucciones rápidas:
1) Abre tu repositorio 'libros' en GitHub.
2) Sube el contenido de este ZIP al root del repo (no dentro de otra carpeta).
3) Asegúrate de tener la carpeta /pdfs con tus archivos PDF y actualiza /pdfs/books.json con entradas que sigan:
   { "id": "BOOK-003", "title": "Mi Libro", "file": "mi_libro.pdf" }

Flipbook 3D:
- Este paquete incluye soporte para inicializar una librería de flipbook 3D si colocas el archivo:
    /js/flipbook.min.js
  en el directorio /js/ del repo.
- Si no colocas la librería, el visor utilizará un iframe de respaldo (vista embebida del PDF).

Dónde conseguir la librería 3D:
- Puedes usar una librería como "3D FlipBook" (open-source) o cualquier otra flipbook que exponga una API para inicializar desde JS.
- Coloca el archivo JS en /js/flipbook.min.js. El viewer intentará inicializarla automáticamente.
- Si necesitas, puedo intentar incluir una copia de una librería específica, pero eso requiere distribuir su código; dime cuál prefieres y lo preparo.

Publicar en GitHub Pages:
- En GitHub: Settings -> Pages -> Source: main branch, folder: root (/)
- Accede a: https://TU_USUARIO.github.io/libros/

Panel admin:
- URL: https://TU_USUARIO.github.io/libros/admin.html
- Usuario: tusmocraft
- Contraseña: 01tusmo02

Embed para Weebly:
- En el panel, usa 'Copiar Embed' para obtener un iframe listo. Pégalo en el editor HTML de Weebly.

Limitaciones de seguridad:
- El login es cliente-side (JavaScript). No es seguro contra usuarios que inspeccionen el código.
- Para autenticación real, necesitarías un backend o servicios como Netlify Identity.

Si quieres, puedo:
- Incluir una librería flipbook específica dentro del ZIP (dime cuál), o
- Subir el ZIP ya con la librería 3D integrada.

