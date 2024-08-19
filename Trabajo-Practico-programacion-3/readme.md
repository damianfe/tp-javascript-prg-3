# Trabajo Práctico: Repaso JavaScript - Array, API Fetch, FileSystem

**Curso:** Programación III - 2024 – 2do cuatrimestre  
**Carrera:** Tecnicatura Universitaria en Desarrollo Web

## Objetivos

El objetivo de este trabajo práctico es:
- Poner en práctica los temas vistos en JavaScript.
- Utilizar la estructura `Array` de JavaScript.
- Realizar consultas a APIs utilizando el método `fetch` de JavaScript.
- Manipular archivos con el módulo `FileSystem`.

## Condiciones de Entrega

- **Grupo:** El trabajo debe ser realizado en forma grupal. Los grupos deberán contar con un mínimo de 4 y un máximo de 6 alumnos.
- **Entrega:** Cargar en la sección correspondiente del Campus Virtual en un archivo comprimido (ZIP, RAR, TAR.GZ) o subir un archivo TXT con la URL del repositorio de GitHub. Indicar los apellidos y nombres de los integrantes del grupo.
- **Fecha de Entrega:** Entregar antes de la fecha límite informada en el campus.
- **Evaluación:** Se valorará la exactitud, eficiencia, prolijidad (identación y buenas prácticas) de las soluciones, así como la calidad de la exposición realizada.

## Ejercicio 1: Thrones API

**API:** [Thrones API](https://thronesapi.com/)  
Esta API REST proporciona acceso a datos del universo de Game of Thrones. Para este ejercicio se requiere:

1. **Recuperar la información del personaje “Ned Stark”.**
2. **Recuperar todos los personajes disponibles.**
3. **Persistir el resultado de la segunda consulta en un archivo JSON local.**
4. **Leer el archivo local de personajes:**
   - Mostrar por consola los personajes de la familia Stark (es decir, “family” = “House Stark”).
   - Agregar un nuevo personaje y sobrescribir el archivo original.
   - Eliminar los personajes cuyo ID sea mayor a 25 y sobrescribir el archivo original.

**Nota:** La solución debe contar con un archivo `inicio.js`, `index.js` o `app.js` donde se prueben todos los requerimientos. No se debe realizar ingreso de datos por consola.

## Ejercicio 2: FakeStore API

**API:** [FakeStore API](https://fakestoreapi.com/)  
Esta API REST proporciona datos ficticios sobre productos de una tienda en línea. Para este ejercicio se requiere:

1. **Recuperar la información de todos los productos.**
2. **Recuperar la información de un número limitado de productos.**
3. **Agregar un nuevo producto.**
4. **Retornar un producto según un “id” como parámetro.**
5. **Eliminar un producto.**

**Nota:** La solución debe contar con un archivo `inicio.js`, `index.js` o `app.js` donde se prueben todos los requerimientos. No se debe realizar ingreso de datos por consola.

## Requisitos Técnicos

- **Node.js:** Asegúrate de tener Node.js instalado en tu máquina.
- **Dependencias:** Instalar las dependencias necesarias usando `npm install` o `yarn install`.
- **Ejecución:** Ejecuta el código utilizando `node inicio.js`, `node index.js` o `node app.js` según corresponda.