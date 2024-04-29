# GestionEscolar

Este proyecto es una aplicación completa de gestión para cursos y estudiantes, que permite la asignación de estudiantes a múltiples cursos. La aplicación frontend está construida con Angular y consume servicios API proporcionados por un backend de Laravel.

## Entidades y Requisitos

### Administrador
- Nombre: Obligatorio, longitud máxima de 100 caracteres.
- Apellido: Obligatorio, longitud máxima de 100 caracteres.
- Correo Electrónico: Obligatorio, único y debe ser un email válido.
- Contraseña: Mínimo 8 caracteres, debe incluir un número, una letra mayúscula y un carácter especial, además de un campo para confirmar la contraseña.

### Estudiante
- Nombre: Obligatorio, longitud máxima de 100 caracteres.
- Apellido: Opcional, longitud máxima de 100 caracteres.
- Edad: Obligatorio, el estudiante no puede ser menor de 18 años.
- Cédula: Obligatorio, longitud máxima de 11 caracteres, tipo string.
- Correo Electrónico: Obligatorio, único y debe ser un email válido.
- Cursos Asociados: Se acepta cualquier solución viable.

### Cursos
- Nombre: Obligatorio, longitud máxima de 50 caracteres.
- Horario: Se acepta cualquier solución viable.
- Fecha de Inicio: Obligatorio, tipo fecha.
- Fecha de Fin: Obligatorio, tipo fecha.
- Tipo: Obligatorio, opciones son Presencial o Virtual.
- Número de Estudiantes Asociados: Se acepta cualquier solución viable.

## Operaciones Requeridas

- Autenticación de Administrador/Profesor.
- CRUD (Crear, Leer, Actualizar, Eliminar) de Estudiantes.
- CRUD de Cursos.
- Asignación de Estudiantes a un Curso Específico.
- Dashboard con métricas específicas.
- Listado de Cursos Asignados a un Estudiante.
- Validación de todos los datos de entrada en las API.
- Capacidad de crear datos de prueba.

## Operaciones Opcionales (Plus)

- Uso de Docker.

## Stack Tecnológico

- Base de Datos: PostgreSQL.
- Frontend: Angular versión 17.
- Backend/API: Laravel versión 11.

## Repositorio

El código fuente completo del proyecto está disponible en un repositorio público de GitHub. Puede ser clonado o descargado para su evaluación y prueba.

## Imagenes del Proyecto

![image](https://github.com/Daniel349167/GestionEscolar/assets/62466867/4e32071c-1f56-4d74-b834-afdec84c0a5b)

![image](https://github.com/Daniel349167/GestionEscolar/assets/62466867/b05f5f4a-e506-4b3b-b099-a1f8f5ab38c1)

![image](https://github.com/Daniel349167/GestionEscolar/assets/62466867/a41eb517-e221-40b0-9973-cfbe08c33821)

![image](https://github.com/Daniel349167/GestionEscolar/assets/62466867/ebede4ae-c114-4222-8ad3-4851a87dd8c2)





