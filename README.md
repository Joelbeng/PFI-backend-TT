# Proyecto Final - Backend con Node.js, Express, Firebase y JWT

Este proyecto es un backend desarrollado con **Node.js**, **Express.js**, **Firebase Firestore** y **JWT**.  
Permite autenticarse con un login, consultar productos, crear productos, actualizarlos y eliminarlos.

La API está desplegada en Vercel y puede ser consumida desde Postman, frontend o cualquier cliente HTTP.

---

## URL Base

bash https://pfi-backend-tt.vercel.app


---

## Tecnologías utilizadas

- Node.js
- Express.js
- Firebase Firestore
- JSON Web Token (JWT)
- CORS
- dotenv
- body-parser

---

## Estructura general del proyecto

text src/ ├── controladores/ ├── data/ ├── middleware/ ├── modelos/ ├── rutas/ └── servicios/


---

## Variables de entorno

El proyecto utiliza variables de entorno para conectarse a Firebase y firmar tokens JWT.

---

## Autenticación

El login devuelve un token JWT que debe enviarse en las rutas protegidas.

### Obtener token

**Endpoint:**

http POST https://pfi-backend-tt.vercel.app/auth/login


### Body esperado

json { "email": "admin@gmail.com", "password": "123456" }


### Respuesta exitosa

json { "token": "Bearer eyJhbGciOiJIUzI1NiIs..." }


### Errores posibles
- `400` si faltan credenciales
- `401` si las credenciales son inválidas

---

## Endpoints de productos

La colección utilizada en Firestore es:

bash productos


---

### 1. Obtener todos los productos

**Endpoint:**

http GET https://pfi-backend-tt.vercel.app/api/products


### Requisitos
- No requiere body
- Puede usarse sin token si la ruta está pública en la implementación actual

### Respuesta exitosa
`200 OK`

json [ { "id": "abc123", "nombre": "Lentejas", "categoria": "alimento", "precio": 800 } ]


### Errores posibles
- `404` si no se encuentran productos
- `500` si ocurre un error interno

---

### 2. Obtener un producto por ID

**Endpoint:**

http GET https://pfi-backend-tt.vercel.app/api/products/:id


### Ejemplo

http GET https://pfi-backend-tt.vercel.app/api/products/abc123


### Requisitos
- Reemplazar `:id` por el ID real del documento en Firestore
- No requiere body
- No Requiere token

### Respuesta exitosa
`200 OK`

json { "id": "abc123", "nombre": "Lentejas", "categoria": "alimento", "precio": 800 }


### Errores posibles
- `400` si no se envía ID
- `404` si el producto no existe
- `500` si ocurre un error interno

---

### 3. Crear un producto

**Endpoint:**

http POST https://pfi-backend-tt.vercel.app/api/products/create


### Requisitos
- Requiere token JWT en el header `Authorization`
- Debe enviarse un body en formato JSON
- La ruta está protegida

### Headers

http Authorization: Bearer TU_TOKEN Content-Type: application/json


### Body esperado

json { "producto": { "nombre": "Lentejas", "categoria": "alimento", "precio": 800 } }


### Respuesta exitosa
`200 OK` o `201 Created`, según la implementación

json { "id": "nuevoId", "nombre": "Lentejas", "categoria": "alimento", "precio": 800 }


### Errores posibles
- `400` si falta información del producto
- `401` si no se envía token
- `403` si el token es inválido
- `500` si ocurre un error interno o falla la conexión con Firestore

---

### 4. Actualizar un producto

**Endpoint:**

http PUT https://pfi-backend-tt.vercel.app/api/products/:id


### Ejemplo

http PUT https://pfi-backend-tt.vercel.app/api/products/abc123


### Requisitos
- Requiere token JWT
- Reemplazar `:id` por el ID del documento
- Enviar un body JSON con los campos a actualizar

### Headers

http Authorization: Bearer TU_TOKEN Content-Type: application/json


### Body ejemplo

json { "precio": 1000 }


### Respuesta exitosa

json { "message": "Producto actualizado correctamente" }


### Errores posibles
- `400` si no se envía ID
- `401` si no se envía token
- `403` si el token es inválido
- `500` si ocurre un error interno

---

### 5. Eliminar un producto

**Endpoint:**

http DELETE https://pfi-backend-tt.vercel.app/api/products/:id


### Ejemplo

http DELETE https://pfi-backend-tt.vercel.app/api/products/abc123


### Requisitos
- Requiere token JWT
- Reemplazar `:id` por el ID real del documento

### Headers

http Authorization: Bearer TU_TOKEN


### Body
No requiere body.

### Respuesta exitosa

json { "message": "Producto eliminado" }


### Errores posibles
- `400` si no se envía ID
- `401` si no se envía token
- `403` si el token es inválido
- `500` si ocurre un error interno

---

## Códigos de estado manejados

El proyecto contempla los siguientes estados HTTP:

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

---

## Cómo probar la API

Se recomienda usar **Postman** o **Insomnia**.

### Flujo recomendado
1. Hacer `POST /auth/login`
2. Copiar el token devuelto
3. Agregar el token en `Authorization: Bearer TU_TOKEN`
4. Probar los endpoints de productos

---

## Ejemplo de uso en Postman

### Login
- Method: `POST`
- URL: `https://pfi-backend-tt.vercel.app/auth/login`
- Body: raw JSON

json { "email": "admin@gmail.com", "password": "123456" }


### Crear producto
- Method: `POST`
- URL: `https://pfi-backend-tt.vercel.app/api/products/create`
- Headers:
  - `Authorization: Bearer TOKEN`
  - `Content-Type: application/json`

json { "producto": { "nombre": "Arroz", "categoria": "alimento", "precio": 1500 } }


---

## Notas importantes

- La colección de Firestore debe llamarse `productos`
- La API está desplegada en Vercel, por lo que no corre en `localhost` en producción

---
